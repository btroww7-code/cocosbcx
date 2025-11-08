/*
  # Add RLS Helper Function
  
  This migration adds a helper function for setting user address in RLS policies.
  This allows the client to set context for row-level security without requiring auth.uid().
  
  ## Changes
  
  1. Create function to set user address in session
  2. This enables RLS policies to work with wallet addresses instead of auth users
*/

-- Create function to set user address for RLS
CREATE OR REPLACE FUNCTION set_user_address(user_addr text)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.user_address', user_addr, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION set_user_address TO anon, authenticated;
