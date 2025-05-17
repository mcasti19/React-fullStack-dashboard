import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import dashboardApi from '../api/dashboardApi';
import {useState} from 'react';

const useApi = ( endpoint, page = 1, pageSize = 5 ) => {
  const queryClient = useQueryClient();
  const [ fetchError, setFetchError ] = useState( null )

  const fetchData = async ( page, pageSize ) => {
    try {
      const response = await dashboardApi.get( `/${ endpoint }`, {
        params: {
          page,
          pageSize,
        },
      } );

      return response.data;
    } catch ( error ) {
      setFetchError( error )
      console.log( "Entro en el error", error );
    }
  };

  const {data, error, isLoading} = useQuery( {
    queryKey: [ endpoint, {'page': page, 'pageSize': pageSize} ],
    queryFn: () => fetchData( page, pageSize ),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  } );

  const createData = useMutation( {
    mutationFn: async ( newData ) => {
      await dashboardApi.post( `/${ endpoint }`, newData );
    },
    onSuccess: () => {
      queryClient.invalidateQueries( [ endpoint ] );
    },
  } );

  const updateData = useMutation( {
    mutationFn: async ( updatedData ) => {
      await dashboardApi.put( `/${ endpoint }/${ updatedData.id }`, updatedData );
    },
    onSuccess: () => {
      queryClient.invalidateQueries( [ endpoint ] );
    },
  } );

  const deleteData = useMutation( {
    mutationFn: async ( id ) => {
      await dashboardApi.delete( `/${ endpoint }/${ id }` );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        [ endpoint, {'page': page, 'pageSize': pageSize} ]
      );
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
    fetchError
  };
};
export default useApi;