/**
 * Attendance Tracker Page
 * Mark and view employee attendance
 */
import { useCallback, useState } from 'react';
import { Alert, AlertDescription, AlertTitle, Badge, Button, Card, CardContent, CardHeader, CardTitle, Input } from '../components/ui';
import { useFetch } from '../hooks/useFetch.js';
import { useForm } from '../hooks/useForm.js';
import {
  getAllEmployees,
  getEmployeeAttendance,
  markAttendance,
} from '../services/index.js';

const AttendanceTrackerPage = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Fetch all employees
  const fetchEmployees = useCallback(() => getAllEmployees(), []);
  const { data: employeesData } = useFetch(fetchEmployees);
  const employees = employeesData || [];

  // Form hook
  const form = useForm(
    {
      attendance_date: today,
      is_present: true,
      check_in_time: '09:00',
      check_out_time: '17:00',
      notes: '',
    },
    handleSubmit
  );

  async function handleSubmit(values) {
    if (!selectedEmployeeId) {
      setSubmitError('Please select an employee');
      return;
    }

    setSubmitError('');
    setSubmitSuccess('');

    try {
      const { success, error } = await markAttendance(selectedEmployeeId, values);

      if (!success) {
        setSubmitError(error || 'Failed to mark attendance');
        return;
      }

      setSubmitSuccess('Attendance marked successfully!');
      form.resetForm();

      // Reload attendance records
      loadEmployeeAttendance(selectedEmployeeId);
    } catch (error) {
      setSubmitError(error.message || 'An error occurred');
    }
  }

  const loadEmployeeAttendance = async (employeeId) => {
    if (!employeeId) return;

    const { success, data, error } = await getEmployeeAttendance(employeeId);

    if (success) {
      setAttendanceRecords(data || []);
    } else {
      setSubmitError(error || 'Failed to load attendance');
    }
  };

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmployeeId(empId);
    setSubmitError('');
    setSubmitSuccess('');

    if (empId) {
      loadEmployeeAttendance(empId);
    } else {
      setAttendanceRecords([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <main className="container mx-auto px-6 py-8 lg:py-12 max-w-7xl">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#E85D31] font-medium mb-3">
            Track & Manage
          </span>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 text-gray-900">
            Attendance Tracker
          </h1>
          <p className="text-base text-gray-600">Mark attendance and view employee history</p>
        </div>

        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        
        {submitSuccess && (
          <Alert variant="success" className="mb-6">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{submitSuccess}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="employee_select" className="block text-sm font-medium text-gray-900 mb-2">
                      Select Employee *
                    </label>
                    <select
                      id="employee_select"
                      value={selectedEmployeeId}
                      onChange={handleEmployeeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#E85D31] focus:ring-2 focus:ring-[#E85D31]/10"
                    >
                      <option value="">-- Select an employee --</option>
                      {employees.map((emp) => (
                        <option key={emp.employee_id} value={emp.employee_id}>
                          {emp.full_name} ({emp.employee_id})
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEmployeeId && (
                    <>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Date
                        </label>
                        <p className="text-lg font-semibold text-blue-600">
                          {new Date(today).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">Attendance can only be marked for today</p>
                      </div>

                      <div>
                        <label htmlFor="is_present" className="block text-sm font-medium text-gray-900 mb-2">
                          Status *
                        </label>
                        <select
                          id="is_present"
                          name="is_present"
                          value={form.values.is_present ? 'true' : 'false'}
                          onChange={(e) => {
                            form.handleChange({
                              target: {
                                name: 'is_present',
                                value: e.target.value === 'true',
                              },
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#E85D31] focus:ring-2 focus:ring-[#E85D31]/10"
                        >
                          <option value="true">Present</option>
                          <option value="false">Absent</option>
                        </select>
                      </div>

                      {form.values.is_present && (
                        <>
                          <div>
                            <label htmlFor="check_in_time" className="block text-sm font-medium text-gray-900 mb-2">
                              Check-in Time
                            </label>
                            <Input
                              type="time"
                              id="check_in_time"
                              name="check_in_time"
                              value={form.values.check_in_time}
                              onChange={form.handleChange}
                            />
                          </div>

                          <div>
                            <label htmlFor="check_out_time" className="block text-sm font-medium text-gray-900 mb-2">
                              Check-out Time
                            </label>
                            <Input
                              type="time"
                              id="check_out_time"
                              name="check_out_time"
                              value={form.values.check_out_time}
                              onChange={form.handleChange}
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-900 mb-2">
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={form.values.notes}
                          onChange={form.handleChange}
                          placeholder="Optional notes..."
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#E85D31] focus:ring-2 focus:ring-[#E85D31]/10"
                        />
                      </div>

                      <div className="flex gap-3 pt-2 border-t border-gray-200">
                        <Button
                          type="submit"
                          disabled={form.isSubmitting}
                        >
                          Mark Attendance
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            form.resetForm();
                            setSelectedEmployeeId('');
                            setSubmitError('');
                            setSubmitSuccess('');
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            {selectedEmployeeId && (
              <Card>
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                </CardHeader>
                <CardContent>
                  {!attendanceRecords || attendanceRecords.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No attendance records for this employee</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {attendanceRecords.map((record) => (
                        <div key={record.id} className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all hover:border-gray-300">
                          {/* Header with Date and Status */}
                          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">Date</p>
                              <h3 className="text-lg font-bold text-gray-900">
                                {new Date(record.attendance_date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                              </h3>
                            </div>
                            <Badge variant={record.is_present ? 'success' : 'destructive'} className="px-3 py-1 text-sm">
                              {record.is_present ? 'Present' : 'Absent'}
                            </Badge>
                          </div>

                          {/* Check-in and Check-out Times */}
                          {record.is_present && (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                                  Check-in
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {record.check_in_time ? new Date(`2000-01-01T${record.check_in_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                                  Check-out
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {record.check_out_time ? new Date(`2000-01-01T${record.check_out_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Notes */}
                          {record.notes && (
                            <div className="pt-3 border-t border-gray-100">
                              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Notes</p>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {record.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceTrackerPage;
