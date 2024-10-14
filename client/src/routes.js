import App from "./App";
import Home from "./pages/Home";
import AddTrack from "./pages/AddTrack";
import TrackInfo from "./pages/TrackInfo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/upload",
                element: <AddTrack />
            },
            {
                path: "/tracks/:id",
                element: <TrackInfo />
            },
            {
                path: "/profile/:id",
                element: <Profile />
            },
            {
                path: "/profile/:id/edit",
                element: <EditProfile />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]

export default routes;