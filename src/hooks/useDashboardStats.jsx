import { useQuery } from '@tanstack/react-query';

const fetchDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1250,
        totalBookings: 345,
        totalRevenue: 89250,
        activeListings: 78,
        pendingApprovals: 12,
        recentActivity: [
          { id: 1, type: 'booking', user: 'John Doe', service: 'Serengeti Safari', amount: '$1,850', time: '5 mins ago' },
          { id: 2, type: 'provider', user: 'Zanzibar Resort', action: 'New hotel registered', time: '15 mins ago' },
          { id: 3, type: 'payment', user: 'Sarah Johnson', amount: '$450', status: 'completed', time: '25 mins ago' },
          { id: 4, type: 'guide', user: 'Joseph Maasai', action: 'New guide application', time: '1 hour ago' }
        ]
      });
    }, 500);
  });
};

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5,
  });
}
