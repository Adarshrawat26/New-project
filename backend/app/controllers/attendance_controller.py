"""
Attendance Controller - Business logic for attendance management
Handles attendance marking and tracking
"""
from datetime import datetime
from app.models import User, Attendance
from app.utils import error_response, success_response


class AttendanceController:
    """Controller for attendance-related operations"""
    
    @staticmethod
    def mark_attendance(employee_id, attendance_data):
        """
        Mark attendance for an employee - Only for today's date
        
        Args:
            employee_id (str): Employee ID
            attendance_data (dict): Attendance information
            
        Returns:
            dict: Response with created attendance record
        """
        try:
            # Verify employee exists
            employee = User.objects(employee_id=employee_id).first()
            if not employee:
                return error_response(f"Employee {employee_id} not found", status_code=404)
            
            # Get today's date
            from datetime import datetime, date
            today = date.today()
            
            # Parse the provided attendance_date
            provided_date_str = attendance_data.get('attendance_date', today.isoformat())
            attendance_date = datetime.strptime(provided_date_str, '%Y-%m-%d').date()
            
            # Validate that attendance can only be marked for today
            if attendance_date != today:
                return error_response(
                    f"Attendance can only be marked for today ({today.isoformat()}). "
                    f"You provided {attendance_date.isoformat()}",
                    status_code=400
                )
            
            # Check if attendance already marked for today
            existing = Attendance.objects(
                employee_id=employee,
                attendance_date=today
            ).first()
            
            if existing:
                return error_response(
                    f"Attendance already marked for {employee_id} today",
                    status_code=409
                )
            
            # Parse check-in and check-out times
            check_in_time = None
            check_out_time = None
            
            if attendance_data.get('check_in_time'):
                try:
                    time_obj = datetime.strptime(attendance_data.get('check_in_time'), '%H:%M').time()
                    check_in_time = datetime.combine(today, time_obj)
                except ValueError:
                    pass
            
            if attendance_data.get('check_out_time'):
                try:
                    time_obj = datetime.strptime(attendance_data.get('check_out_time'), '%H:%M').time()
                    check_out_time = datetime.combine(today, time_obj)
                except ValueError:
                    pass
            
            # Create attendance record
            attendance = Attendance(
                employee_id=employee,
                attendance_date=today,
                is_present=attendance_data.get('is_present', True),
                check_in_time=check_in_time,
                check_out_time=check_out_time,
                notes=attendance_data.get('notes')
            )
            attendance.save()
            
            return success_response(
                "Attendance marked successfully for today",
                data=attendance.to_dict(),
                status_code=201
            )
        except ValueError as ve:
            return error_response(f"Invalid date format. Use YYYY-MM-DD: {str(ve)}", status_code=400)
        except Exception as e:
            return error_response(f"Error marking attendance: {str(e)}", status_code=500)
    
    @staticmethod
    def get_employee_attendance(employee_id):
        """
        Get all attendance records for an employee
        
        Args:
            employee_id (str): Employee ID
            
        Returns:
            dict: Response with attendance records
        """
        try:
            employee = User.objects(employee_id=employee_id).first()
            if not employee:
                return error_response(f"Employee {employee_id} not found", status_code=404)
            
            attendance_records = Attendance.objects(
                employee_id=employee
            ).order_by('-attendance_date')
            
            records = [record.to_dict() for record in attendance_records]
            
            return success_response(
                f"Retrieved {len(records)} attendance records",
                data=records,
                status_code=200
            )
        except Exception as e:
            return error_response(f"Error fetching attendance: {str(e)}", status_code=500)
    
    @staticmethod
    def get_all_attendance():
        """
        Get all attendance records from system
        
        Returns:
            dict: Response with all attendance records
        """
        try:
            attendance_records = Attendance.objects().order_by('-attendance_date')
            records = [record.to_dict() for record in attendance_records]
            
            return success_response(
                f"Retrieved {len(records)} attendance records",
                data=records,
                status_code=200
            )
        except Exception as e:
            return error_response(f"Error fetching attendance: {str(e)}", status_code=500)
    
    @staticmethod
    def get_attendance_by_date(target_date_str):
        """
        Get attendance records for a specific date
        
        Args:
            target_date_str (str): Date in YYYY-MM-DD format
            
        Returns:
            dict: Response with attendance records for that date
        """
        try:
            from datetime import datetime
            target_date = datetime.strptime(target_date_str, '%Y-%m-%d').date()
            
            attendance_records = Attendance.objects(
                attendance_date=target_date
            ).order_by('employee_id')
            
            records = [record.to_dict() for record in attendance_records]
            
            return success_response(
                f"Retrieved {len(records)} attendance records for {target_date_str}",
                data=records,
                status_code=200
            )
        except ValueError:
            return error_response("Invalid date format. Use YYYY-MM-DD", status_code=400)
        except Exception as e:
            return error_response(f"Error fetching attendance: {str(e)}", status_code=500)
