import { Route, Routes } from 'react-router-dom'
import Home from 'pages/frontend/home'
import About from 'pages/frontend/about'
import Upcoming from 'pages/frontend/upcoming'
import Contact from 'pages/frontend/contact'
import EventDetails from 'pages/frontend/eventDetails'
import PrivateRoute from 'components/privateRoute/PrivateRoute'

export default function index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='upcoming' element={<Upcoming />} />
        <Route path='contact' element={<Contact />} />
        <Route path='event/details/:id' element={<PrivateRoute Component={EventDetails} />} />
      </Routes>

    </>
  )
}
