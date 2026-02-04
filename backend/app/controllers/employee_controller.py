"""
Employee Controller - Business logic for employee management
Handles employee CRUD operations
"""
from mongoengine import NotUniqueError, DoesNotExist
from datetime import datetime
from app.models import User
from app.utils import validate_add_employee_data, error_response, success_response


class EmployeeController:
    """Controller for employee-related operations"""
    
    @staticmethod
    def add_employee(employee_data):
        """
        Add a new employee
        
        Args:
            employee_data (dict): Employee information
            
        Returns:
            dict: Response with success status and data/error
        """
        try:
            # Validate input data
            is_valid, error_msg = validate_add_employee_data(employee_data)
            if not is_valid:
                return error_response(error_msg, status_code=400)
            
            # Check if employee already exists
            existing = User.objects(employee_id=employee_data['employee_id']).first()
            if existing:
                return error_response(f"Employee with ID {employee_data['employee_id']} already exists", status_code=409)
            
            # Create new employee
            employee = User(
                employee_id=employee_data['employee_id'],
                full_name=employee_data['full_name'],
                email=employee_data['email'],
                department=employee_data['department'],
                role=employee_data.get('role', 'Employee'),
                status='Active'
            )
            employee.save()
            
            return success_response(
                "Employee added successfully",
                data=employee.to_dict(),
                status_code=201
            )
        except NotUniqueError:
            return error_response("Email already exists", status_code=409)
        except Exception as e:
            return error_response(f"Error adding employee: {str(e)}", status_code=500)
    
    @staticmethod
    def get_all_employees():
        """
        Get all employees
        
        Returns:
            dict: Response with list of all employees
        """
        try:
            employees = User.objects().order_by('-created_at')
            employee_list = [emp.to_dict() for emp in employees]
            
            return success_response(
                f"Retrieved {len(employee_list)} employees",
                data=employee_list,
                status_code=200
            )
        except Exception as e:
            return error_response(f"Error fetching employees: {str(e)}", status_code=500)
    
    @staticmethod
    def get_employee_by_id(employee_id):
        """
        Get specific employee by ID
        
        Args:
            employee_id (str): Employee ID
            
        Returns:
            dict: Response with employee data or error
        """
        try:
            employee = User.objects(employee_id=employee_id).first()
            if not employee:
                return error_response(f"Employee {employee_id} not found", status_code=404)
            
            return success_response(
                "Employee retrieved successfully",
                data=employee.to_dict(),
                status_code=200
            )
        except Exception as e:
            return error_response(f"Error fetching employee: {str(e)}", status_code=500)
    
    @staticmethod
    def update_employee(employee_id, update_data):
        """
        Update employee information
        Cannot update employee_id or email
        
        Args:
            employee_id (str): Employee ID to update
            update_data (dict): Fields to update
            
        Returns:
            dict: Response with updated employee data
        """
        try:
            employee = User.objects(employee_id=employee_id).first()
            if not employee:
                return error_response(f"Employee {employee_id} not found", status_code=404)
            
            # Prevent updating employee_id and email
            forbidden_fields = ['employee_id', 'email']
            for field in forbidden_fields:
                if field in update_data:
                    del update_data[field]
            
            # Update allowed fields
            allowed_fields = ['full_name', 'department', 'role', 'status']
            for field in allowed_fields:
                if field in update_data and update_data[field]:
                    setattr(employee, field, update_data[field])
            
            employee.updated_at = datetime.utcnow()
            employee.save()
            
            return success_response(
                "Employee updated successfully",
                data=employee.to_dict(),
                status_code=200
            )
        except Exception as e:
            return error_response(f"Error updating employee: {str(e)}", status_code=500)
    
    @staticmethod
    def delete_employee(employee_id):
        """
        Delete an employee
        
        Args:
            employee_id (str): Employee ID to delete
            
        Returns:
            dict: Response with deletion status
        """
        try:
            from app.models import Attendance
            
            employee = User.objects(employee_id=employee_id).first()
            if not employee:
                return error_response(f"Employee {employee_id} not found", status_code=404)
            
            # Delete all attendance records for this employee (cascade delete)
            Attendance.objects(employee_id=employee).delete()
            
            # Now delete the employee
            employee.delete()
            
            return success_response(
                f"Employee {employee_id} deleted successfully",
                status_code=200
            )
        except Exception as e:
            return error_response(f"Error deleting employee: {str(e)}", status_code=500)
