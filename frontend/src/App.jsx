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
import Applicants from './components/admin/Applicants.jsx'

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
		element: <Profile />
	},
	// ADMIN ROUTES 
	{
		path: '/admin/companies',
		element: <Companies />
	},
	{
		path: '/admin/companies/:id',
		element: <CompanySetup />
	},
	{
		path: '/admin/jobs',
		element: <AdminJobs />
	},
	{
		path: '/admin/jobs/create',
		element: <AddJob />
	},
	{
		path: '/admin/jobs/:id/applicants',
		element: <Applicants />
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
