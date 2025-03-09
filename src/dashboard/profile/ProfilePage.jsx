import React, {useContext} from 'react';
import {AuthContext} from './authContext';

const Profile = () => {
    const {user} = useContext( AuthContext );

    if ( !user ) {
        return <p>No estás autenticado.</p>;
    }

    return (
        <div>
            <h2>Perfil de Usuario</h2>
            <p>Email: {user.email}</p>
            <p>Nombre: {user.name}</p>
            {/* Agrega más campos según la información que tengas del usuario */}
        </div>
    );
};

export default Profile;