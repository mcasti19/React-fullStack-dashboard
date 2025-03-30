import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import dashboardApi from '../api/dashboardApi';


const useApi = ( endpoint ) => {
  const queryClient = useQueryClient();

  // Función para obtener los datos
  const fetchData = async () => {
    const response = await dashboardApi.get( `/${ endpoint }` );
    return response.data;
  };

  // Usar useQuery con la nueva sintaxis
  const {data, error, isLoading} = useQuery( {
    queryKey: [ endpoint ], // Cambia esto para usar el endpoint como clave
    queryFn: fetchData,
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
  };
};
export default useApi;














// import {useState, useEffect, useCallback} from 'react';
// import axios from 'axios';
// import dashboardApi from '../api/dashboardApi';

// const initialState = {
//   data: [],
//   error: null,
//   loading: true,
// };

// const useApi = ( endpoint ) => {
//   const [ state, setState ] = useState( initialState );

//   const fetchData = useCallback( async ( signal ) => {
//     try {
//       setState( ( prev ) => ( {...prev, loading: true, error: null} ) );
//       const response = await dashboardApi.get( `/${ endpoint }`, {signal} );
//       setState( ( prev ) => ( {...prev, data: response.data, loading: false} ) );
//     } catch ( error ) {
//       if ( !axios.isCancel( error ) ) {
//         setState( ( prev ) => ( {...prev, error: error.response?.data?.message || error.message || 'Error desconocido', loading: false} ) );
//       }
//     }
//   }, [ endpoint ] );

//   const refetch = useCallback( async () => {
//     await fetchData();
//   }, [ fetchData ] );

//   const sendData = useCallback( async ( data, signal ) => {
//     try {
//       setState( ( prev ) => ( {...prev, loading: true, error: null} ) );
//       await dashboardApi.post( `/${ endpoint }`, data, {signal} );
//       setState( ( prev ) => ( {...prev, loading: false} ) );
//     } catch ( error ) {
//       if ( !axios.isCancel( error ) ) {
//         setState( ( prev ) => ( {...prev, error: error.response?.data?.message || error.message || 'Error desconocido', loading: false} ) );
//       }
//     }
//   }, [ endpoint ] );

//   const handleDelete = useCallback( async ( id, name, signal ) => {
//     try {
//       if ( window.confirm( `¿Eliminar a ${ name }?` ) ) {
//         await dashboardApi.delete( `/${ endpoint }/${ id }`, {signal} );
//         refetch();
//       }
//     } catch ( error ) {
//       if ( !axios.isCancel( error ) ) {
//         setState( ( prev ) => ( {...prev, error: error.response?.data?.message || error.message || 'Error desconocido'} ) );
//       }
//     }
//   }, [ endpoint, refetch ] );

//   useEffect( () => {
//     if ( endpoint && typeof endpoint === 'string' ) {
//       const abortController = new AbortController();
//       fetchData( abortController.signal );
//       return () => {
//         abortController.abort();
//       };
//     }
//   }, [ fetchData, endpoint ] );

//   return {
//     data: state.data,
//     error: state.error,
//     loading: state.loading,
//     refetch,
//     sendData,
//     handleDelete,
//     dashboardApi,
//   };
// };

// export default useApi;