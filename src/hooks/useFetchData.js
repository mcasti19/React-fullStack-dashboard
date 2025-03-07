// useApi.js
import {useState, useEffect} from 'react';
import useAxios from './useAxios';

const useFetchData = ( endpoint ) => {
  const axiosInstance = useAxios();
  const [ data, setData ] = useState( [] );
  const [ error, setError ] = useState( null );

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/${ endpoint }` );
      setData( response.data );
      console.log( data );

    } catch ( error ) {
      setError( error );
    }
  };

  useEffect( () => {
    fetchData();
  }, [] );

  return {data, error};
};

export default useFetchData;