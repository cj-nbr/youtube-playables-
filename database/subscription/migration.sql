-- Migration file to create subscription tables

-- subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  plan_name TEXT NOT NULL CHECK (plan_name IN ('basic', 'intermediate', 'premium')),
  duration INTEGER NOT NULL,
  start_date TIMESTAMP NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('success', 'failed', 'pending')),
  subscription_status TEXT NOT NULL CHECK (subscription_status IN ('active', 'expired')),
  amount_paid DECIMAL NOT NULL,
  currency TEXT NOT NULL CHECK (currency = 'USD'),
  coupon_used TEXT NULL,
  razorpay_payment_id TEXT NULL,
  razorpay_order_id TEXT NULL,
  razorpay_signature TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- payment_history table
CREATE TABLE payment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  subscription_id uuid NOT NULL REFERENCES subscriptions(id),
  payment_id TEXT NOT NULL,
  order_id TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  currency TEXT NOT NULL CHECK (currency = 'USD'),
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('success', 'failed', 'cancelled'))
);

-- coupons table
CREATE TABLE coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL CHECK (code = 'CJNBR100'),
  description TEXT NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type = 'percentage'),
  discount_value INTEGER NOT NULL CHECK (discount_value = 100),
  applicable_plan TEXT NOT NULL CHECK (applicable_plan = 'premium'),
  active BOOLEAN NOT NULL DEFAULT true,
  one_time_use BOOLEAN NOT NULL DEFAULT true,
  usage_limit INTEGER NOT NULL DEFAULT 10,
  used_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- coupon_usage table
CREATE TABLE coupon_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES coupons(id),
  user_id uuid NOT NULL REFERENCES users(id),
  payment_id TEXT NOT NULL,
  used_at TIMESTAMP NOT NULL DEFAULT NOW()
);