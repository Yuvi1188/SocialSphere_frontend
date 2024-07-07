import { RouterProvider, createBrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './components/home/Home';
import UserProfile from './components/user/profile/UserProfile';
import SignUp from './components/user/authentication/SignUp';
import Dob from './components/user/authentication/Dob';
import ConfirmationCode from './components/user/authentication/ConfirmationCode';
import Login from './components/user/authentication/Login';
import RootLayout from "./components/layout/RootLayout";
import Root from "./components/layout/Root";
import Reels from "./components/reels/Reels";
import Messages from "./components/messages/Messages";
import SearchSidebar from "./components/layout/sidebar/SearchSideBar";
import SettingsRootLayout from "./components/user/profile/settings/SettingsRootLayout";
import EditProfile from "./components/user/profile/settings/EditProfile";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import NewUserRoute from "./components/layout/NewUserRoute";
import Story from "./components/layout/Story";
import { loadUser } from "./store/user-actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/layout/loader/Loader";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <ProtectedRoute component={<RootLayout />} />,
        children: [
          {
            path: '',
            element: <ProtectedRoute component={<Home />} />
          },
          {
            path: 'reels',
            element: <ProtectedRoute component={<Reels />} />
          },
          {
            path: 'messages',
            element: <ProtectedRoute component={<Messages />} />
          },
          {
            path: 'messages/:chatId',
            element: <ProtectedRoute component={<Messages />} />
          },
          {
            path: 'profile/:id',
            element: <ProtectedRoute component={<UserProfile />} />
          },
          {
            path: 'accounts',
            element: <SettingsRootLayout />,
            children: [
              {
                path: '',
                element: <ProtectedRoute component={<EditProfile />} />,
              }
            ]
          },
        ]
      },
      {
        path: '/story/:id',
        element: <ProtectedRoute component={<Story />} />,
      },
      {
        path: '/signup',
        element: <NewUserRoute component={<SignUp />} />
      },
      {
        path: '/login',
        element: <NewUserRoute component={<Login />} />
      },
      {
        path: '/dob',
        element: <NewUserRoute component={<Dob />} />
      },
      {
        path: '/otp',
        element: <NewUserRoute component={<ConfirmationCode />} />
      }
    ]
  }
]);


function App() {
  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);
  return (<>
    {loading ? (<Loader />) : (<RouterProvider router={router} />)}
  </>
  );
}

export default App;
