import {useState, useEffect, useCallback} from 'react';
import useAxios from './useAxios';
import axios from 'axios';

const useFetchData = ( endpoint ) => {
  const axiosInstance = useAxios();
  const [ data, setData ] = useState( [] );
  const [ error, setError ] = useState( null );
  const [ loading, setLoading ] = useState( true );

  const fetchData = useCallback( async ( signal ) => {
    try {
      setLoading( true );
      setError( null );

      const response = await axiosInstance.get(
        `${ import.meta.env.VITE_API_URL }/${ endpoint }`,
        {signal}  // Usar signal para cancelación
      );

      setData( response.data );
    } catch ( error ) {
      if ( !axios.isCancel( error ) ) {  // Ignorar errores por cancelación
        setError( error.response?.data?.message || error.message || 'Error desconocido' );
      }
    } finally {
      setLoading( false );
    }
  }, [ endpoint, axiosInstance ] );  // Dependencias correctas

  useEffect( () => {
    const abortController = new AbortController();
    fetchData( abortController.signal );

    return () => {
      abortController.abort();  // Cancelar solicitud al desmontar
    };
  }, [ fetchData ] );  // Dependencia del fetchData memoizado

  return {data, error, loading, refetch: fetchData, axiosInstance};
};

export default useFetchData;
