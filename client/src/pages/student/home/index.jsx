import { courseCategories } from '@/config';
import banner from '../../../../public/banner.webp';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useMemo } from 'react';
import { StudentContext } from '@/context/student-context';
import {
  // checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from '@/services';
// import { AuthContext } from '@/context/auth-context';
import { useNavigate } from 'react-router-dom';

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem('filters');
    const currentFilter = { category: [getCurrentId] };
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/courses');
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    // Navigate directly to the course details page without checking purchase status
    navigate(`/course/details/${getCurrentCourseId}`);
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  // Shuffle and limit the course categories
  const displayedCategories = useMemo(() => {
    const shuffled = [...courseCategories].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 16);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between py-20 px-6 lg:px-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Empower Your Learning Journey
          </h1>
          <p className="text-lg mb-8">
            Explore courses that elevate your skills and help you achieve your
            dreams.
          </p>
          <Button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all">
            Get Started
          </Button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={banner}
            alt="Learning Banner"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 px-6 lg:px-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Explore Course Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {displayedCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              variant="outline"
              className="flex items-center justify-center px-4 py-3 text-lg font-medium border border-gray-300 bg-white shadow-sm rounded-lg hover:bg-blue-50 hover:border-blue-600 hover:shadow-md transition-all duration-200"
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-6 lg:px-16 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem._id}
                onClick={() => handleCourseNavigate(courseItem._id)}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
              >
                <img
                  src={courseItem?.image}
                  alt={courseItem?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                    {courseItem?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 capitalize">
                    {courseItem?.instructorName}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No Courses Found
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
