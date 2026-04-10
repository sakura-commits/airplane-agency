import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchGuides = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Joseph Maasai', experience: '12 years', languages: 'English, Swahili, Maa', rating: 4.9, tours: 87, status: 'active' },
    { id: 2, name: 'Emma Thompson', experience: '8 years', languages: 'English, French', rating: 4.8, tours: 64, status: 'active' },
    { id: 3, name: 'David Ochieng', experience: '5 years', languages: 'English, Swahili', rating: 4.7, tours: 42, status: 'pending' },
  ];
};

export function useGuides() {
  return useQuery({ queryKey: ['guides'], queryFn: fetchGuides });
}

export function useAddGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newGuide) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...newGuide, id: Date.now() };
    },
    onMutate: async (newGuide) => {
      await queryClient.cancelQueries({ queryKey: ['guides'] });
      const previous = queryClient.getQueryData(['guides']);
      queryClient.setQueryData(['guides'], (old) => [...(old || []), { ...newGuide, id: Date.now() }]);
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['guides'] }),
  });
}

export function useUpdateGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updated) => updated,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ['guides'] });
      const previous = queryClient.getQueryData(['guides']);
      queryClient.setQueryData(['guides'], (old) => old.map(g => g.id === updated.id ? updated : g));
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['guides'] }),
  });
}

export function useDeleteGuide() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => id,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['guides'] });
      const previous = queryClient.getQueryData(['guides']);
      queryClient.setQueryData(['guides'], (old) => old.filter(g => g.id !== id));
      return { previous };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['guides'] }),
  });
}