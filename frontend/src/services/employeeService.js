/**
 * Employee Service
 * Handles all API calls for employee management
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const EMPLOYEES_ENDPOINT = `${API_BASE_URL}/api/employees`;

/**
 * Add a new employee
 * @param {Object} employeeData - Employee information
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export const addEmployee = async (employeeData) => {
  try {
    const response = await fetch(EMPLOYEES_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to add employee',
      };
    }

    return {
      success: true,
      data: result.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || 'Network error',
    };
  }
};

/**
 * Get all employees
 * @returns {Promise<{success: boolean, data: Array|null, error: string|null}>}
 */
export const getAllEmployees = async () => {
  try {
    console.log('📤 Fetching employees from:', EMPLOYEES_ENDPOINT);
    const response = await fetch(EMPLOYEES_ENDPOINT);
    
    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Headers:', Object.fromEntries(response.headers));
    
    const result = await response.json();
    console.log('📥 Response Body:', result);

    if (!response.ok) {
      console.error('❌ API Error:', result.message);
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to fetch employees',
      };
    }

    console.log('✅ Success! Data:', result.data);
    return {
      success: true,
      data: result.data || [],
      error: null,
    };
  } catch (error) {
    console.error('❌ Network Error:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Network error',
    };
  }
};

/**
 * Update employee
 * @param {string} employeeId - Employee ID to update
 * @param {Object} updateData - Fields to update
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export const updateEmployee = async (employeeId, updateData) => {
  try {
    const response = await fetch(`${EMPLOYEES_ENDPOINT}/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to update employee',
      };
    }

    return {
      success: true,
      data: result.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || 'Network error',
    };
  }
};

/**
 * Delete employee
 * @param {string} employeeId - Employee ID to delete
 * @returns {Promise<{success: boolean, data: null, error: string|null}>}
 */
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await fetch(`${EMPLOYEES_ENDPOINT}/${employeeId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to delete employee',
      };
    }

    return {
      success: true,
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message || 'Network error',
    };
  }
};
