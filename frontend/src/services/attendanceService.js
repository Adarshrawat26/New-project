/**
 * Attendance Service
 * Handles all API calls for attendance management
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const ATTENDANCE_ENDPOINT = `${API_BASE_URL}/api/attendance/`;

/**
 * Mark attendance for an employee
 * @param {string} employeeId - Employee ID
 * @param {Object} attendanceData - Attendance information
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export const markAttendance = async (employeeId, attendanceData) => {
  try {
    const url = new URL(ATTENDANCE_ENDPOINT);
    url.searchParams.append('employee_id', employeeId);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to mark attendance',
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
 * Get all attendance records
 * @returns {Promise<{success: boolean, data: Array|null, error: string|null}>}
 */
export const getAllAttendance = async () => {
  try {
    console.log('📤 Fetching attendance from:', ATTENDANCE_ENDPOINT);
    const response = await fetch(ATTENDANCE_ENDPOINT);
    
    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Headers:', Object.fromEntries(response.headers));
    
    const result = await response.json();
    console.log('📥 Response Body:', result);

    if (!response.ok) {
      console.error('❌ API Error:', result.message);
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to fetch attendance',
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
 * Get attendance for specific employee
 * @param {string} employeeId - Employee ID
 * @returns {Promise<{success: boolean, data: Array|null, error: string|null}>}
 */
export const getEmployeeAttendance = async (employeeId) => {
  try {
    const response = await fetch(`${ATTENDANCE_ENDPOINT}employee/${employeeId}`);
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to fetch attendance',
      };
    }

    return {
      success: true,
      data: result.data || [],
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
 * Get attendance by date
 * @param {string} attendanceDate - Date in YYYY-MM-DD format
 * @returns {Promise<{success: boolean, data: Array|null, error: string|null}>}
 */
export const getAttendanceByDate = async (attendanceDate) => {
  try {
    const response = await fetch(`${ATTENDANCE_ENDPOINT}date/${attendanceDate}`);
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: null,
        error: result.message || 'Failed to fetch attendance',
      };
    }

    return {
      success: true,
      data: result.data || [],
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
