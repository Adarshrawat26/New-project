"""
Employee Routes - API endpoints for employee management
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from app.controllers import EmployeeController

router = APIRouter(prefix="/api/employees", tags=["employees"])


# Pydantic Models for request validation
class AddEmployeeRequest(BaseModel):
    """Request model for adding employee"""
    employee_id: str = Field(..., min_length=3, max_length=20, description="Unique employee ID")
    full_name: str = Field(..., min_length=2, max_length=100, description="Employee's full name")
    email: EmailStr = Field(..., description="Employee's email address")
    department: str = Field(..., min_length=2, max_length=50, description="Department name")
    role: Optional[str] = Field(default="Employee", max_length=50, description="Job role")


class UpdateEmployeeRequest(BaseModel):
    """Request model for updating employee"""
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    department: Optional[str] = Field(None, min_length=2, max_length=50)
    role: Optional[str] = Field(None, max_length=50)
    status: Optional[str] = Field(None, description="Active, Inactive, or On Leave")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_employee(employee: AddEmployeeRequest):
    """Add a new employee"""
    result = EmployeeController.add_employee(employee.dict())
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 400),
            detail=result['message']
        )
    
    return result


@router.get("/")
async def get_all_employees():
    """Get all employees"""
    result = EmployeeController.get_all_employees()
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 400),
            detail=result['message']
        )
    
    return result


@router.get("/{employee_id}")
async def get_employee(employee_id: str):
    """Get specific employee by ID"""
    result = EmployeeController.get_employee_by_id(employee_id)
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 404),
            detail=result['message']
        )
    
    return result


@router.put("/{employee_id}")
async def update_employee(employee_id: str, update_data: UpdateEmployeeRequest):
    """Update employee information"""
    result = EmployeeController.update_employee(
        employee_id,
        update_data.dict(exclude_unset=True)
    )
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 400),
            detail=result['message']
        )
    
    return result


@router.delete("/{employee_id}", status_code=status.HTTP_200_OK)
async def delete_employee(employee_id: str):
    """Delete an employee"""
    result = EmployeeController.delete_employee(employee_id)
    
    if not result['success']:
        raise HTTPException(
            status_code=result.get('status_code', 404),
            detail=result['message']
        )
    
    return result
