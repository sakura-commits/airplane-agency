import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchHotels = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { id: 1, name: 'Zanzibar Beach Resort', location: 'Zanzibar', price: 180, rating: 4.8, status: 'active', rooms: 45 },
    { id: 2, name: 'Serengeti Safari Lodge', location: 'Serengeti', price: 250, rating: 4.9, status: 'active', rooms: 32 },
    { id: 3, name: 'Kilimanjaro View Hotel', location: 'Moshi', price: 120, rating: 4.5, status: 'pending', rooms: 28 },
    { id: 4, name: 'Dar City Inn', location: 'Dar es Salaam', price: 95, rating: 4.2, status: 'inactive', rooms: 50 },
  ];
};

export function useHotels() {
  return useQuery({ queryKey: ['hotels'], queryFn: fetchHotels });
}

export function useAddHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newHotel) => {
      // Simulate API post
      return new Promise(resolve => setTimeout(() => resolve({ ...newHotel, id: Date.now() }), 500));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hotels'] }),
  });
}