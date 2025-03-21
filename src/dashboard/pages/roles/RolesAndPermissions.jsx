import {Box} from '@mui/material'
import React from 'react'
import RolePermissionManager from './components/RolePermissionManager'
// import useApi from '../../../hooks/useApi'

export const RolesAndPermissions = () => {

  // const {data: roles} = useApi( 'roles' )
  // console.log( roles );


  return (
    <Box className="h-full flex flex-col justify-center items-center">
      <div>Roles</div>
      <RolePermissionManager  />
    </Box>
  )
}
