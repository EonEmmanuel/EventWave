import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const initialSpeakers = [
    {
        name: "Eon Emmanuel",
        profession: "Web Developer",
        profilePic: "https://st3.depositphotos.com/1017228/18878/i/450/depositphotos_188781580-stock-photo-handsome-cheerful-young-man-standing.jpg",
        instaId: "https://www.instagram.com/usman_s_usman2913/",
        facebookId: "https://www.facebook.com/profile.php?id=100055147804181",
        twitterId: "https://twitter.com/",
        linkedInId: "https://www.linkedin.com/in/muhammad-usman-51a946201",

    },
    {
        name: "Saheed Egunsola",
        profession: "Web Developer",
        profilePic: "https://img.freepik.com/free-photo/young-man-wearing-blue-outfit-looking-confident_1298-291.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708560000&semt=ais",
        instaId: "https://www.instagram.com/usman_s_usman2913/",
        facebookId: "https://www.facebook.com/profile.php?id=100055147804181",
        twitterId: "https://twitter.com/",
        linkedInId: "https://www.linkedin.com/in/muhammad-usman-51a946201",

    },
    {
        name: "Chukwunonso",
        profession: "Web Developer",
        profilePic: "https://st3.depositphotos.com/1017228/18878/i/450/depositphotos_188781580-stock-photo-handsome-cheerful-young-man-standing.jpg",
        instaId: "https://www.instagram.com/usman_s_usman2913/",
        facebookId: "https://www.facebook.com/profile.php?id=100055147804181",
        twitterId: "https://twitter.com/",
        linkedInId: "https://www.linkedin.com/in/muhammad-usman-51a946201",

    }
]

export default function Speakers() {
    const [speakers, setSpeakers] = useState(initialSpeakers)


    return (
        <div className='container' id='speakers-section'>
            <div className="row">
                <div className="col">
                    <h5 className='text-center text-warning'>Speakers</h5>
                    <h2 className='heading-stylling display-5'>TALENTED SPEAKERS</h2>
                </div>
            </div>
            <div className="row mt-5 pt-4">
                <div className="col">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        initialSlide={2}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        modules={[EffectCoverflow]}
                        className="mySwiper"
                    >
                        {speakers.map((item, i) => {
                            return <SwiperSlide key={i}>
                                <div class="card rounded-4 overflow-hidden shadow border-0">
                                    <div className="card-img">
                                        <img src={item.profilePic} alt="..." />
                                        <div className="social-media">
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.instaId} target='_blank'>
                                                    <i class='bx bxl-instagram fs-4' ></i>
                                                </Link>
                                            </div>
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.twitterId} target='_blank'>
                                                    <i class='bx bxl-twitter fs-4' ></i>
                                                </Link>
                                            </div>
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.facebookId} target='_blank'>
                                                    <i class='bx bxl-facebook fs-4'></i>
                                                </Link>
                                            </div>
                                            <div className='p-2 p-sm-3'>
                                                <Link to={item.linkedInId} target='_blank'>
                                                    <i class='bx bxl-linkedin fs-4' ></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body text-center py-3 px-0">
                                        <h5 class="card-title">{item.name}</h5>
                                        <p className='mb-0'>{item.profession}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
