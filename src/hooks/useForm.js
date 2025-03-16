// import {useEffect, useMemo, useState, useCallback} from 'react';

// export const useForm = ( initialForm = {}, formValidations = {} ) => {
//     const [ formState, setFormState ] = useState( initialForm );
//     const [ formValidation, setFormValidation ] = useState( {} );

//     // Efecto para sincronizar initialForm con formState
//     useEffect( () => {
//         if ( JSON.stringify( initialForm ) !== JSON.stringify( formState ) ) {
//             setFormState( initialForm );
//         }
//     }, [ initialForm ] ); // Dependencias: initialForm y formState

//     // Validaciones
//     const createValidator = useCallback( () => {
//         const formCheckedValues = {};
//         for ( const formField of Object.keys( formValidations ) ) {
//             const [ fn, errorMessage ] = formValidations[ formField ];
//             formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage;
//         }
//         setFormValidation( formCheckedValues );
//     }, [ formState, formValidations ] );

//     useEffect( () => {
//         createValidator();
//     }, [ createValidator, formState ] ); // Ejecutar solo cuando formState cambie
//     // Resto del código igual...
//     const isFormValid = useMemo( () => {
//         return Object.values( formValidation ).every( val => val === null );
//     }, [ formValidation ] );

//     const onInputChange = ( {target} ) => {
//         const {name, value} = target;
//         setFormState( prev => ( {
//             ...prev,
//             [ name ]: value
//         } ) );
//     }

//     const onResetForm = () => {
//         setFormState( initialForm );
//     }




//     useEffect( () => {
//         // Compara si el initialForm actual es diferente al formState actual.
//         if ( JSON.stringify( initialForm ) !== JSON.stringify( formState ) ) {
//             setFormState( initialForm );
//         }
//     }, [ formState, initialForm ] ); // Añade formState como dependencia para evitar ciclos.

//     return {
//         ...formState,
//         onInputChange,
//         onResetForm,
//         ...formValidation,
//         isFormValid,
//         formState
//     }
// }



import {useEffect, useMemo, useState} from 'react';
export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( {} );

    useEffect( () => {
        createValidator();
    }, [ formState ] )

    useEffect( () => {
        setFormState( initialForm )
    }, [ initialForm ] )


    const isFormValid = useMemo( () => {
        for ( const formValue of Object.keys( formValidation ) ) {
            if ( formValidation[ formValue ] !== null ) return false;
        }
        return true;
    }, [ formValidation ] )


    const onInputChange = ( {target} ) => {
        // console.log( target );z
        const {name, value} = target;
        setFormState( {
            ...formState,
            [ name ]: value
        } );
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidator = () => {
        const formCheckedValues = {}
        for ( const formField of Object.keys( formValidations ) ) { //TODO IMPORTANTE VER PARA ENTENDER MEJOR: https://prnt.sc/Y5NfsbbUG9d5
            const [ fn, errorMessage ] = formValidations[ formField ];
            formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage;
        }
        setFormValidation( formCheckedValues ); // console.log( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}