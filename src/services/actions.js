import dashboardApi from "../api/dashboardApi"



export const getUsers = async ( page = 1, pageSize = 5 ) => {
    const {data} = await dashboardApi.get( '/users', {
        params: {
            page,
            pageSize,
        },
    } );
    // console.log( 'GEtUsers :', data );

    return data
}

export const getemployees = async () => {

    try {
        const {data} = await dashboardApi.get( '/employees' );
        console.log( 'getemployees ', data.employees );

    } catch ( error ) {
        console.log( error );

    }

    return {getemployees}
}