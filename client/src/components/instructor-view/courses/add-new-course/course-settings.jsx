import MediaProgressbar from '@/components/media-progress-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InstructorContext } from '@/context/instructor-context';
import { mediaUploadService } from '@/services';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function CourseSettings() {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append('file', selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          imageFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.url,
          });
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg rounded-lg border border-gray-200">
        {/* Gradient Header */}
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-lg">
          <CardTitle className="text-white text-2xl font-bold">
            Course Settings
          </CardTitle>
        </CardHeader>

        {/* Progress Bar */}
        <div className="p-6">
          {mediaUploadProgress && (
            <MediaProgressbar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadProgressPercentage}
            />
          )}
        </div>

        {/* Card Content */}
        <CardContent className="p-6">
          {courseLandingFormData?.image ? (
            <div className="flex flex-col gap-6">
              <img
                src={courseLandingFormData.image}
                alt="Course Image"
                className="rounded-lg shadow-sm w-full max-w-md"
              />
              <Button
                variant="outline"
                onClick={() =>
                  setCourseLandingFormData({
                    ...courseLandingFormData,
                    image: null,
                  })
                }
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 w-full sm:w-auto"
              >
                Replace Image
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Label className="text-gray-700">Upload Course Image</Label>
              <Input
                onChange={handleImageUploadChange}
                type="file"
                accept="image/*"
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CourseSettings;
