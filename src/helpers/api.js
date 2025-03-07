// const API_URL = 'http://localhost:4000';
const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzIxM2E4YTI4YWNmMTVjNzU3OGU4NiIsImVtYWlsIjoiYWRtaW5pc3RyYXRvckBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTc0MTI4NzU5NiwiZXhwIjoxNzQxMjk4Mzk2fQ.fNCXxZ-XUJZwBk669j-vfP5WY_3ihPm-i8yf9Ks6yqs'
}

export const fetchUser = async () => {
    console.log( "API URL: ", import.meta.env );
    try {
        // console.log( 'ENTRANDO' );

        const fetchUsers = await fetch( `${ import.meta.env.VITE_API_URL }/users`, {
            headers
        } );
        const resultGetUsers = await fetchUsers.json();
        // console.log( resultGetUsers );

        return resultGetUsers;
    } catch ( error ) {
        console.log( "error :>> ", error );
        throw new Error( "Error al obtener los usuarios: " + error.message );
    }
};

export const fetchEmployees = async () => {
    // console.log( "API URL: ", import.meta.env );

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