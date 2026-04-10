import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API functions – replace with real endpoints later
const fetchGuideStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    totalTours: 24,
    upcomingTours: 5,
    completedTours: 19,
    averageRating: 4.9,
    totalEarnings: 12500,
    thisMonthEarnings: 1850,
    ratingDistribution: { 5: 42, 4: 12, 3: 2, 2: 0, 1: 0 },
  };
};

const fetchUpcomingTours = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, tourName: 'Serengeti Safari', date: '2024-04-15', groupSize: 6, status: 'confirmed', client: 'John Doe' },
    { id: 2, tourName: 'Kilimanjaro Climb', date: '2024-04-20', groupSize: 4, status: 'pending', client: 'Sarah Johnson' },
    { id: 3, tourName: 'Zanzibar Beach Tour', date: '2024-04-25', groupSize: 8, status: 'confirmed', client: 'Michael Chen' },
  ];
};

const fetchPastTours = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 4, tourName: 'Ngorongoro Crater', date: '2024-03-10', groupSize: 5, rating: 5, client: 'Emma Williams' },
    { id: 5, tourName: 'Lake Manyara', date: '2024-03-05', groupSize: 4, rating: 4.8, client: 'David Brown' },
  ];
};

const fetchEarningsHistory = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { month: 'Oct', earnings: 1250 },
    { month: 'Nov', earnings: 1480 },
    { month: 'Dec', earnings: 2100 },
    { month: 'Jan', earnings: 1720 },
    { month: 'Feb', earnings: 1980 },
    { month: 'Mar', earnings: 1850 },
  ];
};

const fetchReviews = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, client: 'John Doe', rating: 5, comment: 'Amazing guide! Very knowledgeable.', date: '2024-03-15' },
    { id: 2, client: 'Sarah Johnson', rating: 5, comment: 'Made our safari unforgettable.', date: '2024-03-10' },
    { id: 3, client: 'Michael Chen', rating: 4.8, comment: 'Great experience, very professional.', date: '2024-03-05' },
  ];
};

const fetchSchedule = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, day: 'Monday', time: '09:00 AM', tour: 'Serengeti Safari', client: 'John Doe' },
    { id: 2, day: 'Wednesday', time: '10:00 AM', tour: 'Kilimanjaro Climb', client: 'Sarah Johnson' },
    { id: 3, day: 'Friday', time: '08:00 AM', tour: 'Zanzibar Beach', client: 'Michael Chen' },
  ];
};

// React Query hooks
export function useGuideStats() {
  return useQuery({ queryKey: ['guideStats'], queryFn: fetchGuideStats });
}

export function useUpcomingTours() {
  return useQuery({ queryKey: ['upcomingTours'], queryFn: fetchUpcomingTours });
}

export function usePastTours() {
  return useQuery({ queryKey: ['pastTours'], queryFn: fetchPastTours });
}

export function useEarningsHistory() {
  return useQuery({ queryKey: ['earningsHistory'], queryFn: fetchEarningsHistory });
}

export function useReviews() {
  return useQuery({ queryKey: ['reviews'], queryFn: fetchReviews });
}

export function useSchedule() {
  return useQuery({ queryKey: ['schedule'], queryFn: fetchSchedule });
}

// Mutation example: update tour status (e.g., mark as completed)
export function useUpdateTourStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tourId, status }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { tourId, status };
    },
    onMutate: async ({ tourId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['upcomingTours'] });
      const previous = queryClient.getQueryData(['upcomingTours']);
      queryClient.setQueryData(['upcomingTours'], (old) =>
        old.map(tour => tour.id === tourId ? { ...tour, status } : tour)
      );
      return { previous };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['upcomingTours'] });
      queryClient.invalidateQueries({ queryKey: ['pastTours'] });
    },
  });
}