/**
 * Employee List Page
 * Complete employee management interface
 */
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle, Avatar, AvatarFallback, Badge, Button, Card, Dialog, DialogContent, DialogFooter, DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Input } from '../components/ui';
import { useFetch } from '../hooks/useFetch.js';
import { useForm } from '../hooks/useForm.js';
import {
    addEmployee,
    deleteEmployee,
    getAllEmployees,
    updateEmployee,
} from '../services/index.js';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Department');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Avatar color variations based on initials
  const getAvatarColor = (name) => {
    const colors = [
      { bg: 'bg-blue-100', text: 'text-blue-700' },
      { bg: 'bg-purple-100', text: 'text-purple-700' },
      { bg: 'bg-pink-100', text: 'text-pink-700' },
      { bg: 'bg-green-100', text: 'text-green-700' },
      { bg: 'bg-orange-100', text: 'text-orange-700' },
      { bg: 'bg-red-100', text: 'text-red-700' },
      { bg: 'bg-indigo-100', text: 'text-indigo-700' },
      { bg: 'bg-cyan-100', text: 'text-cyan-700' },
    ];
    const hash = (name || '').charCodeAt(0);
    return colors[hash % colors.length];
  };

  // Fetch all employees
  const { data: fetchedEmployees, loading: loadingEmployees } = useFetch(
    () => getAllEmployees(),
    []
  );

  // Function to refetch employees from API
  const refetchEmployees = async () => {
    const response = await getAllEmployees();
    if (response && response.success && response.data) {
      setEmployees(Array.isArray(response.data) ? response.data : []);
    }
  };

  React.useEffect(() => {
    if (fetchedEmployees) {
      // Ensure employees is always an array
      setEmployees(Array.isArray(fetchedEmployees) ? fetchedEmployees : []);
    }
  }, [fetchedEmployees]);

  // Form hook
  const form = useForm(
    {
      employee_id: '',
      full_name: '',
      email: '',
      department: '',
      role: 'Employee',
    },
    handleSubmit
  );

  async function handleSubmit(values) {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      if (editingEmployee) {
        // Update employee
        const { success, error } = await updateEmployee(
          editingEmployee.employee_id,
          values
        );

        if (!success) {
          setSubmitError(error || 'Failed to update employee');
          return;
        }

        // Refetch immediately to get updated data
        await refetchEmployees();
        
        // Show success message and close modal immediately
        setSubmitSuccess('Employee updated successfully!');
        setIsModalOpen(false);
        form.resetForm();
        setEditingEmployee(null);
        
        // Auto-clear success message after 4 seconds
        setTimeout(() => setSubmitSuccess(''), 4000);
      } else {
        // Add new employee
        const { success, error, data } = await addEmployee(values);

        if (!success) {
          setSubmitError(error || 'Failed to add employee');
          return;
        }

        // Refetch immediately to get the newly added employee
        await refetchEmployees();
        
        // Show success message and close modal immediately
        setSubmitSuccess('Employee added successfully!');
        setIsModalOpen(false);
        form.resetForm();
        setEditingEmployee(null);
        
        // Auto-clear success message after 4 seconds
        setTimeout(() => setSubmitSuccess(''), 4000);
      }
    } catch (error) {
      setSubmitError(error.message || 'An error occurred');
    }
  }

  const handleAddClick = () => {
    setEditingEmployee(null);
    form.resetForm();
    setSubmitError('');
    setSubmitSuccess('');
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    form.setValues({
      employee_id: employee.employee_id,
      full_name: employee.full_name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
    });
    setSubmitError('');
    setSubmitSuccess('');
    setIsModalOpen(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      const { success, error } = await deleteEmployee(employeeId);

      if (!success) {
        setSubmitError(error || 'Failed to delete employee');
        return;
      }

      setSubmitSuccess('Employee deleted successfully!');
      // Refetch from API to get latest data
      refetchEmployees();
    } catch (error) {
      setSubmitError(error.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <main className="container mx-auto px-6 py-8 lg:py-12 max-w-7xl">
        <div className="flex justify-between items-start mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#E85D31] font-medium mb-3">
              Manage Team
            </span>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-2 text-gray-900">
              Employee Management
            </h1>
            <p className="text-base text-gray-600">{employees.length} total employees</p>
          </div>
          <Button onClick={handleAddClick} className="bg-[#E85D31] hover:bg-[#d54920]">
            + Add Employee
          </Button>
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

        {/* Search and Filter Section */}
        {!loadingEmployees && employees.length > 0 && (
          <div className="mb-8 flex gap-2 items-center w-full">
            {/* Search Bar */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-50 bg-white hover:border-gray-300 transition-colors text-sm"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-2">
              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-50 bg-white text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-300 transition-colors min-w-[140px]"
              >
                <option value="All Department">All Department</option>
                {Array.isArray(employees) && [...new Set(employees.map(emp => emp.department))].sort().map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-50 bg-white text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-300 transition-colors min-w-[120px]"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        )}

        {loadingEmployees ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading employees...</p>
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No employees found</p>
            <Button onClick={handleAddClick}>Add Your First Employee</Button>
          </div>
        ) : (
          <>
            {/* Filtered Employee Grid */}
            {(() => {
              const employeesArray = Array.isArray(employees) ? employees : [];
              const filteredEmployees = employeesArray.filter((employee) => {
                // Search filter
                const searchLower = searchQuery.toLowerCase();
                const matchesSearch =
                  !searchQuery ||
                  employee.full_name.toLowerCase().includes(searchLower) ||
                  employee.email.toLowerCase().includes(searchLower) ||
                  employee.role.toLowerCase().includes(searchLower);

                // Department filter
                const matchesDepartment =
                  departmentFilter === 'All Department' ||
                  employee.department === departmentFilter;

                // Status filter
                const matchesStatus =
                  statusFilter === 'All Status' ||
                  (employee.status || 'Active') === statusFilter;

                return matchesSearch && matchesDepartment && matchesStatus;
              });

              if (filteredEmployees.length === 0) {
                return (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No employees match your filters</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredEmployees.map((employee) => (
                    <Card key={employee.id} className="hover:shadow-lg transition-shadow overflow-visible">
                      {/* Header with Avatar and Menu */}
                      <div className="p-5 flex justify-between items-start border-b border-gray-100">
                  <Avatar className="size-12 rounded-full shrink-0">
                    <AvatarFallback className={`${getAvatarColor(employee.full_name).bg} ${getAvatarColor(employee.full_name).text} font-bold text-lg flex items-center justify-center`}>
                      {employee.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'EM'}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600 text-lg">
                        ⋮
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(employee)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(employee.employee_id)} className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Name */}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{employee.full_name}</h3>
                  
                  {/* Role */}
                  <p className="text-sm text-gray-600 mb-4">{employee.role}</p>
                  
                  {/* Contact Information */}
                  <div className="space-y-3 text-sm mb-5">
                    {/* Email */}
                    {employee.email && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="text-base">✉</span>
                        <a href={`mailto:${employee.email}`} className="hover:text-[#E85D31] break-all">
                          {employee.email}
                        </a>
                      </div>
                    )}
                    
                    {/* Phone */}
                    {employee.phone && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="text-base">☎</span>
                        <a href={`tel:${employee.phone}`} className="hover:text-[#E85D31]">
                          {employee.phone}
                        </a>
                      </div>
                    )}
                    
                    {/* Location */}
                    {employee.location && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <span className="text-base">📍</span>
                        <span>{employee.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer with Department and Status */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">{employee.department}</span>
                    <Badge className={`text-xs font-medium ${
                      employee.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : employee.status === 'On Leave'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status || 'Active'}
                    </Badge>
                  </div>
                </div>
              </Card>
                    ))}
                </div>
              );
            })()}
          </>
        )}

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md p-6">
            {/* Header with avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              {editingEmployee && (
                <Avatar className="size-14 shrink-0">
                  <AvatarFallback className={`${getAvatarColor(editingEmployee.full_name).bg} ${getAvatarColor(editingEmployee.full_name).text} font-bold text-2xl flex items-center justify-center`}>
                    {editingEmployee.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'EM'}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {editingEmployee ? 'Update employee information' : 'Add a new employee to the system'}
                </p>
              </div>
            </div>

            <form onSubmit={form.handleSubmit} className="space-y-5">
              {/* Row 1: Employee ID and Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="employee_id" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Employee ID *
                  </label>
                  <Input
                    type="text"
                    id="employee_id"
                    name="employee_id"
                    value={form.values.employee_id}
                    onChange={form.handleChange}
                    disabled={editingEmployee ? true : false}
                    className="text-sm"
                  />
                  {form.errors.employee_id && (
                    <span className="text-xs text-red-600 mt-1 block">{form.errors.employee_id}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Role
                  </label>
                  <Input
                    type="text"
                    id="role"
                    name="role"
                    value={form.values.role}
                    onChange={form.handleChange}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={form.values.full_name}
                  onChange={form.handleChange}
                  className="text-sm"
                />
                {form.errors.full_name && (
                  <span className="text-xs text-red-600 mt-1 block">{form.errors.full_name}</span>
                )}
              </div>

              {/* Email and Department */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    disabled={editingEmployee ? true : false}
                    className="text-sm"
                  />
                  {form.errors.email && (
                    <span className="text-xs text-red-600 mt-1 block">{form.errors.email}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="department" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Department *
                  </label>
                  <Input
                    type="text"
                    id="department"
                    name="department"
                    value={form.values.department}
                    onChange={form.handleChange}
                    className="text-sm"
                  />
                  {form.errors.department && (
                    <span className="text-xs text-red-600 mt-1 block">{form.errors.department}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <DialogFooter className="gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.isSubmitting}
                  className="flex-1 bg-[#E85D31] hover:bg-[#d54920]"
                >
                  {editingEmployee ? 'Update' : 'Add Employee'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default EmployeeListPage;
