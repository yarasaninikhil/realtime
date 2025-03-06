
import { Routes, Route } from 'react-router-dom';


import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Home from './Pages/Home/Home';
import { FaOptinMonster } from 'react-icons/fa';
import Login from './Pages/Login/Login'

import Register from './Pages/Home/Register';
import Contact from './Pages/Contact/Contact'
import Admin from './Pages/Admin/Admin/Admin'
import AdminNav from './Pages/Admin/AdminNavbar/AdminNav';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import About from './Pages/About/About'
import DistrictPage from './Pages/DistrictPage/DistrictPage';
import BookingPage from './Pages/Booking/Booking Page';
import SeePage from './Pages/Seetrip/See';
const App = () => {
  return (
    <>
      <Routes>
   <Route path="/" element={<Login/>} />
   <Route path="/Register" element={<Register/>} />

      <Route path="/admin" element={<Admin/>} />

    <Route path="/AdminHome" element={<AdminHome/>} />

    <Route path="/AdminNav" element={<AdminNav/>} />
   <Route path="/forgot-password" element={<ForgotPassword  />} />

   <Route path="/see/:tourId/:placeIndex" element={<SeePage/>} />
   <Route path="/Home" element={<Home/>} />
   <Route path="/district/:district" element={<DistrictPage/>} />
   <Route path="/booking/:tourId" element={<BookingPage/>} />
<Route path ="/about"element={<About/>}/>


<Route path ="Contact"element={<Contact/>}/>


 </Routes>
    </>
  
  );
};

export default App;