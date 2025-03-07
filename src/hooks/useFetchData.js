// useApi.js
import {useState, useEffect} from 'react';
import useAxios from './useAxios';

const useFetchData = ( endpoint ) => {
  const axiosInstance = useAxios();
  const [ data, setData ] = useState( [] );
  const [ error, setError ] = useState( null );
  const [ loading, setLoading ] = useState( true ); // Estado de carga

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/${ endpoint }` );
      setData( response.data );
    } catch ( error ) {
      setError( error.message || 'Error fetching data' ); // Manejo de error más informativo
    } finally {
      setLoading( false ); // Cambia el estado de carga a false al final
    }
  };

  useEffect( () => {
    fetchData();
  }, [ endpoint ] ); // Agrega endpoint como dependencia

  return {data, error, loading}; // Devuelve el estado de carga
};

export default useFetchData;