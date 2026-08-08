import { supabase } from '../supabase/client.js';

export interface SubscriptionState {
  subscription: {
    active: boolean;
    plan: string | null;
    planName: string | null;
    endDate: string | null;
    startDate: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  features: string[];
  highlight?: string;
}

const PLANS: Plan[] = [
   { id: 'basic', name: 'Basic', price: 0.90, durationDays: 1, features: ['Access to all free games', 'Basic avatar customization', '10 daily diamonds', 'Standard support'] },
   { id: 'intermediate', name: 'Intermediate', price: 18, durationDays: 30, features: ['All Basic features', 'Unlimited games access', 'Advanced avatar customization', '100 daily diamonds', 'Priority support', 'Ad-free experience'], highlight: 'Most Popular' },
   { id: 'premium', name: 'Premium', price: 54, durationDays: 365, features: ['All Intermediate features', 'Exclusive premium games', 'Custom avatar animations', '1000 daily diamonds', 'Priority support', 'Ad-free experience', 'Early access to new features', 'Monthly diamond bonus'], highlight: 'Best Value' }
];

type SubscriptionListener = (state: SubscriptionState) => void;

class SubscriptionService {
  private state: SubscriptionState = {
    subscription: null,
    isLoading: true,
    error: null
  };

  private listeners: Set<SubscriptionListener> = new Set();
  private userId: string | null = null;

  constructor() {}

  setUserId(userId: string | null) {
    this.userId = userId;
    if (userId) {
      this.loadSubscription();
    } else {
      this.setState({ subscription: null, isLoading: false, error: null });
    }
  }

  getState(): SubscriptionState {
    return this.state;
  }

  subscribe(listener: SubscriptionListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private setState(partial: Partial<SubscriptionState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(fn => fn(this.state));
  }

  async loadSubscription() {
    if (!this.userId) return;
    
    this.setState({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', this.userId)
        .eq('subscription_status', 'active')
        .gt('end_date', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const plan = PLANS.find(p => p.id === data.plan_name);
        this.setState({
          subscription: {
            active: true,
            plan: data.plan_name,
            planName: plan?.name || data.plan_name,
            endDate: data.end_date,
            startDate: data.start_date
          },
          isLoading: false
        });
      } else {
        this.setState({
          subscription: { active: false, plan: null, planName: null, endDate: null, startDate: null },
          isLoading: false
        });
      }
    } catch (err: any) {
      this.setState({ error: err.message, isLoading: false });
    }
  }

  getPlans(): Plan[] {
    return PLANS;
  }

  async validateCoupon(code: string, planId: string): Promise<{ valid: boolean; discount: number; message: string }> {
    if (code.toUpperCase() === 'CJNBR100') {
      if (planId !== 'premium') {
        return { valid: false, discount: 0, message: 'This coupon is only valid for the Premium plan' };
      }
      return { valid: true, discount: 100, message: '100% off Premium plan' };
    }
    return { valid: false, discount: 0, message: 'Invalid coupon code' };
  }

  async createRazorpayOrder(planId: string, couponCode?: string): Promise<{ orderId: string; amount: number }> {
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) throw new Error('Invalid plan');

    let discount = 0;
    if (couponCode) {
      const validation = await this.validateCoupon(couponCode, planId);
      if (validation.valid) discount = validation.discount;
    }

    const finalAmount = plan.price * (1 - discount / 100);
    const amountInPaise = Math.round(finalAmount * 100);

    // This would call your backend API to create Razorpay order
    // For now, return mock data
    return { orderId: `order_${Date.now()}`, amount: amountInPaise };
  }

  async verifyPaymentAndActivate(orderId: string, paymentId: string, signature: string) {
    // Call backend to verify signature and activate subscription
    // For now, simulate success
    return { success: true };
  }
}

export const subscriptionService = new SubscriptionService();