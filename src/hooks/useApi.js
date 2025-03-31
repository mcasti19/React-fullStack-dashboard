import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import dashboardApi from '../api/dashboardApi';

const useApi = ( endpoint, page = 1, pageSize = 5 ) => {
  const queryClient = useQueryClient();

  const fetchData = async ( page, pageSize ) => {
    const response = await dashboardApi.get( `/${ endpoint }`, {
      params: {
        page,
        pageSize,
      },
    } );
    return response.data;
  };

  const {data, error, isLoading} = useQuery( {
    queryKey: [ endpoint, page, pageSize ],
    queryFn: () => fetchData( page, pageSize ),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  } );

  // Mutación para crear datos
  const createData = useMutation( {
    mutationFn: async ( newData ) => {
      await dashboardApi.post( `/${ endpoint }`, newData );
    },
    onSuccess: () => {
      queryClient.invalidateQueries( [ endpoint ] );
    },
  } );

  // Mutación para actualizar datos
  const updateData = useMutation( {
    mutationFn: async ( updatedData ) => {
      await dashboardApi.put( `/${ endpoint }/${ updatedData.id }`, updatedData );
    },
    onSuccess: () => {
      queryClient.invalidateQueries( [ endpoint ] );
    },
  } );

  // Mutación para eliminar datos
  const deleteData = useMutation( {
    mutationFn: async ( id ) => {
      await dashboardApi.delete( `/${ endpoint }/${ id }` );
    },
    onSuccess: () => {
      queryClient.invalidateQueries( [ endpoint ] );
    },
  } );

  return {
    data,
    error,
    isLoading,
    createData,
    updateData,
    deleteData,
    fetchData,
  };
};
export default useApi;