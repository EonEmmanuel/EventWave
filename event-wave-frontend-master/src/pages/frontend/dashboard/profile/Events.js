import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import seats from 'assets/pictures/seats.png';
import noData from 'assets/gifs/noData.gif';
import { getPopularEvents, getMyEvents } from 'services/event';
import moment from 'moment'

export default function Events({ userData }) {

     const [selectedTab, setSelectedTab] = useState("")
        const [events, setEvents] = useState([])
        const [isLoading, setIsLoading] = useState(false)
        
    
        useEffect(() => {
            getEvents();
        }, [selectedTab])
    
        const getEvents = async () => {
            setIsLoading(true)
            try {
                let { data } = await getMyEvents(selectedTab);
                setEvents(data?.data)
            } catch (error) {
                console.log(error);
                let msg = "Some error occured";
                let { status, data } = error.response;
                if (status == 400 || status == 401 || status == 500 || status == 413 || status == 404) {
                    msg = data.message || data.msg;
                    setEvents([])
                    window.toastify(msg, "error");
                }
            } finally {
                setIsLoading(false)
            }
        }
    
    return (
        <div className='container-fluid ' id='overview-dashboard-section'>
            <div className="container px-3">
                <div className="row gx-4 ">
                    <div className="col-12 col-lg-3">
                        <div className="card rounded-1 p-3 py-4 border-0 shadow ">
                            <h6 className='fw-bold '>Event History</h6><hr />
                            <div className='mb-3 btn btn-link text-decoration-none' onClick={() => setSelectedTab()}><strong>Upcoming Event</strong></div>
                            <div className='mb-3 btn btn-link text-decoration-none'><strong>Last Event</strong></div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9 mt-3 mt-md-0">
                        <div className="card rounded-1 p-3 py-4 border-0 shadow mt-2 mt-md-4 mt-lg-0">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
                    {events?.map((item, i) => {
                        return <div className="col d-flex align-items-stretch justify-content-center" key={i}>
                            <div class="card border-0 shadow rounded-4 w-100 overflow-hidden">
                                <Link className="card-img text-decoration-none text-body" to={`/event/details/${item?._id}`}>
                                    <img src={item?.image} class="card-img-top" alt="..." />
                                    <div className="seats bg-info py-2 px-4 d-flex align-items-center">
                                        <img src={seats} style={{ width: 30, marginRight: 10 }} alt="" />
                                        <span>{item?.seats - item?.seatsBooked?.length} Seat</span>
                                    </div>
                                </Link>
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <i class='bx bx-calendar text-warning me-1'></i> <span>{moment(item?.date).format('MMM D, YYYY')}</span>
                                        </div>
                                        <div>
                                            <LocationOnOutlinedIcon fontSize='small' className='text-warning me-1' />
                                            <span>{item?.country}</span>
                                        </div>
                                    </div>
                                    <h5 class="card-title">
                                        <Link to={`/event/details/${item?._id}`}>{item?.title}</Link>
                                    </h5>
                                    <div className="d-flex justify-content-between align-items-center  mt-4 mb-2">
                                        <span>
                                            <a href="#" className='text-warning'>Book Now</a>
                                        </span>
                                        <span>
                                            <button className='btn btn-outline-info btn-sm'><ShareOutlinedIcon fontSize='small' /></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
