import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchBookings = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 'BK001', customer: 'John Doe', service: 'Serengeti Safari', type: 'tour', date: '2024-03-20', amount: 1850, status: 'confirmed', payment: 'paid' },
    { id: 'BK002', customer: 'Sarah Johnson', service: 'Zanzibar Beach Resort', type: 'hotel', date: '2024-04-05', amount: 1200, status: 'pending', payment: 'pending' },
    { id: 'BK003', customer: 'Michael Chen', service: 'Toyota RAV4', type: 'car', date: '2024-03-25', amount: 450, status: 'confirmed', payment: 'paid' },
    { id: 'BK004', customer: 'Emma Williams', service: 'Kilimanjaro Climb', type: 'tour', date: '2024-06-10', amount: 2200, status: 'cancelled', payment: 'refunded' },
  ];
};

export function useBookings() {
  return useQuery({ queryKey: ['bookings'], queryFn: fetchBookings });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ bookingId, status }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { bookingId, status };
    },
    onMutate: async ({ bookingId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['bookings'] });
      const previous = queryClient.getQueryData(['bookings']);
      queryClient.setQueryData(['bookings'], (old) =>
        old.map(b => b.id === bookingId ? { ...b, status } : b)
      );
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });
}