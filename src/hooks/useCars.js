import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchCars = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Toyota RAV4', type: 'SUV', price: 50, transmission: 'Auto', seats: 5, status: 'active', location: 'Dar es Salaam' },
    { id: 2, name: 'Suzuki Carry', type: 'Van', price: 40, transmission: 'Manual', seats: 2, status: 'active', location: 'Arusha' },
    { id: 3, name: 'Land Rover Defender', type: '4x4', price: 120, transmission: 'Manual', seats: 7, status: 'pending', location: 'Serengeti' },
    { id: 4, name: 'Nissan X-Trail', type: 'SUV', price: 70, transmission: 'Auto', seats: 5, status: 'active', location: 'Zanzibar' },
  ];
};

export function useCars() {
  return useQuery({ queryKey: ['cars'], queryFn: fetchCars });
}

export function useAddCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCar) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...newCar, id: Date.now() };
    },
    onMutate: async (newCar) => {
      await queryClient.cancelQueries({ queryKey: ['cars'] });
      const previousCars = queryClient.getQueryData(['cars']);
      queryClient.setQueryData(['cars'], (old) => [...(old || []), { ...newCar, id: Date.now() }]);
      return { previousCars };
    },
    onError: (err, newCar, context) => {
      queryClient.setQueryData(['cars'], context.previousCars);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCar) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return updatedCar;
    },
    onMutate: async (updatedCar) => {
      await queryClient.cancelQueries({ queryKey: ['cars'] });
      const previousCars = queryClient.getQueryData(['cars']);
      queryClient.setQueryData(['cars'], (old) =>
        old.map(car => car.id === updatedCar.id ? updatedCar : car)
      );
      return { previousCars };
    },
    onError: (err, updatedCar, context) => {
      queryClient.setQueryData(['cars'], context.previousCars);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (carId) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return carId;
    },
    onMutate: async (carId) => {
      await queryClient.cancelQueries({ queryKey: ['cars'] });
      const previousCars = queryClient.getQueryData(['cars']);
      queryClient.setQueryData(['cars'], (old) => old.filter(car => car.id !== carId));
      return { previousCars };
    },
    onError: (err, carId, context) => {
      queryClient.setQueryData(['cars'], context.previousCars);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}