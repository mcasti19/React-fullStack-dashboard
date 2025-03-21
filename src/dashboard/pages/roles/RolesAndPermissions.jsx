import {Box} from '@mui/material'
import React from 'react'
import RolePermissionManager from './components/RolePermissionManager'
import Header from '../../components/Header'
// import useApi from '../../../hooks/useApi'

export const RolesAndPermissionsPage = () => {

  // const {data: roles} = useApi( 'roles' )
  // console.log( roles );


  return (
    <Box className="flex flex-col justify-center">
      <Header title="Roles" subtitle="Managing the Roles & Permissions" />
      <Box>
        <RolePermissionManager />
      </Box>
    </Box>
  )
}
