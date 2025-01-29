import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import { fetchStudentBoughtCoursesService } from '@/services';
import { BookOpen, PlayCircle, User } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
    }
  }

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          My Learning
        </h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studentBoughtCoursesList?.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card
              key={course.id}
              className="group relative overflow-hidden transition-all hover:shadow-xl border-0 bg-gradient-to-br from-white to-gray-50"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-48 w-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>

              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-lg line-clamp-2">
                  {course?.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="line-clamp-1 capitalize">
                    {course?.instructorName}
                  </span>
                </div>

                {/* Add progress indicator if available */}
                {/* <div className="pt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-3/4" />
                </div>
                <span className="text-xs text-gray-500 mt-1">75% Complete</span>
              </div> */}
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 space-y-4">
            <div className="mx-auto bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-full w-max">
              <BookOpen className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">No Courses Yet</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Start your learning journey by exploring our catalog of courses
            </p>
            <Button
              onClick={() => navigate('/courses')}
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;
