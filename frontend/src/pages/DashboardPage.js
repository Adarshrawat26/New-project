/**
 * Dashboard Page
 * Shows system overview with statistics
 */
import { AttendanceChart } from '../components/Charts/AttendanceChart.js';
import { PerformanceScoreChart } from '../components/Charts/PerformanceChart.js';
import { Alert, AlertDescription, AlertTitle, Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui';
import { useFetch } from '../hooks/useFetch.js';
import { getAllAttendance, getAllEmployees } from '../services/index.js';


const DashboardPage = () => {
  
  const { data: employees, loading: empLoading, error: empError } = useFetch(
    async () => {
      const result = await getAllEmployees();
      console.log('Employees API Response:', result);
      console.log('Employees Data:', result.data);
      return result;
    },
    []
  );

  const { data: attendance, loading: attLoading, error: attError } = useFetch(
    async () => {
      const result = await getAllAttendance();
      console.log('Attendance API Response:', result);
      console.log('Attendance Data:', result.data);
      return result;
    },
    []
  );

  const totalEmployees = employees?.length || 0;
  const totalAttendance = attendance?.length || 0;

  const hasError = empError || attError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <main className="container mx-auto px-6 py-8 lg:py-12 max-w-7xl">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#E85D31] font-medium mb-3">
            System Overview
          </span>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 text-gray-900">
            HR Dashboard
          </h1>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed">
            Manage employee leaves, attendance, and HR operations
          </p>
        </div>

        {(empLoading || attLoading) && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#E85D31] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm text-gray-500">Loading dashboard data...</p>
            </div>
          </div>
        )}

        {hasError && !empLoading && !attLoading && (
          <Alert variant="destructive">
            <AlertTitle>Unable to Connect to Backend</AlertTitle>
            <AlertDescription>
              Make sure the backend server is running on http://localhost:8000
              <br />
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">cd backend && uvicorn app.main:app --reload</code>
            </AlertDescription>
          </Alert>
        )}

        {!hasError && !empLoading && !attLoading && (
          <>
            {/* Stats Grid - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                  {/* Total Employees Stat */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Total Employees</p>
                        <p className="text-2xl text-gray-900 mb-2 font-semibold">{totalEmployees}</p>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up size-4 text-green-600">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                          <span className="text-sm text-green-600">+12%</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users size-6">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Records Stat */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Attendance Records</p>
                        <p className="text-2xl text-gray-900 mb-2 font-semibold">{totalAttendance}</p>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up size-4 text-green-600">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                          <span className="text-sm text-green-600">+8%</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list size-6">
                          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <path d="M9 9h6"></path>
                          <path d="M9 13h6"></path>
                          <path d="M9 17h2"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Present Today Stat */}
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Present Today</p>
                        <p className="text-2xl text-gray-900 mb-2 font-semibold">
                          {attendance?.filter(a => {
                            const attDate = new Date(a.attendance_date).toDateString();
                            const today = new Date().toDateString();
                            return attDate === today && a.is_present;
                          }).length || 0}
                        </p>
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up size-4 text-green-600">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                          <span className="text-sm text-green-600">
                            {totalEmployees > 0 
                              ? Math.round((attendance?.filter(a => {
                                  const attDate = new Date(a.attendance_date).toDateString();
                                  const today = new Date().toDateString();
                                  return attDate === today && a.is_present;
                                }).length / totalEmployees) * 100) 
                              : 0}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check size-6">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <polyline points="16 11 18 13 22 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Attendance Trends Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Trends</CardTitle>
                      <CardDescription>Monthly attendance overview</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <AttendanceChart attendance={attendance || []} />
                    </CardContent>
                  </Card>

                  {/* Performance Score Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Score</CardTitle>
                      <CardDescription>Monthly performance metrics vs target</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <PerformanceScoreChart />
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity & Department Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Recent Attendance Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {attendance && attendance.length > 0 ? (
                          attendance.slice(0, 4).map((record, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                                {record.employee_name?.substring(0, 2).toUpperCase() || '??'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{record.employee_name || 'Unknown'}</p>
                                <p className="text-sm text-gray-500">{record.is_present ? 'Present' : 'Absent'}</p>
                              </div>
                              <p className="text-xs text-gray-500 whitespace-nowrap">{new Date(record.attendance_date).toLocaleDateString()}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-4">No attendance records</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Department Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Department Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {employees && employees.length > 0 ? (
                          (() => {
                            const deptCount = {};
                            employees.forEach(emp => {
                              const dept = emp.department || 'Unassigned';
                              deptCount[dept] = (deptCount[dept] || 0) + 1;
                            });
                            return Object.entries(deptCount).map(([dept, count]) => (
                              <div key={dept}>
                                <div className="flex justify-between items-center mb-2">
                                  <p className="text-sm font-medium text-gray-900">{dept}</p>
                                  <p className="text-sm font-semibold text-[#E85D31]">{count}</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((count / employees.length) * 100, 100)}%` }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{count} {count === 1 ? 'employee' : 'employees'}</p>
                              </div>
                            ));
                          })()
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-4">No employee data</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
            </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
