"""
Input Validators
Validates user input for employee and attendance data
"""
import re
from email_validator import validate_email, EmailNotValidError


def validate_email_format(email):
    """
    Validate email format using RFC 5322 standard
    
    Args:
        email (str): Email address to validate
        
    Returns:
        tuple: (is_valid: bool, message: str)
    """
    try:
        validate_email(email)
        return True, None
    except EmailNotValidError as e:
        return False, str(e)


def validate_employee_id(employee_id):
    """
    Validate employee ID format
    Must be 3-20 alphanumeric characters
    
    Args:
        employee_id (str): Employee ID to validate
        
    Returns:
        tuple: (is_valid: bool, message: str)
    """
    if not employee_id or not isinstance(employee_id, str):
        return False, "Employee ID must be a string"
    
    if not (3 <= len(employee_id) <= 20):
        return False, "Employee ID must be 3-20 characters"
    
    if not re.match(r'^[a-zA-Z0-9]+$', employee_id):
        return False, "Employee ID must contain only alphanumeric characters"
    
    return True, None


def validate_full_name(full_name):
    """
    Validate full name format
    Must be 2-100 characters, letters, spaces, and hyphens
    
    Args:
        full_name (str): Full name to validate
        
    Returns:
        tuple: (is_valid: bool, message: str)
    """
    if not full_name or not isinstance(full_name, str):
        return False, "Full name must be a string"
    
    if not (2 <= len(full_name) <= 100):
        return False, "Full name must be 2-100 characters"
    
    if not re.match(r"^[a-zA-Z\s\-']+$", full_name):
        return False, "Full name can only contain letters, spaces, hyphens, and apostrophes"
    
    return True, None


def validate_department(department):
    """
    Validate department name
    Must be 2-50 characters
    
    Args:
        department (str): Department name to validate
        
    Returns:
        tuple: (is_valid: bool, message: str)
    """
    if not department or not isinstance(department, str):
        return False, "Department must be a string"
    
    if not (2 <= len(department) <= 50):
        return False, "Department must be 2-50 characters"
    
    return True, None


def validate_add_employee_data(employee_data):
    """
    Comprehensive validation for employee creation data
    
    Args:
        employee_data (dict): Dictionary with employee data
        
    Returns:
        tuple: (is_valid: bool, error_message: str or None)
    """
    # Check required fields
    required_fields = ['employee_id', 'full_name', 'email', 'department']
    for field in required_fields:
        if field not in employee_data or not employee_data[field]:
            return False, f"Missing required field: {field}"
    
    # Validate each field
    is_valid, msg = validate_employee_id(employee_data['employee_id'])
    if not is_valid:
        return False, f"Invalid employee_id: {msg}"
    
    is_valid, msg = validate_full_name(employee_data['full_name'])
    if not is_valid:
        return False, f"Invalid full_name: {msg}"
    
    is_valid, msg = validate_email_format(employee_data['email'])
    if not is_valid:
        return False, f"Invalid email: {msg}"
    
    is_valid, msg = validate_department(employee_data['department'])
    if not is_valid:
        return False, f"Invalid department: {msg}"
    
    return True, None
