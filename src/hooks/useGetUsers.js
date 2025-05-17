import {useQuery} from '@tanstack/react-query'
import {getUsers} from '../services/actions';

export const useGetData = () => {

    const userQuery = useQuery( {
        queryKey: [ 'Users' ],
        queryFn: getUsers
    } );
    // console.log( {data} );





    return {userQuery, }
}
