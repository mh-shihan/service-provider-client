import { Link } from "react-router-dom";
import logo from "./../../../assets/icon/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 text-base-content pt-12 pb-6 px-0 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 border-b border-base-300 pb-8">
          {/* Logo and Brand */}
          <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
            <img
              src={logo}
              alt="Service Provider Logo"
              className="w-52 h-auto mb-3"
            />
            <p className="text-sm text-base-content/60">
              Providing reliable tech since 2024
            </p>
          </div>
          {/* Links */}
          <div className="flex-1 flex flex-col sm:flex-row gap-8 md:gap-16 justify-center md:justify-center w-full md:w-auto">
            <nav>
              <h6 className="text-xl font-bold mb-3 text-base-content/80">
                Services
              </h6>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/ourServices/doctor"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Doctor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ourServices/teacher"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Researcher
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ourServices/lawyer"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Lawyer
                  </Link>
                </li>
              </ul>
            </nav>
            <nav>
              <h6 className="text-xl font-bold mb-3 text-base-content/80">
                Company
              </h6>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ourServices"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/appointment"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Appointment
                  </Link>
                </li>
              </ul>
            </nav>
            <nav>
              <h6 className="text-xl font-bold mb-3 text-base-content/80">
                Legal
              </h6>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    className="hover:text-primary-500 transition-colors"
                    to="/terms"
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary-500 transition-colors"
                    to="/privacy"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-primary-500 transition-colors"
                    to="/cookies"
                  >
                    Cookie policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="pt-6 text-center text-base-content/60 text-sm">
          &copy; {new Date().getFullYear()} Service Provider. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
