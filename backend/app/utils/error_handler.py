"""
Error Handler - Standardized response formatting
Creates consistent response format for success and error cases
"""
from fastapi import status


def success_response(message, data=None, status_code=status.HTTP_200_OK):
    """
    Create a standardized success response
    
    Args:
        message (str): Success message
        data (any): Response data (optional)
        status_code (int): HTTP status code
        
    Returns:
        dict: Standardized success response
    """
    return {
        'success': True,
        'message': message,
        'status_code': status_code,
        'data': data
    }


def error_response(message, status_code=status.HTTP_400_BAD_REQUEST, data=None):
    """
    Create a standardized error response
    
    Args:
        message (str): Error message
        status_code (int): HTTP status code
        data (any): Additional error data (optional)
        
    Returns:
        dict: Standardized error response
    """
    return {
        'success': False,
        'message': message,
        'status_code': status_code,
        'data': data
    }
