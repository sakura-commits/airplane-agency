import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchTours = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Serengeti Safari', duration: '5 days', price: 1850, maxGroup: 8, status: 'active', rating: 4.9 },
    { id: 2, name: 'Zanzibar Beach Escape', duration: '7 days', price: 799, maxGroup: 12, status: 'active', rating: 4.8 },
    { id: 3, name: 'Kilimanjaro Climb', duration: '8 days', price: 1499, maxGroup: 10, status: 'pending', rating: 4.9 },
  ];
};

export function useTours() {
  return useQuery({ queryKey: ['tours'], queryFn: fetchTours });
}

export function useAddTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTour) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...newTour, id: Date.now() };
    },
    onMutate: async (newTour) => {
      await queryClient.cancelQueries({ queryKey: ['tours'] });
      const previous = queryClient.getQueryData(['tours']);
      queryClient.setQueryData(['tours'], (old) => [...(old || []), { ...newTour, id: Date.now() }]);
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tours'] }),
  });
}

export function useUpdateTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updated) => updated,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ['tours'] });
      const previous = queryClient.getQueryData(['tours']);
      queryClient.setQueryData(['tours'], (old) => old.map(t => t.id === updated.id ? updated : t));
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tours'] }),
  });
}

export function useDeleteTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => id,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tours'] });
      const previous = queryClient.getQueryData(['tours']);
      queryClient.setQueryData(['tours'], (old) => old.filter(t => t.id !== id));
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['tours'] }),
  });
}