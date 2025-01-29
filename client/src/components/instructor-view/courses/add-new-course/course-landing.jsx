import FormControls from '@/components/common-form/form-controls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseLandingPageFormControls } from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import { useContext } from 'react';
import { motion } from 'framer-motion';

function CourseLanding() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-lg">
          <CardTitle className="text-white text-2xl font-bold">
            Course Landing Page
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <FormControls
            formControls={courseLandingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CourseLanding;
