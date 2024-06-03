import { BASE_URL } from './config'

const apiService = {
    login: async (email, pass, isEmployer) => {
      const endpoint = isEmployer ? `${BASE_URL}/login/employer` : `${BASE_URL}/login/seeker`;
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, pass: pass }),
      });
  
      if (!response.ok) throw new Error('Sign in request failed');
      return response.json();
    },
  
    forgetPassword: async (email) => {
      const response = await fetch(`${BASE_URL}/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }
  
      return response.json();
    },
  
    resetPassword: async (newPassword) => {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: newPassword }),
      });
  
      if (!response.ok) throw new Error('Password reset request failed');
      return response.json();
    },
  };

export { apiService };