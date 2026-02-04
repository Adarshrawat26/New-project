/**
 * Employee Table Component (shadcn/ui)
 * Displays list of employees in table format using shadcn Table
 */
import React from 'react';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui';

/**
 * Employee Table Component
 * @param {Object} props - Component props
 * @param {Array} props.employees - List of employees
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.onEdit - Edit handler
 * @param {boolean} props.loading - Loading state
 * @returns {React.ReactElement}
 */
const EmployeeTable = ({ employees = [], onDelete, onEdit, loading = false }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#E85D31] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-white border border-gray-200 rounded-lg p-12 max-w-md text-center">
          <p className="text-sm text-gray-600">No employees found. Add one to get started!</p>
        </div>
      </div>
    );
  }

  const statusVariants = {
    'active': 'success',
    'inactive': 'destructive',
    'on leave': 'warning',
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id || employee.employee_id}>
              <TableCell>{employee.employee_id}</TableCell>
              <TableCell className="font-medium">{employee.full_name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <Badge variant={statusVariants[employee.status.toLowerCase()] || 'default'}>
                  {employee.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${employee.full_name}?`)) {
                          onDelete(employee.employee_id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;

