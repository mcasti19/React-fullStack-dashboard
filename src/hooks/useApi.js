import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import dashboardApi from '../api/dashboardApi';

const initialState = {
  data: [],
  error: null,
  loading: true,
};

const useApi = ( endpoint ) => {
  const [ state, setState ] = useState( initialState );

  const fetchData = useCallback( async ( signal ) => {
    try {
      setState( ( prev ) => ( {...prev, loading: true, error: null} ) );
      const response = await dashboardApi.get( `/${ endpoint }`, {signal} );
      setState( ( prev ) => ( {...prev, data: response.data, loading: false} ) );
    } catch ( error ) {
      if ( !axios.isCancel( error ) ) {
        setState( ( prev ) => ( {...prev, error: error.response?.data?.message || error.message || 'Error desconocido', loading: false} ) );
      }
    }
  }, [ endpoint ] );

  const refetch = useCallback( async () => {
    await fetchData();
  }, [ fetchData ] );

  const sendData = useCallback( async ( data, signal ) => {
    try {
      setState( ( prev ) => ( {...prev, loading: true, error: null} ) );
      await dashboardApi.post( `/${ endpoint }`, data, {signal} );
      setState( ( prev ) => ( {...prev, loading: false} ) );
    } catch ( error ) {
      if ( !axios.isCancel( error ) ) {
        setState( ( prev ) => ( {...prev, error: error.response?.data?.message || error.message || 'Error desconocido', loading: false} ) );
      }
    }
  }, [ endpoint ] );

  const handleDelete = useCallback( async ( id, name, signal ) => {
    try {
      if ( window.confirm( `¿Eliminar a ${ name }?` ) ) {
        await dashboardApi.delete( `/${ endpoint }/${ id }`, {signal} );
        refetch();
      }
    } catch ( error ) {
      if ( !axios.isCancel( error ) ) {
        setState( ( prev ) => ( {...prev, error: error.response?.data?.message || error.message || 'Error desconocido'} ) );
      }
    }
  }, [ endpoint, refetch ] );

  useEffect( () => {
    if ( endpoint && typeof endpoint === 'string' ) {
      const abortController = new AbortController();
      fetchData( abortController.signal );
      return () => {
        abortController.abort();
      };
    }
  }, [ fetchData, endpoint ] );

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    refetch,
    sendData,
    handleDelete,
    dashboardApi,
  };
};

export default useApi;









// import {useState, useEffect, useCallback} from 'react';
// import useAxios from './useAxios';
// import axios from 'axios';

// export const useFetchData = ( endpoint ) => {
//   const axiosInstance = useAxios();
//   const [ data, setData ] = useState( [] );
//   const [ error, setError ] = useState( null );
//   const [ loading, setLoading ] = useState( true );

//   const fetchData = useCallback( async ( signal ) => {
//     try {
//       setLoading( true );
//       setError( null );

//       const response = await axiosInstance.get(
//         `${ import.meta.env.VITE_API_URL }/${ endpoint }`,
//         {signal}  // Usar signal para cancelación
//       );

//       setData( response.data );
//     } catch ( error ) {
//       if ( !axios.isCancel( error ) ) {  // Ignorar errores por cancelación
//         setError( error.response?.data?.message || error.message || 'Error desconocido' );
//       }
//     } finally {
//       setLoading( false );
//     }
//   }, [ endpoint, axiosInstance ] );  // Dependencias correctas

//   useEffect( () => {
//     if ( endpoint && typeof endpoint === 'string' ) {
//       const abortController = new AbortController();
//       fetchData( abortController.signal );
//       return () => {
//         abortController.abort();
//       };
//     }
//   }, [ fetchData, endpoint ] );  // Dependencia del fetchData memoizado

//   return {data, setData, error, loading, refetch: fetchData, axiosInstance};
// };


// export const useSendData = ( endpoint, data ) => {
//   const axiosInstance = useAxios();

//   const [ error, setError ] = useState( null );
//   const [ loading, setLoading ] = useState( true );

//   const postData = useCallback( async ( signal ) => {
//     try {
//       setLoading( true );
//       setError( null );

//       await axiosInstance.post(
//         `${ import.meta.env.VITE_API_URL }/${ endpoint }`,
//         {signal}  // Usar signal para cancelación
//       );

//     } catch ( error ) {
//       if ( !axios.isCancel( error ) ) {  // Ignorar errores por cancelación
//         setError( error.response?.data?.message || error.message || 'Error desconocido' );
//       }
//     } finally {
//       setLoading( false );
//     }
//   }, [ endpoint, axiosInstance ] );  // Dependencias correctas

//   useEffect( () => {
//     if ( endpoint && typeof endpoint === 'string' ) {
//       const abortController = new AbortController();
//       postData( abortController.signal, data );
//       return () => {
//         abortController.abort();
//       };
//     }
//   }, [ postData, endpoint, data ] );  // Dependencia del fetchData memoizado
//   return {data, error, loading, refetch: postData, axiosInstance};
// }