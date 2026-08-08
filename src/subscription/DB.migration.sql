-- Migration: create subscriptions table and related tables

-- Add user columns for subscription relationship and diamond balance
ALTER TABLE auth.users ADD COLUMN subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL;
ALTER TABLE auth.users ADD COLUMN diamonds_balance INT NOT NULL DEFAULT 0;
ALTER TABLE auth.users ADD COLUMN last_diamond_refresh TIMESTAMPTZ;

-- Create subscription_plans table (optional, not strictly needed)
CREATE TABLE subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL
);

INSERT INTO subscription_plans VALUES
  ('basic', 'BASIC', 0.90, 'USD'),
  ('intermediate', 'INTERMEDIATE', 18.00, 'USD'),
  ('premium', 'PREMIUM', 54.00, 'USD');

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES subscription_plans(id),
  plan_name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create diamonds_usage table for tracking daily diamond allocations
CREATE TABLE IF NOT EXISTS diamonds_usage (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  diamonds_count INT NOT NULL DEFAULT 0,
  timestamp DATE NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT diamonds_usage_unique UNIQUE (user_id, timestamp)
);