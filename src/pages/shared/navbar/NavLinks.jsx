import { NavLink } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const NavLinks = ({ onClick }) => {
  // Compose the onClick handler to scroll to top and call any parent handler
  const handleClick = (e) => {
    scrollToTop();
    if (onClick) onClick(e);
  };
  return (
    <ul className="list-none flex flex-col sm:flex-row items-start sm:items-center gap-1 m-0 p-0 overflow-x-auto sm:overflow-x-visible whitespace-nowrap scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent w-full">
      <li className="w-full sm:w-auto">
        <NavLink
          onClick={handleClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-3 sm:px-5 py-2 font-normal tracking-wide text-sm sm:text-base flex items-center justify-start sm:justify-center w-full sm:w-auto
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 dark:text-white hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="w-full sm:w-auto">
        <NavLink
          onClick={handleClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-3 sm:px-5 py-2 font-normal tracking-wide text-sm sm:text-base flex items-center justify-start sm:justify-center w-full sm:w-auto
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 dark:text-white hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/ourServices"
        >
          Our Services
        </NavLink>
      </li>
      <li className="w-full sm:w-auto">
        <NavLink
          onClick={handleClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-3 sm:px-5 py-2 font-normal tracking-wide text-sm sm:text-base flex items-center justify-start sm:justify-center w-full sm:w-auto
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 dark:text-white hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/about"
        >
          About Us
        </NavLink>
      </li>
      <li className="w-full sm:w-auto">
        <NavLink
          onClick={handleClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-3 sm:px-5 py-2 font-normal tracking-wide text-sm sm:text-base flex items-center justify-start sm:justify-center w-full sm:w-auto
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 dark:text-white hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>
      <li className="w-full sm:w-auto">
        <NavLink
          onClick={handleClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-3 sm:px-5 py-2 font-normal tracking-wide text-sm sm:text-base flex items-center justify-start sm:justify-center w-full sm:w-auto
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 dark:text-white hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/appointment"
        >
          Appointment
        </NavLink>
      </li>
      <li className="w-full sm:w-auto">
        <NavLink
          onClick={handleClick}
          className={({ isActive }) =>
            `transition-all duration-150 px-3 sm:px-5 py-2 font-normal tracking-wide text-sm sm:text-base flex items-center justify-start sm:justify-center w-full sm:w-auto
            ${
              isActive
                ? "border-b-2 border-primary-600 text-primary-600"
                : "text-gray-900 dark:text-white hover:text-primary-600 hover:border-b-2 hover:border-primary-400"
            }`
          }
          to="/blogs"
        >
          Blogs
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
