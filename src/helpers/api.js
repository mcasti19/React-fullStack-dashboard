const API_URL = 'http://localhost:4000';
const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzIxM2E4YTI4YWNmMTVjNzU3OGU4NiIsImVtYWlsIjoiYWRtaW5pc3RyYXRvckBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTc0MTIyMTk2OSwiZXhwIjoxNzQxMjMyNzY5fQ.QkacyrBZ7-KPmPKWTxDNuPkRmcmglBCvaVTMGAdw14I'
}

export const fetchUser = async () => {
    try {
        // console.log( 'ENTRANDO' );

        const fetchUsers = await fetch( `${ API_URL }/users`, {
            headers
        } );
        const resultGetUsers = await fetchUsers.json();
        // console.log( resultGetUsers.users );

        return resultGetUsers.users;
    } catch ( error ) {
        console.log( "error :>> ", error );
        throw new Error( "Error al obtener los usuarios: " + error.message );
    }
};

export const fetchEmployees = async () => {
    try {
        // console.log( 'ENTRANDO' );

        const getEmployees = await fetch( `${ API_URL }/employees`, {
            headers
        } );
        const resultGetEmployees = await getEmployees.json();
        // console.log( resultGetUsers.users );

        return resultGetEmployees;
    } catch ( error ) {
        console.log( "error :>> ", error );
        throw new Error( "Error al obtener los Empleados: " + error.message );
    }
};