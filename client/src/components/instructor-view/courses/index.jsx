/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import { Edit, Trash2 } from 'lucide-react'; // Updated import
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  return (
    <Card className="shadow-lg rounded-lg border border-gray-100">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-bold text-gray-800">
          All Courses
        </CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate('/instructor/create-new-course');
          }}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-gray-600 font-semibold">
                  Course
                </TableHead>
                <TableHead className="text-gray-600 font-semibold">
                  Students
                </TableHead>
                <TableHead className="text-gray-600 font-semibold">
                  Revenue
                </TableHead>
                <TableHead className="text-right text-gray-600 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow
                      key={course._id}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <TableCell className="font-medium text-gray-800">
                        {course?.title}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {course?.students?.length}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-red-600 ml-1"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
