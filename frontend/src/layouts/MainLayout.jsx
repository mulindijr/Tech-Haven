import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <SearchBar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;