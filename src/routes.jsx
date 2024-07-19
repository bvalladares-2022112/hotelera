import { Register } from './components/Register/Register.jsx'
import { Login } from './components/Login.jsx'
import { Home } from './Pages/Home/Home.jsx'
import { AuthPage } from './Pages/Auth/AuthPage.jsx'
import PageNotFound from './Pages/PageNotFound/PageNotFound.jsx'
import { MyProfilePage } from './Pages/MyProfilePage/MyProfilePage.jsx'
import Event from './Pages/Events/Events.jsx'
import { AddRoom } from './Pages/AddRoom/AddRoom.jsx'
import { AddHotel } from './Pages/AddHotel/AddHotel.jsx'
import { AddEvent } from './Pages/AddEvent/AddEvent.jsx'
import { Room } from './Pages/Room/Room.jsx'
import Reservation from './Pages/Reservation/Reservation.jsx'


export const routes = [
    {
        path: '/',
        element: <AuthPage />
    },
    {
        path: '*',
        element: <PageNotFound />
    },
    {
        path: '/stayGo',
        element: <Home />
    },
    {
        path: '/stayGo/register',
        element: <Register />
    },
    {
        path: '/stayGo/login',
        element: <Login />
    },
    {
        path: '/stayGo/myprofile/:id',
        element: <MyProfilePage />
    },
    {
        path: '/stayGo/AddRoom',
        element: <AddRoom/>
    },
    {
        path: '/stayGo/AddHotel',
        element: <AddHotel />
    },
    {
        path: '/stayGo/Event',
        element: <Event />
    },
    {
        path: '/stayGo/AddEvent',
        element: <AddEvent />
    },
    {
        path: '/stayGo/Room',
        element: <Room />
    },
    {
        path: '/stayGo/Reservation',
        element: <Reservation />
    }
]