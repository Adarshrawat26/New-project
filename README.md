# HRMS Lite - Human Resource Management System

A modern, full-stack Human Resource Management System built with React and FastAPI, featuring real-time employee management, attendance tracking, and comprehensive dashboard analytics.

## Features

- **Employee Management**: Add, edit, delete, and search employees with department and status filtering
- **Attendance Tracking**: Mark daily attendance, view attendance history, and generate reports
- **Real-time Dashboard**: Dynamic metrics with attendance charts, department overview, and recent activity
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS and shadcn/ui components
- **Data Persistence**: MongoDB Atlas integration for reliable cloud-based data storage
- **REST API**: Comprehensive FastAPI backend with proper error handling and validation

## Tech Stack

### Frontend

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Recharts** - Data visualization library
- **Create React App** - Development environment

### Backend

- **Python 3.11** - Programming language
- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **MongoEngine** - Python ODM for MongoDB
- **Pydantic** - Data validation

### Database

- **MongoDB Atlas** - Cloud database service
- **Local MongoDB** - Development option

## Project Structure

```
New project/
├── frontend/                      # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                # Main app component
│   │   ├── index.js              # Entry point
│   │   ├── components/           # Reusable components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── EmployeeTable.js
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Modal.js
│   │   │   └── Charts/          # Chart components
│   │   ├── pages/               # Page components
│   │   │   ├── EmployeeListPage.js
│   │   │   ├── AttendanceTrackerPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── index.js
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useFetch.js      # API data fetching
│   │   │   ├── useForm.js       # Form handling
│   │   │   └── index.js
│   │   ├── services/            # API services
│   │   │   ├── employeeService.js
│   │   │   ├── attendanceService.js
│   │   │   └── index.js
│   │   └── styles/              # Global styles
│   ├── package.json
│   └── .env.example
│
├── backend/                      # FastAPI application
│   ├── app/
│   │   ├── main.py             # FastAPI app entry point
│   │   ├── controllers/        # Business logic
│   │   │   ├── employee_controller.py
│   │   │   ├── attendance_controller.py
│   │   │   └── __init__.py
│   │   ├── models/             # Database models
│   │   │   ├── user_model.py
│   │   │   ├── attendance_model.py
│   │   │   └── __init__.py
│   │   ├── routes/             # API routes
│   │   │   ├── employee_routes.py
│   │   │   ├── attendance_routes.py
│   │   │   └── __init__.py
│   │   ├── utils/              # Utility functions
│   │   │   ├── database.py     # MongoDB connection
│   │   │   ├── error_handler.py
│   │   │   ├── validators.py
│   │   │   └── __init__.py
│   │   └── middleware/         # Middleware
│   │       └── __init__.py
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables
│   ├── .env.example           # Environment template
│   └── __init__.py
│
└── README.md                   # This file
```

## Installation

### Prerequisites

- **Node.js** 14+ (for frontend)
- **Python** 3.11+ (for backend)
- **MongoDB** (local or Atlas account)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string:
     - **Local**: `mongodb://localhost:27017/hrms`
     - **Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/hrms`

5. Start the backend server:

```bash
uvicorn app.main:app --reload
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## Running the Application

### Run Both Services

**Terminal 1 - Backend:**

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)

## API Endpoints

### Employee Management

| Method   | Endpoint              | Description                |
| -------- | --------------------- | -------------------------- |
| `GET`    | `/api/employees/`     | Get all employees          |
| `POST`   | `/api/employees/`     | Create new employee        |
| `GET`    | `/api/employees/{id}` | Get employee by ID         |
| `PUT`    | `/api/employees/{id}` | Update employee            |
| `DELETE` | `/api/employees/{id}` | Delete employee (cascades) |

### Attendance Tracking

| Method | Endpoint                        | Description                     |
| ------ | ------------------------------- | ------------------------------- |
| `GET`  | `/api/attendance/`              | Get all attendance records      |
| `POST` | `/api/attendance/`              | Mark attendance                 |
| `GET`  | `/api/attendance/employee/{id}` | Get employee attendance history |
| `GET`  | `/api/attendance/date/{date}`   | Get attendance by date          |

### Health Check

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| `GET`  | `/health` | API health status |

## Key Features Explained

### Employee Management Page

- **Search**: Real-time filtering by employee name
- **Filters**: Department and status filtering
- **CRUD Operations**: Add, edit, and delete employees instantly
- **Responsive Grid**: Employee cards adapt to screen size
- **Color-coded Avatars**: Dynamic avatar colors based on name

### Attendance Tracker Page

- **Employee Selection**: Dropdown to select employees
- **Mark Attendance**: Record daily check-in/out times
- **Attendance History**: View past attendance records
- **Notes**: Add optional notes for each attendance record

### Dashboard Page

- **Key Metrics**: Employee count, present today percentage
- **Department Overview**: Breakdown by department
- **Attendance Chart**: Monthly attendance trends
- **Recent Activity**: Latest attendance records
- **Real-time Data**: All metrics update from MongoDB

## Security Features

- **Input Validation**: All employee and attendance data validated
- **Error Handling**: Comprehensive error messages and logging
- **CORS Enabled**: Cross-origin requests configured
- **Cascade Delete**: Deleting employees removes their attendance records
- **Environment Variables**: Sensitive data stored in `.env` files

## Database Models

### User (Employee) Model

```python
- employee_id: Unique identifier
- full_name: Employee name
- email: Email address (unique)
- department: Department name
- role: Job role
- status: Active/On Leave/Inactive
- created_at: Creation timestamp
- updated_at: Last update timestamp
```

### Attendance Model

```python
- employee_id: Reference to User
- attendance_date: Date of attendance
- is_present: Presence status
- check_in_time: Check-in time
- check_out_time: Check-out time
- notes: Optional notes
- created_at: Creation timestamp
```

## Customization

### Color Theme

The primary color is orange (`#E85D31`). To change it:

1. Update Tailwind classes in component files
2. Change the hex value in CSS classes
3. Rebuild: `npm run build`

### Adding New Features

1. **Frontend**: Create components in `src/components/`
2. **Backend**: Add controllers in `app/controllers/`
3. **Database**: Define models in `app/models/`
4. **Routes**: Add endpoints in `app/routes/`

## Testing the API

Using cURL:

```bash
# Get all employees
curl http://localhost:8000/api/employees/

# Create employee
curl -X POST http://localhost:8000/api/employees/ \
  -H "Content-Type: application/json" \
  -d '{"employee_id":"emp001","full_name":"John Doe","email":"john@example.com","department":"IT","role":"Developer"}'

# Mark attendance
curl -X POST http://localhost:8000/api/attendance/ \
  -H "Content-Type: application/json" \
  -d '{"employee_id":"emp001","attendance_date":"2024-02-04","is_present":true,"check_in_time":"09:00","check_out_time":"17:00"}'
```

## Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms
API_HOST=0.0.0.0
API_PORT=8000
ENVIRONMENT=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:8000
```

## Troubleshooting

### Backend won't start

- Check if port 8000 is already in use: `lsof -i :8000`
- Verify Python 3.11 is installed: `python3 --version`
- Ensure virtual environment is activated
- Check MongoDB connection string in `.env`

### Frontend won't start

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 3000 is in use: `lsof -i :3000`
- Ensure Node.js 14+ is installed: `node --version`

### MongoDB connection issues

- Verify MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas settings
- Ensure database name is correct in connection string
- Test connection: `mongosh "mongodb+srv://username:password@cluster.mongodb.net/hrms"`

### Data not showing

- Refresh the browser (Ctrl+R or Cmd+R)
- Check browser console for API errors
- Verify backend is running on port 8000
- Check MongoDB Atlas for actual data

## Build for Production

### Frontend

```bash
cd frontend
npm run build
```

Output in `frontend/build/` directory

### Backend

```bash
cd backend
# No build needed, just deploy with requirements.txt
```

## License

This project is open source and available under the MIT License.

## Author

Created as a modern HRMS solution with real-time data synchronization and responsive design.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please check:

1. Backend logs in terminal
2. Browser console (F12)
3. MongoDB Atlas logs
4. API documentation at `/docs`

---

**Last Updated**: February 4, 2026  
**Version**: 1.0.0
