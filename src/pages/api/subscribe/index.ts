import { supabase } from "@lib/supabase/client.ts";
import { subscriptionConfigs, getSubscriptionById } from "@subscription/subscription-config.ts";

let razorpayClient: any = null;

async function getRazorpayClient() {
  if (!razorpayClient) {
    const razorpayModule = await import('razorpay');
    razorpayClient = new razorpayModule.default({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || ''
    });
  }
  return razorpayClient;
}

export async function POST({ request }) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { planId, amount, currency } = await request.json();
    const plan = getSubscriptionById(planId);
    if (!plan) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (amount !== plan.price * 100) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_id: planId,
        plan_name: plan.name,
        price: plan.price,
        currency: plan.currency,
        status: 'pending',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (subError) throw subError;

    const client = await getRazorpayClient();
    const order = await client.orders.create({
      amount: String(amount),
      currency: currency || 'INR',
      receipt: `sub_${subscription.id}_${Date.now()}`,
      payment_capture: 0,
      description: `Subscription for ${plan.name}`
    });

    await supabase
      .from('subscriptions')
      .update({ razorpay_order_id: order.id })
      .eq('id', subscription.id);

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      subscriptionId: subscription.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Subscription failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { planId, amount, currency } = await request.json();
    const plan = getSubscriptionById(planId);
    if (!plan) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (amount !== plan.price * 100) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_id: planId,
        plan_name: plan.name,
        price: plan.price,
        currency: plan.currency,
        status: 'pending',
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (subError) throw subError;

    const order = await razorpayClient.orders.create({
      amount: String(amount),
      currency: currency || 'INR',
      receipt: `sub_${subscription.id}_${Date.now()}`,
      payment_capture: 0,
      description: `Subscription for ${plan.name}`
    });

    await supabase
      .from('subscriptions')
      .update({ razorpay_order_id: order.id })
      .eq('id', subscription.id);

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      subscriptionId: subscription.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Subscription failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*, plan:plan_id(name, price, currency)')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .gt('end_date', new Date().toISOString())
      .single();

    return new Response(JSON.stringify({
      active: !!subscription,
      subscription: subscription || null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ active: false, subscription: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('user_id', user.id)
      .eq('status', 'active');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Unsubscribe failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}