import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import JobDescription from './components/JobDescription.jsx'
import Companies from './components/admin/Companies.jsx'
import CompanySetup from './components/admin/CompanySetup.jsx'
import AdminJobs from './components/admin/AdminJobs.jsx'
import AddJob from './components/admin/AddJob.jsx'
import Applicants from './components/admin/Applicants.jsx';
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/jobs',
		element: <Jobs />
	},
	{
		path: '/description/:id',
		element: <JobDescription />
	},
	{
		path: '/browse',
		element: <Browse />
	},
	{
		path: '/profile',
		element: <ProtectedRoute>
					<Profile />
				</ProtectedRoute>
	},
	// ADMIN ROUTES 
	{
		path: '/admin/companies',
		element: <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
					<Companies />
				</ProtectedRoute>
	},
	{
		path: '/admin/companies/:id',
		element: <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
					<CompanySetup />
				</ProtectedRoute>
	},
	{
		path: '/admin/jobs',
		element: <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
					<AdminJobs />
				</ProtectedRoute>
	},
	{
		path: '/admin/jobs/create',
		element: <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
					<AddJob />
				</ProtectedRoute>
	},
	{
		path: '/admin/jobs/:id/applicants',
		element: <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
					<Applicants />
				</ProtectedRoute>
	}
]);

function App() {
	return (
		<div>
			<RouterProvider router={appRouter}/>
		</div>
	)
}

export default App;
