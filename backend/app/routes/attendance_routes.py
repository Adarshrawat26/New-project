"""
Attendance Routes - API endpoints for attendance management
"""
from fastapi import APIRouter, HTTPException, status, Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, time
from app.controllers import AttendanceController

router = APIRouter(prefix="/api/attendance", tags=["attendance"])


# Pydantic Models for request validation
class MarkAttendanceRequest(BaseModel):
    """Request model for marking attendance"""
    attendance_date: str = Field(..., description="Date in YYYY-MM-DD format")
    is_present: bool = Field(default=True, description="Whether employee was present")
    check_in_time: Optional[str] = Field(None, description="Check-in time in HH:MM format")
    check_out_time: Optional[str] = Field(None, description="Check-out time in HH:MM format")
    notes: Optional[str] = Field(None, max_length=500, description="Additional notes")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def mark_attendance(
    employee_id: str = Query(..., description="Employee ID"),
    attendance: MarkAttendanceRequest = None
):
    """Mark attendance for an employee"""
    if attendance is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Attendance data is required"
        )
    
    result = AttendanceController.mark_attendance(
        employee_id,
        attendance.dict()
    )
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 400),
            detail=result['message']
        )
    
    return result


@router.get("/")
async def get_all_attendance():
    """Get all attendance records"""
    result = AttendanceController.get_all_attendance()
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 400),
            detail=result['message']
        )
    
    return result


@router.get("/employee/{employee_id}")
async def get_employee_attendance(employee_id: str):
    """Get attendance records for specific employee"""
    result = AttendanceController.get_employee_attendance(employee_id)
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 404),
            detail=result['message']
        )
    
    return result


@router.get("/date/{attendance_date}")
async def get_attendance_by_date(attendance_date: str):
    """Get attendance records for specific date (YYYY-MM-DD)"""
    result = AttendanceController.get_attendance_by_date(attendance_date)
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 400),
            detail=result['message']
        )
    
    return result


@router.delete("/cleanup")
async def cleanup_orphaned_records():
    """Remove all attendance records for deleted employees (development cleanup)"""
    from app.models import Attendance, User
    from app.utils import success_response, error_response
    
    try:
        deleted_count = 0
        attendance_records = list(Attendance.objects())
        
        # Find and delete orphaned records (those with broken employee references)
        for record in attendance_records:
            try:
                # Try to access the employee reference
                _ = record.employee_id.employee_id
            except:
                # This record has a broken reference, delete it
                record.delete()
                deleted_count += 1
        
        return success_response(
            f"Cleaned up {deleted_count} orphaned attendance records",
            data={"deleted_records": deleted_count},
            status_code=200
        )
    except Exception as e:
        return error_response(f"Error cleaning up records: {str(e)}", status_code=500)
