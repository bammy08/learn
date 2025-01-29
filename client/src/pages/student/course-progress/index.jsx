import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoPlayer from '@/components/video-player';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from '@/services';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lock,
  Play,
  Trophy,
  User,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate, useParams } from 'react-router-dom';

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log('logging here');
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(currentLecture, 'currentLecture');

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/student-courses')}
            variant="ghost"
            className="hover:bg-purple-500/20 bg-purple-500/10 rounded-lg transition-all text-purple-300 border border-purple-500/30"
          >
            <ChevronLeft className="h-5 w-5 mr-2 text-purple-300" />
            <span className="font-medium">My Courses</span>
          </Button>
          <h1 className="text-xl font-bold truncate max-w-[400px]">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          variant="ghost"
          className="hover:bg-gray-700/50"
        >
          {isSideBarOpen ? (
            <ChevronRight className="h-6 w-6 text-purple-400" />
          ) : (
            <ChevronLeft className="h-6 w-6 text-purple-400" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Section */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSideBarOpen ? 'mr-[420px]' : ''
          }`}
        >
          <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video max-w-4xl mx-auto">
            <VideoPlayer
              width="100%"
              height="100%"
              url={currentLecture?.videoUrl}
              onProgressUpdate={setCurrentLecture}
              progressData={currentLecture}
              className="absolute inset-0"
            />
          </div>

          {/* Lecture Info */}
          <div className="p-6 space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{currentLecture?.title}</h2>
              {currentLecture?.progressValue === 1 && (
                <span className="flex items-center px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <Check className="h-4 w-4 mr-2" />
                  Completed
                </span>
              )}
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                style={{
                  width: `${(currentLecture?.progressValue || 0) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[420px] bg-gray-900 border-l border-gray-700 transform transition-transform duration-300 ${
            isSideBarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-2 bg-gray-800 p-0 h-14 border-b border-gray-700 shadow-sm">
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-600/20 data-[state=active]:to-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none h-full font-semibold text-gray-300 border-r border-gray-600 transition-all hover:bg-gray-700/30"
              >
                <span className="relative py-2.5">
                  Curriculum
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent data-[state=active]:opacity-100 opacity-0 transition-opacity" />
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-600/20 data-[state=active]:to-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-500 rounded-none h-full font-semibold text-gray-300 transition-all hover:bg-gray-700/30"
              >
                <span className="relative py-2.5">
                  Course Details
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent data-[state=active]:opacity-100 opacity-0 transition-opacity" />
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Curriculum Content */}
            <TabsContent value="content" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item, index) => {
                      const isCompleted =
                        studentCurrentCourseProgress?.progress?.find(
                          (p) => p.lectureId === item._id
                        )?.viewed;
                      const isCurrent = item._id === currentLecture?._id;

                      return (
                        <div
                          key={item._id}
                          onClick={() =>
                            !isCompleted && setCurrentLecture(item)
                          }
                          className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-all
                          ${
                            isCurrent
                              ? 'bg-purple-500/20 border border-purple-500/50'
                              : ''
                          }
                          ${
                            isCompleted
                              ? 'opacity-50 hover:bg-gray-800/50'
                              : 'hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <Check className="h-5 w-5 text-green-400" />
                            ) : (
                              <span className="text-gray-400 text-sm font-mono">
                                {index + 1}.
                              </span>
                            )}
                          </div>
                          <span
                            className={`${
                              isCurrent ? 'text-purple-400' : 'text-gray-300'
                            }`}
                          >
                            {item.title}
                          </span>
                          {isCurrent && (
                            <span className="ml-auto flex items-center text-purple-400 text-sm">
                              <Play className="h-4 w-4 mr-2" />
                              Now Playing
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Overview Content */}
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Course Description</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {studentCurrentCourseProgress?.courseDetails?.description}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Instructor</h3>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">
                          {
                            studentCurrentCourseProgress?.courseDetails
                              ?.instructorName
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Course Complete Dialog */}
      <Dialog open={showCourseCompleteDialog}>
        <DialogPortal>
          <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
          <DialogContent className="sm:max-w-md rounded-xl border-0 bg-gray-900">
            <div className="p-6 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold mb-2 text-gray-200">
                Course Completed! 🎉
              </DialogTitle>
              <DialogDescription className="text-gray-300 mb-6">
                You have successfully finished this course. Keep up the great
                work!
              </DialogDescription>
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleRewatchCourse}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Restart Course
                </Button>
                <Button
                  onClick={() => navigate('/student-courses')}
                  variant="secondary"
                  className="w-full hover:bg-gray-800"
                >
                  Back to My Courses
                </Button>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Lock Course Dialog */}
      <Dialog open={lockCourse}>
        <DialogPortal>
          <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
          <DialogContent className="sm:max-w-md rounded-xl border-0 bg-gray-900">
            <div className="p-6 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                <Lock className="h-8 w-8 text-red-400" />
              </div>
              <DialogTitle className="text-2xl font-bold mb-2">
                Course Locked 🔒
              </DialogTitle>
              <DialogDescription className="text-gray-300 mb-6">
                Purchase the course to unlock all content and features
              </DialogDescription>
              <Button
                onClick={() => navigate(`/student-courses`)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                View Available Courses
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;
