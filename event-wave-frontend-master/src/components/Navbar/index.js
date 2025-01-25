import { useEffect, useRef, useState } from 'react'
import './_navbar.scss'
import { Link } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext'
import { Avatar, Button, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import ProfileMenu from './ProfileMenu'

export default function Index() {
    const [navBarScroll, setNavBarScroll] = useState(false)
    const [navbarCollapsed, setNavbarCollapsed] = useState(false)
    const [isCollapsedClick, setIsCollapsedClick] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { isAuthenticated, user } = useAuthContext();


    const expandButtonRef = useRef()

    const navbarScrolling = () => {
        if (window.scrollY >= 70) {
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
            <nav className={`navbar navbar-expand-lg ${navBarScroll ? "navbar-background" : navbarCollapsed ? "navbar-background " : "bg-transparent"} ${navBarScroll ? "navbar-light navbar-fixed" : navbarCollapsed ? "navbar-light navbar-absolute" : "navbar-dark navbar-absolute"} `}>
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
                            <li className="nav-item mx-2 dropdown" onMouseOver={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <a className={`nav-link dropdown-toggle ${dropdownOpen ? "show" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded={dropdownOpen ? "true" : "false"}>
                                    Categories
                                </a>
                                <ul className={`dropdown-menu pt-0 rounded-0 border-0 shadow ${dropdownOpen ? "show" : ""}`} data-bs-popper="static">
                                    {window?.categories?.map((item, i) => {
                                        return <li key={i}><a className="dropdown-item" href="#">{item}</a></li>
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
