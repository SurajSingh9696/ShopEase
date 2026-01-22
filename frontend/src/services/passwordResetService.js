import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/password-reset`;

export const passwordResetAPI = {
    // Request password reset code
    requestReset: async (email) => {
        const response = await axios.post(`${API_BASE_URL}/request`, { email });
        return response.data;
    },

    // Verify reset code
    verifyCode: async (email, code) => {
        const response = await axios.post(`${API_BASE_URL}/verify`, { email, code });
        return response.data;
    },

    // Reset password
    resetPassword: async (email, code, newPassword) => {
        const response = await axios.post(`${API_BASE_URL}/reset`, { 
            email, 
            code, 
            newPassword 
        });
        return response.data;
    },
};
