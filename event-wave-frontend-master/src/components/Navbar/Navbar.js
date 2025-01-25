import { useEffect, useRef, useState } from 'react'
import './_navbar.scss'
import { Link } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext'
import { Avatar, Button, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileMenu from './ProfileMenu'
import { getPopularEvents } from 'services/event';

export default function Navbar() {
    const [navBarScroll, setNavBarScroll] = useState(false)
    const [selectedTab, setSelectedTab] = useState("Business")
    const [navbarCollapsed, setNavbarCollapsed] = useState(false)
    const [isCollapsedClick, setIsCollapsedClick] = useState(false)
    const { isAuthenticated, user, dispatch } = useAuthContext();
        const [events, setEvents] = useState([])
        const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            getEvents();
        }, [selectedTab])
    
        const getEvents = async () => {
            setIsLoading(true)
            try {
                let { data } = await getPopularEvents(selectedTab);
                setEvents(data?.data)
            } catch (error) {
                console.log(error);
                let msg = "Some error occured";
                let { status, data } = error.response;
                if (status === 400 || status === 401 || status === 500 || status === 413 || status === 404) {
                    msg = data.message || data.msg;
                    setEvents([])
                    window.toastify(msg, "error");
                }
            } finally {
                setIsLoading(false)
            }
        }

    const expandButtonRef = useRef()

    const navbarScrolling = () => {
        if (window.scrollY >= 60) {
            setNavBarScroll(true)
        } else {
            setNavBarScroll(false)
        }
    }
    window.addEventListener('scroll', navbarScrolling)
    useEffect(() => {
        let collapsed = expandButtonRef.current.getAttribute("aria-expanded")
        setNavbarCollapsed(JSON.parse(collapsed));
    }, [isCollapsedClick])

    const text = <span>{user?.firstName}</span>;

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-bg navbar-light`}>
                <div className="container">
                    <Link className="navbar-brand event-wave-logo" to="/">EventWave</Link>
                    <button className="navbar-toggler border" ref={expandButtonRef} onClick={() => setIsCollapsedClick(!isCollapsedClick)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse pb-3 pb-lg-0" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/upcoming">Upcoming</Link>
                            </li>
                            <li className="nav-item mx-2 dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu">
                                    {window?.categories?.map((item, i) => {
                                        return <li key={i} onClick={() => setSelectedTab(item)} ><a className="dropdown-item">{item}</a></li>
                                    })}
                                </ul>
                            </li>
                            <li className="nav-item mx-2">
                            <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <div >
                            {isAuthenticated
                                ? <Popover placement="bottomRight" title={text} content={<ProfileMenu />} >
                                    <Avatar
                                        size="large"
                                        style={{ cursor: "pointer" }}
                                        src={user?.image}
                                        icon={<UserOutlined />} />
                                </Popover>
                                : <Link className='button-stylling-1 px-5' to="/auth/login">Login</Link>
                            }
                        </div>
                    </div>
                    
                </div>
            </nav >
        </>
    )
}
