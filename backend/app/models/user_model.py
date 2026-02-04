"""
User Model - Employee document schema
Represents employee information in the HRMS system
"""
from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime


class User(Document):
    """
    Employee/User document schema
    
    Fields:
    - employee_id: Unique employee identifier (required, unique)
    - full_name: Employee's full name (required)
    - email: Employee's email address (required, unique)
    - department: Department assignment (required)
    - role: Job role/position (optional, defaults to "Employee")
    - status: Employment status (optional, defaults to "Active")
    - created_at: Timestamp when employee was added
    - updated_at: Timestamp when employee was last updated
    """
    
    employee_id = StringField(required=True, unique=True, min_length=3, max_length=20)
    full_name = StringField(required=True, min_length=2, max_length=100)
    email = EmailField(required=True, unique=True)
    department = StringField(required=True, min_length=2, max_length=50)
    role = StringField(default="Employee", max_length=50)
    status = StringField(default="Active", choices=["Active", "Inactive", "On Leave"])
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'users',
        'indexes': [
            'employee_id',
            'email',
            'created_at'
        ]
    }
    
    def to_dict(self):
        """Convert document to dictionary for JSON serialization"""
        return {
            'id': str(self.id),
            'employee_id': self.employee_id,
            'full_name': self.full_name,
            'email': self.email,
            'department': self.department,
            'role': self.role,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def __repr__(self):
        return f'<User {self.employee_id}: {self.full_name}>'
