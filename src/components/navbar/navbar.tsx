import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6 justify-end">
        <li>
          <Link
            to="/home"
            className="text-white hover:text-gray-300 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-white hover:text-gray-300 font-medium"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
