/**
 * Attendance Chart Component
 * Displays attendance statistics and trends using Recharts
 */
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

/**
 * Attendance Trends Chart - Monthly Bar Chart
 */
export function AttendanceChart({ attendance = [] }) {
  // Group attendance data by month from real data
  const today = new Date();
  const monthlyData = {};
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    monthlyData[month] = { present: 0, absent: 0 };
  }
  
  // Count attendance records by month
  attendance.forEach(record => {
    const attDate = new Date(record.attendance_date);
    const month = attDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    
    if (monthlyData[month]) {
      if (record.is_present) {
        monthlyData[month].present += 1;
      } else {
        monthlyData[month].absent += 1;
      }
    }
  });
  
  const attendanceData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    present: data.present,
    absent: data.absent,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={attendanceData} barGap={8}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="square"
          />
          <Bar dataKey="present" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Present" />
          <Bar dataKey="absent" fill="#ef4444" radius={[6, 6, 0, 0]} name="Absent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Attendance Status Chart - Doughnut/Pie Chart
 */
export function AttendanceStatusChart({ attendance = [] }) {
  const presentCount = attendance.filter(a => a.is_present).length;
  const absentCount = attendance.filter(a => !a.is_present).length;

  const data = [
    { name: 'Present', value: presentCount, fill: '#22c55e' },
    { name: 'Absent', value: absentCount, fill: '#ef4444' },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
            formatter={(value) => [`${value} records`, 'Count']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Daily Attendance Trend Chart - Line Chart
 */
export function DailyAttendanceTrendChart({ attendance = [] }) {
  // Get last 7 days of data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const dailyData = last7Days.map(date => {
    const count = attendance.filter(
      a => new Date(a.attendance_date).toISOString().split('T')[0] === date
    ).length;
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      attendance: count,
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
            cursor={{ stroke: '#E85D31', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="attendance" 
            stroke="#E85D31" 
            strokeWidth={2}
            dot={{ fill: '#E85D31', r: 5 }}
            activeDot={{ r: 7 }}
            name="Daily Attendance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Employee Attendance Rate Chart - Horizontal Bar Chart
 */
export function EmployeeAttendanceRateChart({ employees = [], attendance = [] }) {
  const employeeAttendanceData = employees.slice(0, 5).map(emp => {
    const empAttendance = attendance.filter(a => a.employee_id === emp.employee_id);
    const presentCount = empAttendance.filter(a => a.is_present).length;
    const rate = empAttendance.length > 0 ? ((presentCount / empAttendance.length) * 100).toFixed(1) : 0;
    return {
      name: emp.full_name.substring(0, 12),
      rate: parseFloat(rate),
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={employeeAttendanceData}
          layout="vertical"
          barGap={8}
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis dataKey="name" type="category" stroke="#6b7280" style={{ fontSize: '11px' }} width={100} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}
            formatter={(value) => [`${value.toFixed(1)}%`, 'Attendance Rate']}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar dataKey="rate" fill="#E85D31" radius={[0, 6, 6, 0]} name="Attendance Rate %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
