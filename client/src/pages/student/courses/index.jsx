/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { filterOptions, sortOptions } from '@/config';
import { AuthContext } from '@/context/auth-context';
import { StudentContext } from '@/context/student-context';
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from '@/services';
import { ArrowUpDownIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GridIcon, ListIcon } from 'lucide-react'; // Example icons

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join('&');
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState('price-lowtohigh');
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // Default to grid view
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('filters');
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Discover Courses
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6">
          {Object.keys(filterOptions).map((keyItem) => (
            <div className="mb-6" key={keyItem}>
              <h3 className="font-bold text-lg text-gray-700 mb-4">
                {keyItem.toUpperCase()}
              </h3>
              <div className="grid gap-3">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex items-center gap-3 text-gray-600"
                    key={option.id}
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() =>
                        handleFilterOnChange(keyItem, option)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          {/* Sorting, Results, and View Toggle Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {/* Sorting Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:shadow-md hover:border-gray-400 transition-colors"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => setSort(value)}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                        className="text-sm"
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Toggle Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-gray-100 border-gray-300'
                      : 'border-transparent hover:bg-gray-100'
                  }`}
                >
                  <GridIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-gray-100 border-gray-300'
                      : 'border-transparent hover:bg-gray-100'
                  }`}
                >
                  <ListIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <span className="text-sm text-gray-600">
              {studentViewCoursesList.length} Results
            </span>
          </div>

          {/* Course Cards Section */}
          {loadingState ? (
            <div
              className={`${
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }`}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden animate-pulse ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div
                    className={`${
                      viewMode === 'list' ? 'w-48 h-48' : 'w-full h-48'
                    } bg-gray-200`}
                  ></div>
                  <div className="p-4 space-y-3 flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            <div
              className={`${
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }`}
            >
              {studentViewCoursesList.map((courseItem) => (
                <Card
                  key={courseItem?._id}
                  onClick={() => navigate(`/course/details/${courseItem?._id}`)}
                  className={`cursor-pointer bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <CardContent
                    className={`p-4 ${
                      viewMode === 'list' ? 'flex gap-6' : 'space-y-4'
                    }`}
                  >
                    {/* Course Image */}
                    <div
                      className={`${
                        viewMode === 'list' ? 'w-48 h-48' : 'w-full h-48'
                      } overflow-hidden rounded-lg`}
                    >
                      <img
                        src={courseItem?.image}
                        alt={courseItem?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 capitalize">
                        By{' '}
                        <span className="font-medium capitalize">
                          {courseItem?.instructorName}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        {`${courseItem?.curriculum?.length} ${
                          courseItem?.curriculum?.length <= 1
                            ? 'Lecture'
                            : 'Lectures'
                        } • ${courseItem?.level.toUpperCase()}`}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">
                No Courses Found
              </h2>
              <p className="text-gray-600 mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
