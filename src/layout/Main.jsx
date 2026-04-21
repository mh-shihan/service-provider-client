import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/shared/navbar/Navbar";
import Footer from "../pages/shared/footer/Footer";

const Main = () => {
  const location = useLocation();

  // Check if the current route includes "/blogs"
  const isBlogsPage = location.pathname.includes("/blogs");
  const isRoomPage = location.pathname.includes("/room/");

  return (
    <div className="flex flex-col min-h-screen">
      {!isRoomPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isBlogsPage && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

export default Main;
