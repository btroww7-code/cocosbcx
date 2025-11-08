import { useState, useEffect } from 'react';
import { Lock, TrendingUp, Clock, Coins, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAccount } from 'wagmi';
import { supabase } from '../config/supabase';

interface StakingPool {
  id: string;
  name: string;
  duration_days: number;
  apy: number;
  min_stake: number;
  max_stake: number | null;
  total_staked: number;
  active: boolean;
}

interface UserStake {
  id: string;
  pool_id: string;
  amount: number;
  start_date: string;
  end_date: string;
  claimed_rewards: number;
  status: string;
  pool_name: string;
  pool_apy: number;
}

export default function Staking() {
  const { address, isConnected } = useAccount();
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [userStakes, setUserStakes] = useState<UserStake[]>([]);
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadPools();
    if (isConnected && address) {
      loadUserStakes();
    }
  }, [isConnected, address]);

  const loadPools = async () => {
    const { data, error } = await supabase
      .from('staking_pools')
      .select('*')
      .eq('active', true)
      .order('duration_days', { ascending: true });

    if (!error && data) {
      setPools(data);
    }
  };

  const loadUserStakes = async () => {
    if (!address) return;

    const { data, error } = await supabase
      .rpc('set_user_address', { user_addr: address })
      .then(() =>
        supabase
          .from('user_stakes')
          .select(`
            *,
            staking_pools (
              name,
              apy
            )
          `)
          .eq('status', 'active')
      );

    if (!error && data) {
      const formattedStakes = data.map((stake: any) => ({
        ...stake,
        pool_name: stake.staking_pools?.name || 'Unknown',
        pool_apy: stake.staking_pools?.apy || 0
      }));
      setUserStakes(formattedStakes);
    }
  };

  const calculateRewards = (stake: UserStake) => {
    const now = new Date();
    const start = new Date(stake.start_date);
    const daysStaked = Math.max(0, (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalReward = (stake.amount * stake.pool_apy / 100 / 365) * daysStaked;
    return Math.max(0, totalReward - stake.claimed_rewards);
  };

  const handleStake = async () => {
    if (!isConnected || !address || !selectedPool) {
      showNotification('error', 'Please connect your wallet first');
      return;
    }

    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount < selectedPool.min_stake) {
      showNotification('error', `Minimum stake is ${selectedPool.min_stake} COCOS`);
      return;
    }

    if (selectedPool.max_stake && amount > selectedPool.max_stake) {
      showNotification('error', `Maximum stake is ${selectedPool.max_stake} COCOS`);
      return;
    }

    setLoading(true);

    try {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + selectedPool.duration_days);

      await supabase.rpc('set_user_address', { user_addr: address });

      const { data: stakeData, error: stakeError } = await supabase
        .from('user_stakes')
        .insert({
          user_address: address,
          pool_id: selectedPool.id,
          amount: amount,
          end_date: endDate.toISOString(),
          status: 'active'
        })
        .select()
        .single();

      if (stakeError) throw stakeError;

      await supabase
        .from('staking_transactions')
        .insert({
          stake_id: stakeData.id,
          user_address: address,
          transaction_type: 'stake',
          amount: amount,
          tx_hash: `0x${Math.random().toString(16).slice(2)}`
        });

      await supabase
        .from('staking_pools')
        .update({ total_staked: selectedPool.total_staked + amount })
        .eq('id', selectedPool.id);

      showNotification('success', 'Tokens staked successfully!');
      setStakeAmount('');
      setSelectedPool(null);
      loadPools();
      loadUserStakes();
    } catch (error) {
      console.error('Staking error:', error);
      showNotification('error', 'Failed to stake tokens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimRewards = async (stake: UserStake) => {
    if (!address) return;

    setLoading(true);
    try {
      const rewards = calculateRewards(stake);

      await supabase.rpc('set_user_address', { user_addr: address });

      await supabase
        .from('user_stakes')
        .update({ claimed_rewards: stake.claimed_rewards + rewards })
        .eq('id', stake.id);

      await supabase
        .from('staking_transactions')
        .insert({
          stake_id: stake.id,
          user_address: address,
          transaction_type: 'claim_reward',
          amount: rewards,
          tx_hash: `0x${Math.random().toString(16).slice(2)}`
        });

      showNotification('success', `Claimed ${rewards.toFixed(2)} COCOS rewards!`);
      loadUserStakes();
    } catch (error) {
      console.error('Claim error:', error);
      showNotification('error', 'Failed to claim rewards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async (stake: UserStake) => {
    if (!address) return;

    const now = new Date();
    const endDate = new Date(stake.end_date);

    if (now < endDate) {
      showNotification('error', 'Cannot unstake before lock period ends');
      return;
    }

    setLoading(true);
    try {
      const rewards = calculateRewards(stake);
      const totalAmount = stake.amount + rewards;

      await supabase.rpc('set_user_address', { user_addr: address });

      await supabase
        .from('user_stakes')
        .update({ status: 'withdrawn' })
        .eq('id', stake.id);

      await supabase
        .from('staking_transactions')
        .insert({
          stake_id: stake.id,
          user_address: address,
          transaction_type: 'unstake',
          amount: totalAmount,
          tx_hash: `0x${Math.random().toString(16).slice(2)}`
        });

      const pool = pools.find(p => p.id === stake.pool_id);
      if (pool) {
        await supabase
          .from('staking_pools')
          .update({ total_staked: Math.max(0, pool.total_staked - stake.amount) })
          .eq('id', stake.pool_id);
      }

      showNotification('success', `Unstaked ${totalAmount.toFixed(2)} COCOS (including rewards)!`);
      loadPools();
      loadUserStakes();
    } catch (error) {
      console.error('Unstake error:', error);
      showNotification('error', 'Failed to unstake. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const isLockPeriodOver = (endDate: string) => {
    return new Date() >= new Date(endDate);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="staking" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>

      {notification && (
        <div className="fixed top-24 right-4 z-50 animate-fadeIn">
          <div className={`px-6 py-4 rounded-xl backdrop-blur-xl border ${
            notification.type === 'success'
              ? 'bg-green-900/80 border-green-500/50'
              : 'bg-red-900/80 border-red-500/50'
          } flex items-center gap-3`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span className="text-white font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Stake Your COCOS
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Lock your tokens and earn passive rewards. Choose from flexible to long-term staking options.
          </p>
        </div>

        {!isConnected && (
          <div className="mb-12 p-8 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl text-center">
            <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400">
              Connect your wallet to start staking and earning rewards
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pools.map((pool) => (
            <div
              key={pool.id}
              className={`group relative p-8 bg-slate-900/50 backdrop-blur-sm border rounded-2xl transition-all duration-500 cursor-pointer ${
                selectedPool?.id === pool.id
                  ? 'border-cyan-500 scale-105'
                  : 'border-slate-800 hover:border-cyan-500/50 hover:scale-102'
              }`}
              onClick={() => setSelectedPool(pool)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{pool.name}</h3>
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Coins className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">APY</div>
                      <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Lock Period</div>
                      <div className="text-lg font-semibold text-white">
                        {pool.duration_days === 0 ? 'Flexible' : `${pool.duration_days} Days`}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-sm text-gray-400 mb-1">Minimum Stake</div>
                    <div className="text-lg font-semibold text-cyan-400">{pool.min_stake} COCOS</div>
                  </div>

                  <div className="text-sm text-gray-400">
                    Total Staked: <span className="text-white font-medium">{pool.total_staked.toLocaleString()} COCOS</span>
                  </div>
                </div>

                {selectedPool?.id === pool.id && (
                  <div className="space-y-4 pt-4 border-t border-cyan-500/30 animate-fadeIn">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleStake}
                      disabled={loading || !stakeAmount}
                      className="w-full px-6 py-3 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : 'Stake Now'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isConnected && userStakes.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Your Active Stakes</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {userStakes.map((stake) => {
                const pendingRewards = calculateRewards(stake);
                const canUnstake = isLockPeriodOver(stake.end_date);

                return (
                  <div
                    key={stake.id}
                    className="p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold text-white">{stake.pool_name}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        canUnstake
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {canUnstake ? 'Unlocked' : 'Locked'}
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Staked Amount</div>
                        <div className="text-2xl font-bold text-cyan-400">{stake.amount.toLocaleString()} COCOS</div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-400 mb-1">Pending Rewards</div>
                        <div className="text-2xl font-bold text-green-400">{pendingRewards.toFixed(4)} COCOS</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                        <div>
                          <div className="text-sm text-gray-400">Start Date</div>
                          <div className="text-white font-medium">{formatDate(stake.start_date)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">End Date</div>
                          <div className="text-white font-medium">{formatDate(stake.end_date)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleClaimRewards(stake)}
                        disabled={loading || pendingRewards < 0.01}
                        className="flex-1 px-4 py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Claim Rewards
                      </button>
                      <button
                        onClick={() => handleUnstake(stake)}
                        disabled={loading || !canUnstake}
                        className="flex-1 px-4 py-3 font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Unstake
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isConnected && userStakes.length === 0 && pools.length > 0 && (
          <div className="text-center p-12 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl">
            <Coins className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No Active Stakes</h3>
            <p className="text-gray-500">Select a pool above to start staking your COCOS tokens</p>
          </div>
        )}
      </div>
    </section>
  );
}
