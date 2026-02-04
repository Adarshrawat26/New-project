"""
Attendance Model - Employee attendance record schema
Tracks daily attendance and time tracking for employees
"""
from mongoengine import Document, StringField, DateField, BooleanField, ReferenceField, DateTimeField
from datetime import datetime
from .user_model import User


class Attendance(Document):
    """
    Attendance record document schema
    
    Fields:
    - employee_id: Reference to employee (required)
    - attendance_date: Date of attendance record (required)
    - is_present: Whether employee was present (required)
    - check_in_time: Time employee checked in (optional)
    - check_out_time: Time employee checked out (optional)
    - notes: Additional notes (optional)
    - created_at: Timestamp when record was created
    - updated_at: Timestamp when record was last updated
    """
    
    employee_id = ReferenceField(User, required=True)
    attendance_date = DateField(required=True)
    is_present = BooleanField(required=True)
    check_in_time = DateTimeField(required=False)
    check_out_time = DateTimeField(required=False)
    notes = StringField(max_length=500, required=False)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'attendance',
        'indexes': [
            'employee_id',
            'attendance_date',
            ('employee_id', 'attendance_date'),  # Compound index for unique daily records
            'created_at'
        ]
    }
    
    def to_dict(self):
        """Convert document to dictionary for JSON serialization"""
        try:
            employee_id = self.employee_id.employee_id
            employee_name = self.employee_id.full_name
        except:
            # Handle case where employee reference is broken (deleted)
            employee_id = "Unknown"
            employee_name = "Deleted Employee"
        
        return {
            'id': str(self.id),
            'employee_id': employee_id,
            'employee_name': employee_name,
            'attendance_date': self.attendance_date.isoformat(),
            'is_present': self.is_present,
            'check_in_time': self.check_in_time.isoformat() if self.check_in_time else None,
            'check_out_time': self.check_out_time.isoformat() if self.check_out_time else None,
            'notes': self.notes,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def __repr__(self):
        status = "Present" if self.is_present else "Absent"
        return f'<Attendance {self.employee_id.employee_id}: {self.attendance_date} - {status}>'
