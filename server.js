import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

// Initialize server
const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TNCbIRoSoL7cnL';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '15tbEDkLEYfkMK3ZAzDAOdhI';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize Razorpay
const razorpayClient = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

// Subscription plans configuration
const subscriptionPlans = {
  basic: {
    id: 'basic',
    name: 'BASIC',
    price: 0.90,
    currency: 'USD',
    duration_days: 1,
    features: ['10 daily diamonds', 'Basic avatar customization'],
    diamond_allocation: 10
  },
  premium: {
    id: 'premium',
    name: 'PREMIUM',
    price: 18,
    currency: 'USD',
    duration_days: 30,
    features: ['100 daily diamonds', 'All games access', 'Ad-free experience'],
    diamond_allocation: 100
  },
  premium_exclusive: {
    id: 'premium_exclusive',
    name: 'PREMIUM EXCLUSIVE',
    price: 54,
    currency: 'USD',
    duration_days: 365,
    features: ['1000 daily diamonds', 'Exclusive games', 'Priority support'],
    diamond_allocation: 1000
  }
};

const PORT = parseInt(process.env.PORT || 4000);

// API route for subscription creation
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { planId, userId } = req.body;
    
    // Validate planId
    const plan = subscriptionPlans[planId];
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Create Razorpay order
    const order = await razorpayClient.orders.create({
      amount: Math.round(plan.price * 100),
      currency: plan.currency,
      receipt: `sub_${Date.now()}`,
      payment_capture: 1
    });

    // Create subscription record in Supabase
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_id: plan.id,
        plan_name: plan.name,
        price: plan.price,
        currency: plan.currency,
        status: 'pending',
        razorpay_order_id: order.id,
        start_date: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      orderId: order.id,
      subscriptionId: subscription.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Subscription creation failed:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// API route for payment verification
app.post('/api/subscriptions/verify', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, subscriptionId } = req.body;

    // Verify payment signature
    const crypto = await import('crypto');
    const body = razorpay_payment_id + '|' + razorpay_order_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Update subscription status
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single();

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    const selectedPlan = subscriptionPlans[subscription.plan_id];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + selectedPlan.duration_days);

    await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        razorpay_payment_id,
        razorpay_signature,
        end_date: endDate.toISOString()
      })
      .eq('id', subscriptionId);

    // Update user diamonds
    const { data: user } = await supabase
      .from('auth.users')
      .select('diamonds_balance')
      .eq('id', subscription.user_id)
      .single();

    await supabase
      .from('auth.users')
      .update({
        diamonds_balance: (user.diamonds_balance || 0) + selectedPlan.diamond_allocation
      })
      .eq('id', subscription.user_id);

    res.json({ success: true, message: 'Subscription activated' });

  } catch (error) {
    console.error('Verification failed:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// API route for subscription status
app.get('/api/subscriptions/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gt('end_date', new Date().toISOString())
      .single();

    res.json({
      active: !!subscription,
      subscription: subscription || null
    });

  } catch (error) {
    res.json({ active: false, subscription: null });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});