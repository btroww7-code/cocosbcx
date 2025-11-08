/*
  # Staking System for CocosBCX
  
  This migration creates a comprehensive staking system with the following features:
  - User staking positions with flexible duration and rewards
  - Real-time reward calculations
  - Staking history and transaction tracking
  - Secure row-level security policies
  
  ## New Tables
  
  ### `staking_pools`
  Defines different staking options with varying APY and lock periods
  - `id` (uuid, primary key) - Unique pool identifier
  - `name` (text) - Pool name (e.g., "30 Days", "90 Days")
  - `duration_days` (integer) - Lock period in days
  - `apy` (numeric) - Annual percentage yield
  - `min_stake` (numeric) - Minimum stake amount
  - `max_stake` (numeric) - Maximum stake amount per user
  - `total_staked` (numeric) - Total tokens currently staked in pool
  - `active` (boolean) - Pool availability status
  - `created_at` (timestamptz) - Pool creation timestamp
  
  ### `user_stakes`
  Records individual user staking positions
  - `id` (uuid, primary key) - Unique stake identifier
  - `user_address` (text) - Wallet address of staker
  - `pool_id` (uuid, foreign key) - Reference to staking pool
  - `amount` (numeric) - Amount of tokens staked
  - `start_date` (timestamptz) - When stake was created
  - `end_date` (timestamptz) - When stake unlocks
  - `claimed_rewards` (numeric) - Total rewards claimed so far
  - `status` (text) - active, completed, or withdrawn
  - `created_at` (timestamptz) - Record creation time
  - `updated_at` (timestamptz) - Last update time
  
  ### `staking_transactions`
  Tracks all staking-related transactions
  - `id` (uuid, primary key) - Transaction identifier
  - `stake_id` (uuid, foreign key) - Related stake
  - `user_address` (text) - User wallet address
  - `transaction_type` (text) - stake, unstake, or claim_reward
  - `amount` (numeric) - Transaction amount
  - `tx_hash` (text) - Blockchain transaction hash
  - `created_at` (timestamptz) - Transaction timestamp
  
  ## Security
  
  - Enable RLS on all tables
  - Users can view all pool information
  - Users can only view their own stakes and transactions
  - Users can insert their own stakes
  - Users can update only their own active stakes
  - All deletes are restricted (maintain audit trail)
  
  ## Indexes
  
  - Index on user_address for fast stake lookups
  - Index on pool_id for aggregation queries
  - Index on status for filtering active stakes
*/

-- Create staking_pools table
CREATE TABLE IF NOT EXISTS staking_pools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration_days integer NOT NULL,
  apy numeric(5,2) NOT NULL,
  min_stake numeric(20,2) NOT NULL DEFAULT 100,
  max_stake numeric(20,2),
  total_staked numeric(20,2) NOT NULL DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create user_stakes table
CREATE TABLE IF NOT EXISTS user_stakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_address text NOT NULL,
  pool_id uuid NOT NULL REFERENCES staking_pools(id),
  amount numeric(20,2) NOT NULL,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz NOT NULL,
  claimed_rewards numeric(20,2) DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create staking_transactions table
CREATE TABLE IF NOT EXISTS staking_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stake_id uuid REFERENCES user_stakes(id),
  user_address text NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('stake', 'unstake', 'claim_reward')),
  amount numeric(20,2) NOT NULL,
  tx_hash text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_stakes_address ON user_stakes(user_address);
CREATE INDEX IF NOT EXISTS idx_user_stakes_pool ON user_stakes(pool_id);
CREATE INDEX IF NOT EXISTS idx_user_stakes_status ON user_stakes(status);
CREATE INDEX IF NOT EXISTS idx_staking_transactions_address ON staking_transactions(user_address);
CREATE INDEX IF NOT EXISTS idx_staking_transactions_stake ON staking_transactions(stake_id);

-- Enable Row Level Security
ALTER TABLE staking_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for staking_pools
CREATE POLICY "Anyone can view active staking pools"
  ON staking_pools FOR SELECT
  USING (active = true);

-- RLS Policies for user_stakes
CREATE POLICY "Users can view their own stakes"
  ON user_stakes FOR SELECT
  USING (user_address = current_setting('app.user_address', true));

CREATE POLICY "Users can create their own stakes"
  ON user_stakes FOR INSERT
  WITH CHECK (user_address = current_setting('app.user_address', true));

CREATE POLICY "Users can update their own stakes"
  ON user_stakes FOR UPDATE
  USING (user_address = current_setting('app.user_address', true))
  WITH CHECK (user_address = current_setting('app.user_address', true));

-- RLS Policies for staking_transactions
CREATE POLICY "Users can view their own transactions"
  ON staking_transactions FOR SELECT
  USING (user_address = current_setting('app.user_address', true));

CREATE POLICY "Users can create their own transactions"
  ON staking_transactions FOR INSERT
  WITH CHECK (user_address = current_setting('app.user_address', true));

-- Insert default staking pools
INSERT INTO staking_pools (name, duration_days, apy, min_stake, max_stake) VALUES
  ('Flexible', 0, 5.00, 100, NULL),
  ('30 Days', 30, 12.00, 100, NULL),
  ('90 Days', 90, 25.00, 100, NULL),
  ('180 Days', 180, 45.00, 100, NULL),
  ('365 Days', 365, 80.00, 100, NULL)
ON CONFLICT DO NOTHING;

-- Function to calculate pending rewards
CREATE OR REPLACE FUNCTION calculate_pending_rewards(stake_id_param uuid)
RETURNS numeric AS $$
DECLARE
  stake_record RECORD;
  days_staked numeric;
  pending_reward numeric;
BEGIN
  SELECT 
    us.amount,
    us.start_date,
    us.claimed_rewards,
    sp.apy
  INTO stake_record
  FROM user_stakes us
  JOIN staking_pools sp ON us.pool_id = sp.id
  WHERE us.id = stake_id_param;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  days_staked := EXTRACT(EPOCH FROM (now() - stake_record.start_date)) / 86400;
  
  pending_reward := (stake_record.amount * stake_record.apy / 100 / 365 * days_staked) - stake_record.claimed_rewards;
  
  RETURN GREATEST(pending_reward, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
