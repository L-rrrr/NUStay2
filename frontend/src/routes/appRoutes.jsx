import {
  AboutPage,
  CreatePostPage,
  FilterPage,
  ForumCommentsPage,
  ForumPage,
  HomePage,
  HostelInfoPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  SavedHostelsPage,
} from '../pages';

const appRoutes = [
  { path: '*', element: <LoginPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/hostel/:id', element: <HostelInfoPage /> },
  { path: '/filter', element: <FilterPage /> },
  { path: '/saved', element: <SavedHostelsPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/forum', element: <ForumPage /> },
  { path: '/forum/createpost', element: <CreatePostPage /> },
  { path: '/forum/:postId', element: <ForumCommentsPage /> },
  { path: '/about', element: <AboutPage /> },
];

export default appRoutes;
