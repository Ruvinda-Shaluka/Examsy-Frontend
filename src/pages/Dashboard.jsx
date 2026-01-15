import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Examsy</h1>
      <p className="text-lg mb-8">Your one-stop solution for online examinations.</p>
      <div className="flex space-x-4">
        <Link to="/register-student" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Register as Student
        </Link>
        <Link to="/register-teacher" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Register as Teacher
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
