/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import VideoPlayer from '@/components/video-player';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from '@/services';
import {
  CheckCircle,
  Globe,
  Lock,
  PlayCircle,
  ShoppingCart,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'initiated',
      orderDate: new Date(),
      paymentId: '',
      payerId: '',
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        'currentOrderId',
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes('course/details'))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchaseId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (approvalUrl !== '') {
    window.location.href = approvalUrl;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Course Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-xl mb-8">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          {studentViewCourseDetails?.title}
        </h1>
        <p className="text-xl mb-6 font-light opacity-95">
          {studentViewCourseDetails?.subtitle}
        </p>
        <div className="flex flex-wrap gap-5 text-sm font-medium">
          <span className="flex items-center bg-white/10 px-3 py-1 rounded-full capitalize">
            <Globe className="mr-2 h-4 w-4 opacity-80" />
            {studentViewCourseDetails?.primaryLanguage}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full">
            {studentViewCourseDetails?.students.length}{' '}
            {studentViewCourseDetails?.students.length <= 1
              ? 'Student'
              : 'Students'}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full capitalize">
            Created By {studentViewCourseDetails?.instructorName}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full">
            Created On {studentViewCourseDetails?.date.split('T')[0]}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Course Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Objectives */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold tracking-tight">
                What You will Learn
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentViewCourseDetails?.objectives
                  .split(',')
                  .map((objective, index) => (
                    <li
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CheckCircle className="mr-3 h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium">
                        {objective}
                      </span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          {/* Course Description */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Course Description
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 prose max-w-none text-gray-600 text-lg leading-relaxed">
              {studentViewCourseDetails?.description}
            </CardContent>
          </Card>

          {/* Curriculum */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Course Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {studentViewCourseDetails?.curriculum?.map(
                  (curriculumItem, index) => (
                    <li
                      key={index}
                      className={`group ${
                        curriculumItem?.freePreview
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 cursor-pointer'
                          : 'bg-gray-50 opacity-75 cursor-not-allowed'
                      } flex items-center p-4 rounded-lg border transition-all`}
                      onClick={
                        curriculumItem?.freePreview
                          ? () => handleSetFreePreview(curriculumItem)
                          : null
                      }
                    >
                      <div className="flex items-center w-full">
                        {curriculumItem?.freePreview ? (
                          <>
                            <PlayCircle className="mr-4 h-7 w-7 text-blue-600 shrink-0" />
                            <span className="text-lg font-medium text-gray-800">
                              {curriculumItem?.title}
                            </span>
                            <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              Free Preview
                            </span>
                          </>
                        ) : (
                          <>
                            <Lock className="mr-4 h-7 w-7 text-gray-400 shrink-0" />
                            <span className="text-lg text-gray-600">
                              {curriculumItem?.title}
                            </span>
                          </>
                        )}
                      </div>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Preview & Purchase */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 border-0 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
              <CardTitle className="text-xl font-bold text-center tracking-tight">
                Start Learning Today
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-video mb-6 rounded-xl overflow-hidden border">
                {getIndexOfFreePreviewUrl !== -1 ? (
                  <VideoPlayer
                    url={
                      studentViewCourseDetails?.curriculum[
                        getIndexOfFreePreviewUrl
                      ].videoUrl
                    }
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <div className="bg-gray-100 h-full flex items-center justify-center">
                    <span className="text-gray-500">
                      Select a free preview lesson
                    </span>
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="text-5xl font-extrabold text-gray-900 mb-2">
                  ${studentViewCourseDetails?.pricing}
                </div>
                <p className="text-gray-500">Lifetime access</p>
              </div>

              <Button
                onClick={handleCreatePayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-transform hover:scale-[1.02] shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Free Preview Dialog */}
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Course Preview
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg overflow-hidden">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="100%"
              height="100%"
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  key={filteredItem._id}
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-lg font-medium hover:text-blue-600 transition-all"
                >
                  {filteredItem?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-100 hover:bg-gray-200"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
