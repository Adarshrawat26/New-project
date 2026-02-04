/**
 * Breadcrumb Component
 * Navigation breadcrumb for current page
 */

const Breadcrumb = ({ currentPage }) => {
  const breadcrumbMap = {
    dashboard: { label: 'Dashboard', path: 'dashboard' },
    employees: { label: 'Employees', path: 'employees' },
    attendance: { label: 'Attendance', path: 'attendance' },
  };

  const current = breadcrumbMap[currentPage] || breadcrumbMap.dashboard;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <span className="text-gray-600 hover:text-orange-primary transition-colors cursor-pointer">Home</span>
      <span className="text-gray-400 mx-1">/</span>
      <span className="text-gray-900 font-medium">{current.label}</span>
    </div>
  );
};

export default Breadcrumb;

