export const subscriptionConfigs = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 0.90,
    currency: 'USD',
    duration_days: 1,
    features: [
      'Access to all free games',
      'Basic avatar customization',
      '10 daily diamonds',
      'Standard support'
    ],
    description: 'Best for casual players',
    diamond_allocation: 10
  },
  {
    id: 'intermediate',
    name: 'INTERMEDIATE',
    price: 18,
    currency: 'USD',
    duration_days: 30,
    features: [
      'All Basic features',
      'Unlimited games access',
      'Advanced avatar customization',
      '100 daily diamonds',
      'Priority support',
      'Ad-free experience'
    ],
    description: 'Most popular',
    diamond_allocation: 100
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 54,
    currency: 'USD',
    duration_days: 365,
    features: [
      'All Intermediate features',
      'Exclusive premium games',
      'Custom avatar animations',
      '1000 daily diamonds',
      'Priority support',
      'Ad-free experience',
      'Early access to new features',
      'Monthly diamond bonus'
    ],
    description: 'Best Value',
    diamond_allocation: 1000
  }
];

export function getSubscriptionById(id) {
  return subscriptionConfigs.find(sc => sc.id === id);
}

export function getPlans() {
  return subscriptionConfigs.map(sc => ({
    ...sc,
    planLabel: sc.name,
    cost: `$${sc.price}`,
    currency: sc.currency,
    durationLabel: `${sc.duration_days} ${sc.duration_days === 1 ? 'day' : 'days'}`
  }));
}