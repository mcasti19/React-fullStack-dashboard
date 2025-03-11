import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const roleService = {
  // Fetch all roles with their permissions
  getRoles: async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching roles');
    }
  },

  // Update role permissions
  updateRolePermissions: async (roleId, permissions) => {
    try {
      const response = await axios.put(`${API_URL}/roles/${roleId}`, { permissions });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating role permissions');
    }
  },

  // Create new role
  createRole: async (roleData) => {
    try {
      const response = await axios.post(`${API_URL}/roles`, roleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating role');
    }
  },

  // Delete role
  deleteRole: async (roleId) => {
    try {
      const response = await axios.delete(`${API_URL}/roles/${roleId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting role');
    }
  }
};

export default roleService;
