// const API_URL = 'http://localhost:4000';

import {useState} from 'react';
import useAxios from '../hooks/useAxios';
// import useAxios from './useAxios';

const headers = {
    'Content-Type': 'application/json',
}

export const fetchUser = async () => {
    const axiosInstance = useAxios();
    const [ data, setData ] = useState( [] );

    try {
        const response = await axiosInstance.get( `${ import.meta.env.VITE_API_URL }/users`, {
            headers
        } );
        const resultGetUsers = await response.data;
        return resultGetUsers;
    } catch ( error ) {
        console.log( "error :>> ", error );
        throw new Error( "Error al obtener los usuarios: " + error.message );
    }
};

export const fetchEmployees = async () => {
    try {
        const getEmployees = await fetch( `${ import.meta.env.VITE_API_URL }/employees`, {
            headers
        } );
        const resultGetEmployees = await getEmployees.json();
        return resultGetEmployees;

    } catch ( error ) {
        console.log( "error :>> ", error );
        throw new Error( "Error al obtener los Empleados: " + error.message );
    }
};