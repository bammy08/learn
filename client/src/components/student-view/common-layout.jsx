import { Outlet, useLocation } from 'react-router-dom';
import StudentViewCommonHeader from './header';
import Footer from './footer'; // Make sure to import your Footer component

function StudentViewCommonLayout() {
  const location = useLocation();
  const isCourseProgress = location.pathname.includes('course-progress');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render header */}
      {!isCourseProgress && <StudentViewCommonHeader />}

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Conditionally render footer */}
      {!isCourseProgress && <Footer />}
    </div>
  );
}

export default StudentViewCommonLayout;
