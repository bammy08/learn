/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import MediaProgressbar from '@/components/media-progress-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import VideoPlayer from '@/components/video-player';
import { courseCurriculumInitialFormData } from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from '@/services';
import { motion } from 'framer-motion';

import { ArrowLeft, Upload } from 'lucide-react';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCurriculum() {
  const navigate = useNavigate();
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const bulkUploadInputRef = useRef(null);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append('file', selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    if (deleteCurrentMediaResponse?.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: '',
        public_id: '',
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === 'object' &&
        item.title.trim() !== '' &&
        item.videoUrl.trim() !== ''
      );
    });
  }

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === 'boolean') {
          return true;
        }
        return value === '';
      });
    });
  }

  async function handleMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach((fileItem) => bulkFormData.append('files', fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage
      );

      if (response?.success) {
        let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        cpyCourseCurriculumFormdata = [
          ...cpyCourseCurriculumFormdata,
          ...response?.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${
              cpyCourseCurriculumFormdata.length + (index + 1)
            }`,
            freePreview: false,
          })),
        ];
        setCourseCurriculumFormData(cpyCourseCurriculumFormdata);
        setMediaUploadProgress(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentSelectedVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);

    if (response?.success) {
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg rounded-lg border border-gray-200">
          {/* Card Header with Gradient */}
          <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-lg">
            <CardTitle className="text-white text-2xl font-bold">
              Create Course Curriculum
            </CardTitle>
            <div>
              <Input
                type="file"
                ref={bulkUploadInputRef}
                accept="video/*"
                multiple
                className="hidden"
                id="bulk-media-upload"
                onChange={handleMediaBulkUpload}
              />
              <Button
                as="label"
                htmlFor="bulk-media-upload"
                variant="outline"
                className="cursor-pointer flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900"
                onClick={handleOpenBulkUploadDialog}
              >
                <Upload className="w-4 h-5" />
                Bulk Upload
              </Button>
            </div>
          </CardHeader>

          {/* Card Content */}
          <CardContent className="p-6 space-y-6">
            {/* Add Lecture Button */}
            <Button
              disabled={
                !isCourseCurriculumFormDataValid() || mediaUploadProgress
              }
              onClick={handleNewLecture}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
            >
              Add Lecture
            </Button>

            {/* Progress Bar */}
            {mediaUploadProgress && (
              <MediaProgressbar
                isMediaUploading={mediaUploadProgress}
                progress={mediaUploadProgressPercentage}
              />
            )}

            {/* Lecture List */}
            <div className="space-y-4">
              {courseCurriculumFormData.map((curriculumItem, index) => (
                <Card
                  key={index}
                  className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <h3 className="font-semibold text-lg text-gray-800">
                      Lecture {index + 1}
                    </h3>
                    <Input
                      name={`title-${index + 1}`}
                      placeholder="Enter lecture title"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(event) =>
                        handleCourseTitleChange(event, index)
                      }
                      value={courseCurriculumFormData[index]?.title}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        onCheckedChange={(value) =>
                          handleFreePreviewChange(value, index)
                        }
                        checked={courseCurriculumFormData[index]?.freePreview}
                        id={`freePreview-${index + 1}`}
                        className="data-[state=checked]:bg-blue-600"
                      />
                      <Label
                        htmlFor={`freePreview-${index + 1}`}
                        className="text-gray-700"
                      >
                        Free Preview
                      </Label>
                    </div>
                  </div>

                  {/* Video Section */}
                  <div className="mt-6">
                    {courseCurriculumFormData[index]?.videoUrl ? (
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <VideoPlayer
                          url={courseCurriculumFormData[index]?.videoUrl}
                          width="100%"
                          height="200px"
                          className="rounded-lg shadow-sm"
                        />
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => handleReplaceVideo(index)}
                            className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900"
                          >
                            Replace Video
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteLecture(index)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete Lecture
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(event) =>
                          handleSingleLectureUpload(event, index)
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default CourseCurriculum;
