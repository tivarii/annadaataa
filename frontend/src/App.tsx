
// import { useContext } from 'react'
import './App.css'
import { Navigate, Route , Routes}  from 'react-router'
import { useAuthContext } from './context/AuthContext'
import { LandingPage } from './pages/LandingPage';
import { SignUp } from './components/Signup/Signup';
import { Login } from './components/Login/Login';
import Home from "./pages/Home";
import AddFood from './components/Food/Add-Food';
import RequestFood from './components/Food/Request-Food';
import MyFoods from './components/Food/MyFood';
import MyRequests from './components/Food/MyRequests';
import IncomingRequests from './components/Food/IncomingRequest';
import { Toaster } from 'react-hot-toast';
import DonatePage from './components/DonatePage';

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
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/home"} /> : <Login />}
        />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/add"
          element={authUser ? <AddFood /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/request"
          element={authUser ? <RequestFood /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/home/myfood"
          element={authUser ? <MyFoods /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/home/myrequest"
          element={authUser ? <MyRequests /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/home/incoming"
          element={authUser ? <IncomingRequests /> : <Navigate to={"/login"} /> }
        />
        <Route
          path="/home/donate"
          element={authUser ? <DonatePage /> : <Navigate to={"/login"} /> }
        />
      </Routes>
      <Toaster/>
      
    </div>
  )
}

export default App
