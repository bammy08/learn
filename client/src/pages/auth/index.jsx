import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CommonForm from '@/components/common-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signInFormControls, signUpFormControls } from '@/config';
import { AuthContext } from '@/context/auth-context';
import { GraduationCap } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin');
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  const navigate = useNavigate(); // Initialize useNavigate

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== '' &&
      signInFormData.password !== ''
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== '' &&
      signUpFormData.userEmail !== '' &&
      signUpFormData.password !== ''
    );
  }

  async function handleRegisterAndRedirect(event) {
    event.preventDefault();
    const data = await handleRegisterUser(event);

    if (data.success) {
      // Redirect to homepage after successful registration
      navigate('/');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-gray-50">
      {/* Header */}
      <header className="px-6 lg:px-10 h-16 flex items-center justify-between bg-white shadow-md">
        <Link
          to={'/'}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <GraduationCap className="h-8 w-8 mr-2" />
          <span className="font-extrabold text-2xl">LEARN.COM</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center flex-1">
        <div className="w-full max-w-lg px-4">
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Tabs List */}
            <TabsList className="flex justify-between rounded-lg py-6 bg-gray-200 gap-2">
              <TabsTrigger
                value="signin"
                className={`flex-1 text-center py-2 rounded-lg ${
                  activeTab === 'signin'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:bg-gray-300'
                }`}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={`flex-1 text-center py-2 rounded-lg ${
                  activeTab === 'signup'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:bg-gray-300'
                }`}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="mt-6">
              <Card className="shadow-lg rounded-xl backdrop-blur-md bg-white/90">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-xl font-bold">
                    Welcome Back!
                  </CardTitle>
                  <CardDescription>
                    Enter your email and password to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText="Sign In"
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    isButtonDisabled={!checkIfSignInFormIsValid()}
                    handleSubmit={handleLoginUser}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="mt-6">
              <Card className="shadow-lg rounded-xl backdrop-blur-md bg-white/90">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-xl font-bold">
                    Create an Account
                  </CardTitle>
                  <CardDescription>
                    Join us today and start learning!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText="Sign Up"
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                    handleSubmit={handleRegisterAndRedirect} // Use the new handler
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
