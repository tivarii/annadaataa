
import { useContext } from 'react'
import './App.css'
import { Navigate, Route , Routes}  from 'react-router'
import { useAuthContext } from './context/AuthContext'
import { LandingPage } from './pages/LandingPage';
import { SignUp } from './components/Signup/Signup';
function App() {
  const {authUser}=useAuthContext() || {};
  //checking user is loged in or not
  console.log(authUser);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/home"} /> : <SignUp />}
        />
      </Routes>
    </div>
  )
}

export default App
