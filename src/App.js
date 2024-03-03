import "./App.css";
// eslint-disable-next-line no-unused-vars
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTeamplate/CheckoutTeamplate";
import Checkout from "./pages/Checkout/Checkout";
import UserTemplate from ".//templates/UserTemplate/UserTeamplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/Showtime/Showtime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import EditUser from "./pages/Admin/EditUser/EditUser";
import AddNewUser from "./pages/Admin/AddNewUser/AddNewUser";

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="/" element={<HomeTemplate Component={Home} />} />
        <Route path="/contact" element={<HomeTemplate Component={Contact} />} />
        <Route path="/news" element={<HomeTemplate Component={News} />} />
        <Route
          path="/detail/:id"
          element={<HomeTemplate Component={Detail} />}
        />
        <Route path="/profile" element={<HomeTemplate Component={Profile} />} />
        <Route
          path="/checkout/:id"
          element={<CheckoutTemplate Component={Checkout} />}
        />
        <Route path="/login" element={<UserTemplate Component={Login} />} />
        <Route
          path="/register"
          element={<UserTemplate Component={Register} />}
        />
        <Route
          path="/admin"
          element={<AdminTemplate Component={Dashboard} />}
        />
        <Route
          path="/admin/films"
          element={<AdminTemplate Component={Films} />}
        />
        <Route
          path="/admin/films/addnew"
          element={<AdminTemplate Component={AddNew} />}
        />
        <Route
          path="/admin/films/edit/:id"
          element={<AdminTemplate Component={Edit} />}
        />
        <Route
          path="/admin/films/showtime/:id/:tenphim"
          element={<AdminTemplate Component={ShowTime} />}
        />
        <Route
          path="/admin/users"
          element={<AdminTemplate Component={Dashboard} />}
        />
        <Route
          path="/admin/users/edit/:id"
          element={<AdminTemplate Component={EditUser} />}
        />
        <Route
          path="/admin/users/addnew"
          element={<AdminTemplate Component={AddNewUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
