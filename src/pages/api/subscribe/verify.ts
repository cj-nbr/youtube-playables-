import { createClient } from '@supabase/supabase-js';
import { subscriptionConfigs } from "../../../../subscription/subscription-config.ts";

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

export async function POST({ request }) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscriptionId } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !subscriptionId) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!razorpayKeySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay key secret not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify Razorpay signature
    const crypto = await import('crypto');
    const body = `${razorpay_payment_id}|${razorpay_order_id}`;
    const expectedSignature = crypto.createHmac('sha256', razorpayKeySecret)
      .update(body, 'utf8')
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Invalid payment signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get plan from subscription
    const { data: subscriptionData, error: subError } = await supabase
      .from('subscriptions')
      .select('plan_id, user_id')
      .eq('id', subscriptionId)
      .single();

    if (subError || !subscriptionData) {
      return new Response(JSON.stringify({ error: 'Subscription not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const plan = subscriptionConfigs.find(p => p.id === subscriptionData.plan_id);
    if (!plan) {
      return new Response(JSON.stringify({ error: 'Plan not found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Calculate end date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration_days);

    // Update subscription
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'active',
        end_date: endDate.toISOString()
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Update user's diamonds balance
    const { data: user, error: userError } = await supabase
      .from('auth.users')
      .select('diamonds_balance')
      .eq('id', subscriptionData.user_id)
      .single();

    if (userError) throw userError;

    const newDiamondsBalance = (user.diamonds_balance || 0) + (plan.diamond_allocation || 10);

    await supabase
      .from('auth.users')
      .update({ diamonds_balance: newDiamondsBalance })
      .eq('id', subscriptionData.user_id);

    // Record diamond usage for today
    const today = new Date().toISOString().split('T')[0];
    await supabase
      .from('diamonds_usage')
      .insert({
        user_id: subscriptionData.user_id,
        diamonds_count: plan.diamond_allocation,
        timestamp: today
      });

    return new Response(JSON.stringify({
      success: true,
      subscription: updatedSubscription,
      message: 'Payment verified successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Payment verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}