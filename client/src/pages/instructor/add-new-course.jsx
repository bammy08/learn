import CourseCurriculum from '@/components/instructor-view/courses/add-new-course/course-curriculum';
import CourseLanding from '@/components/instructor-view/courses/add-new-course/course-landing';
import CourseSettings from '@/components/instructor-view/courses/add-new-course/course-settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from '@/config';
import { AuthContext } from '@/context/auth-context';
import { InstructorContext } from '@/context/instructor-context';
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
  updateCourseByIdService,
} from '@/services';
import { ArrowLeft, Book, Settings, Video } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddNewCoursePage() {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === '' || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; // Found at least one free preview
      }
    }

    return hasFreePreview;
  }

  async function handleCreateCourse() {
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
    };

    const response =
      currentEditedCourseId !== null
        ? await updateCourseByIdService(
            currentEditedCourseId,
            courseFinalFormData
          )
        : await addNewCourseService(courseFinalFormData);

    if (response?.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
      setCurrentEditedCourseId(null);
    }
  }

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(
      currentEditedCourseId
    );

    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];
        return acc;
      }, {});

      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }
  }

  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 w-full sm:w-auto justify-center sm:justify-start"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center sm:text-left">
            {currentEditedCourseId ? 'Edit Course' : 'Create a New Course'}
          </h1>
          <Button
            disabled={!validateFormData()}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md"
            onClick={handleCreateCourse}
          >
            SUBMIT
          </Button>
        </div>

        {/* Tabs */}
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="curriculum" className="space-y-6">
              {/* Tabs List */}
              <TabsList className="flex py-4 sm:py-8 rounded-lg gap-2 sm:gap-4  no-scrollbar">
                <TabsTrigger
                  value="curriculum"
                  className="flex-none sm:flex-1 flex items-center justify-center gap-2 p-2 sm:p-3 rounded-md hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors text-sm sm:text-base"
                >
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="course-landing-page"
                  className="flex-none sm:flex-1 flex items-center justify-center gap-2 p-2 sm:p-3 rounded-md hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors text-sm sm:text-base"
                >
                  <Book className="w-4 h-4 sm:w-5 sm:h-5" />
                  Course Landing
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex-none sm:flex-1 flex items-center justify-center gap-2 p-2 sm:p-3 rounded-md hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors text-sm sm:text-base"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AddNewCoursePage;
