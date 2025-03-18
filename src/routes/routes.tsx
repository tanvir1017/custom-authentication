import App from "@/App";
import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import Register from "@/pages/register/register";
import { Route, Routes } from "react-router";

const Routing = () => {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="home" element={<Home />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
