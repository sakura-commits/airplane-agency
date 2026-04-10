import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    customers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+255712345678', bookings: 5, joined: '2024-01-15', status: 'active' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+255723456789', bookings: 3, joined: '2024-02-20', status: 'active' },
    ],
    agents: [
      { id: 3, name: 'Tanzania Travels', email: 'info@tztravels.com', phone: '+255745678901', commission: '15%', clients: 45, status: 'active' },
    ],
    providers: [
      { id: 4, name: 'Zanzibar Resort', type: 'hotel', email: 'reservations@zanzibarresort.com', phone: '+255767890123', listings: 12, status: 'pending' },
    ],
    guides: [
      { id: 5, name: 'Joseph Maasai', experience: '12 years', languages: ['English', 'Swahili'], rating: 4.9, tours: 87, status: 'active' },
    ],
  };
};

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ role, userId, status }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { role, userId, status };
    },
    onMutate: async ({ role, userId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previous = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], (old) => ({
        ...old,
        [role]: old[role].map(user => user.id === userId ? { ...user, status } : user),
      }));
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}