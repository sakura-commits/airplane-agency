import { useQuery } from '@tanstack/react-query';

// Mock API functions – replace with real endpoints later
const fetchAgentStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    activeCustomers: 150,
    newCustomersThisMonth: 25,
    pendingBookings: 89,
    confirmedToday: 12,
    commissionThisMonth: 2450,
    totalEarnings: 18320,
    commissionRate: 15,
  };
};

const fetchRecentBookings = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 'BK101', customer: 'John Doe', tour: 'Serengeti Safari', date: '2024-03-20', amount: 1850, status: 'confirmed', commission: 277.5 },
    { id: 'BK102', customer: 'Sarah Johnson', tour: 'Zanzibar Beach', date: '2024-03-18', amount: 1200, status: 'pending', commission: 180 },
    { id: 'BK103', customer: 'Michael Chen', tour: 'Kilimanjaro Climb', date: '2024-03-15', amount: 2200, status: 'completed', commission: 330 },
    { id: 'BK104', customer: 'Emma Williams', tour: 'Ngorongoro Crater', date: '2024-03-10', amount: 950, status: 'confirmed', commission: 142.5 },
  ];
};

const fetchMonthlyCommission = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { month: 'Oct', commission: 1850 },
    { month: 'Nov', commission: 2100 },
    { month: 'Dec', commission: 2450 },
    { month: 'Jan', commission: 2200 },
    { month: 'Feb', commission: 2700 },
    { month: 'Mar', commission: 2450 },
  ];
};

export function useAgentStats() {
  return useQuery({ queryKey: ['agentStats'], queryFn: fetchAgentStats });
}

export function useRecentBookings() {
  return useQuery({ queryKey: ['recentBookings'], queryFn: fetchRecentBookings });
}

export function useMonthlyCommission() {
  return useQuery({ queryKey: ['monthlyCommission'], queryFn: fetchMonthlyCommission });
}