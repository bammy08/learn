export const signUpFormControls = [
  {
    name: 'userName',
    label: 'Full Name',
    placeholder: 'Enter your name',
    type: 'text',
    componentType: 'input',
  },
  {
    name: 'userEmail',
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    componentType: 'input',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input',
  },
];

export const signInFormControls = [
  {
    name: 'userEmail',
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    componentType: 'input',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input',
  },
];

export const initialSignInFormData = {
  userEmail: '',
  password: '',
};

export const initialSignUpFormData = {
  userName: '',
  userEmail: '',
  password: '',
};

export const languageOptions = [
  { id: 'english', label: 'English' },
  { id: 'spanish', label: 'Spanish' },
  { id: 'french', label: 'French' },
  { id: 'german', label: 'German' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'korean', label: 'Korean' },
  { id: 'portuguese', label: 'Portuguese' },
  { id: 'arabic', label: 'Arabic' },
  { id: 'russian', label: 'Russian' },
];

export const courseLevelOptions = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export const courseCategories = [
  // Technology
  { id: 'web-development', label: 'Web Development' },
  { id: 'backend-development', label: 'Backend Development' },
  { id: 'data-science', label: 'Data Science' },
  { id: 'machine-learning', label: 'Machine Learning' },
  { id: 'artificial-intelligence', label: 'Artificial Intelligence' },
  { id: 'cloud-computing', label: 'Cloud Computing' },
  { id: 'cyber-security', label: 'Cyber Security' },
  { id: 'mobile-development', label: 'Mobile Development' },
  { id: 'game-development', label: 'Game Development' },
  { id: 'software-engineering', label: 'Software Engineering' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'iot', label: 'Internet of Things (IoT)' },
  { id: 'ui-ux-design', label: 'UI/UX Design' },
  { id: 'devops', label: 'DevOps' },
  { id: 'database-management', label: 'Database Management' },
  { id: 'augmented-reality', label: 'Augmented Reality (AR)' },
  { id: 'virtual-reality', label: 'Virtual Reality (VR)' },
  { id: 'quantum-computing', label: 'Quantum Computing' },
  { id: 'robotics', label: 'Robotics' },

  // Business
  { id: 'digital-marketing', label: 'Digital Marketing' },
  { id: 'seo', label: 'Search Engine Optimization (SEO)' },
  { id: 'business-management', label: 'Business Management' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
  { id: 'finance-and-investment', label: 'Finance and Investment' },
  { id: 'project-management', label: 'Project Management' },
  { id: 'human-resources', label: 'Human Resources' },
  { id: 'sales', label: 'Sales' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'supply-chain-management', label: 'Supply Chain Management' },

  // Arts & Design
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'photography', label: 'Photography' },
  { id: 'video-editing', label: 'Video Editing' },
  { id: 'animation', label: 'Animation' },
  { id: 'fashion-design', label: 'Fashion Design' },
  { id: 'interior-design', label: 'Interior Design' },
  { id: 'music-production', label: 'Music Production' },
  { id: 'illustration', label: 'Illustration' },

  // Science
  { id: 'biology', label: 'Biology' },
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'astronomy', label: 'Astronomy' },
  { id: 'environmental-science', label: 'Environmental Science' },
  { id: 'biotechnology', label: 'Biotechnology' },
  { id: 'geology', label: 'Geology' },
  { id: 'forensic-science', label: 'Forensic Science' },

  // Personal Development
  { id: 'public-speaking', label: 'Public Speaking' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'time-management', label: 'Time Management' },
  { id: 'critical-thinking', label: 'Critical Thinking' },
  { id: 'emotional-intelligence', label: 'Emotional Intelligence' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'negotiation-skills', label: 'Negotiation Skills' },

  // Language Learning
  { id: 'english-language', label: 'English Language' },
  { id: 'spanish-language', label: 'Spanish Language' },
  { id: 'french-language', label: 'French Language' },
  { id: 'german-language', label: 'German Language' },
  { id: 'chinese-language', label: 'Chinese Language' },
  { id: 'japanese-language', label: 'Japanese Language' },
  { id: 'italian-language', label: 'Italian Language' },

  // Health & Fitness
  { id: 'yoga', label: 'Yoga' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'personal-training', label: 'Personal Training' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'weight-loss', label: 'Weight Loss' },
  { id: 'martial-arts', label: 'Martial Arts' },
];

export const courseLandingPageFormControls = [
  {
    name: 'title',
    label: 'Title',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter course title',
  },
  {
    name: 'category',
    label: 'Category',
    componentType: 'select',
    type: 'text',
    placeholder: '',
    options: courseCategories,
  },
  {
    name: 'level',
    label: 'Level',
    componentType: 'select',
    type: 'text',
    placeholder: '',
    options: courseLevelOptions,
  },
  {
    name: 'primaryLanguage',
    label: 'Language',
    componentType: 'select',
    type: 'text',
    placeholder: '',
    options: languageOptions,
  },
  {
    name: 'subtitle',
    label: 'Subtitle',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter course subtitle',
  },
  {
    name: 'description',
    label: 'Description',
    componentType: 'textarea',
    type: 'text',
    placeholder: 'Enter course description',
  },
  {
    name: 'pricing',
    label: 'Pricing',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter course pricing',
  },
  {
    name: 'objectives',
    label: 'Objectives',
    componentType: 'textarea',
    type: 'text',
    placeholder: 'Enter course objectives',
  },
  {
    name: 'welcomeMessage',
    label: 'Welcome Message',
    componentType: 'textarea',
    placeholder: 'Welcome message for students',
  },
];

export const courseLandingInitialFormData = {
  title: '',
  category: '',
  level: '',
  primaryLanguage: '',
  subtitle: '',
  description: '',
  pricing: '',
  objectives: '',
  welcomeMessage: '',
  image: '',
};

export const courseCurriculumInitialFormData = [
  {
    title: '',
    videoUrl: '',
    freePreview: false,
    public_id: '',
  },
];

export const sortOptions = [
  { id: 'price-lowtohigh', label: 'Price: Low to High' },
  { id: 'price-hightolow', label: 'Price: High to Low' },
  { id: 'title-atoz', label: 'Title: A to Z' },
  { id: 'title-ztoa', label: 'Title: Z to A' },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  language: languageOptions,
};
