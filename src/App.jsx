import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import Habits from './pages/Habits.jsx'
import Calendar from './pages/Calendar.jsx'
import Stats from './pages/Stats.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { Route,Routes,Navigate } from 'react-router-dom'

function App() {

  return (
    <>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
