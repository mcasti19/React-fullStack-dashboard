import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router';
import {useDebouncedCallback} from 'use-debounce';

const Search = () => {
    const [ searchValue, setSearchValue ] = useState( '' );
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnChange = useDebouncedCallback( ( value ) => {
        const params = new URLSearchParams( location.search );
        if ( value ) {
            params.set( 'query', value );
        } else {
            params.delete( 'query' );
        }
        navigate( `${ location.pathname }?${ params.toString() }` );
    }, 1000 );

    useEffect( () => {
        const params = new URLSearchParams( location.search );
        const query = params.get( 'query' );
        if ( query ) {
            setSearchValue( query );
        }
    }, [ location.search ] );

    return (
        <input
            type="search"
            placeholder="Search..."
            value={searchValue}
            onChange={( e ) => {
                setSearchValue( e.target.value );
                handleOnChange( e.target.value );
            }}
        />
    );
};

export default Search;