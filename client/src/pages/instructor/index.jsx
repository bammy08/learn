import InstructorCourses from '@/components/instructor-view/courses';
import InstructorDashboard from '@/components/instructor-view/dashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AuthContext } from '@/context/auth-context';
import { InstructorContext } from '@/context/instructor-context';
import { fetchInstructorCourseListService } from '@/services';
import { BarChart, Book, GraduationCap, LogOut } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: 'Courses',
      value: 'courses',
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg hidden md:flex flex-col justify-between">
        <div className="p-4 border-b">
          {/* Brand Logo */}
          <Link
            to="/home"
            className="flex items-center  text-blue-600 hover:text-blue-800"
          >
            <GraduationCap className="h-8 w-8 mr-2" />
            <span className="font-extrabold text-2xl">LEARN.COM</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 py-6 space-y-3">
          {menuItems.map((menuItem) => (
            <Button
              key={menuItem.value}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                activeTab === menuItem.value
                  ? 'text-blue-600 bg-blue-50 hover:bg-gray-200 border-r-4 border-blue-600'
                  : 'text-gray-600 bg-slate-100 hover:text-blue-600 hover:bg-gray-100 border-r-4 border-transparent'
              }`}
              onClick={
                menuItem.value === 'logout'
                  ? handleLogout
                  : () => setActiveTab(menuItem.value)
              }
            >
              <menuItem.icon className="h-5 w-5" />
              {menuItem.label}
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Learn.com
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-semibold text-gray-800 mb-8">
            {menuItems.find((item) => item.value === activeTab)?.label}
          </h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent key={menuItem.value} value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
