import { GraduationCap, SquarePlay, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/auth-context';

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate('/auth'); // Redirect to login page after logout
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm sticky top-0 z-50">
      {/* Left Section: Logo and Explore Courses Button */}
      <div className="flex items-center space-x-6">
        <Link
          to="/home"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <GraduationCap className="h-8 w-8 mr-2 text-blue-600" />
          <span className="font-bold text-xl text-blue-600 hidden md:block">
            LEARN.COM
          </span>
        </Link>
        <Button
          onClick={() => {
            if (!location.pathname.includes('/courses')) {
              navigate('/courses');
            }
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hidden md:block"
        >
          Explore Courses
        </Button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <Menu
          className="h-8 w-8 text-blue-600 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Right Section: My Courses and Sign Out */}
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex md:items-center md:space-x-4 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row p-4 md:p-0 border-b md:border-none`}
      >
        <div
          onClick={() => {
            navigate('/student-courses');
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer transition-all shadow-sm w-full md:w-auto mb-2 md:mb-0"
        >
          <SquarePlay className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-blue-600">My Courses</span>
        </div>
        <Button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md w-full md:w-auto"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
