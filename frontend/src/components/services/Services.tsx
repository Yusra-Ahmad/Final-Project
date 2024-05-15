import { useEffect, useRef,useState } from "react";
import "./servicesAnimation.scss";
import { useNavigate } from "react-router-dom"; 
import "./servicesAnimation.scss";
import "./services.scss";
import { useServiceContext } from "../../context/serviceContext";
import { useUser } from "../../context/UserContext";
import service from "../../assets/Service1.jpeg";
import 'animate.css';
// const Base_Url = 'http://localhost:6000';
const Services = () => {
  const { user} = useUser();
  const {
    services,
    loading,
    error,
    fetchServices,
  } = useServiceContext();
  
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);
  useEffect(() => {
        fetchServices();
      }, []);
      useEffect(() => {
        const handleScroll = () => {
          if (!isVisible && contentRef.current) {
            const top = contentRef.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (top < windowHeight) {
              setIsVisible(true);
            }
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [isVisible]);
  // const navigate = useNavigate(); 

  const handleBookAppointment = () => {
    if (user) {
      navigate("/book-appointment");
    } else {
      navigate('/login', { state: { from: '/service' } });
    }
  };
  
  return (
    <>
    <div className="completebody">

      <div className="backgroundAnim">
        <div className="servicebody">
          <div className="serviceheader">
            <div className="header-p">
              <h1>Services </h1>
              <p className="text-on-image animate__fadeInLeftBig">
                Enter our peaceful place. Enjoy personal services and spa
                treatments to refresh your senses. Book now for a break from the
                everyday.
              </p>
            </div>
            <div className="imagediv ">
              <img src={service} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div    ref={contentRef}
        className={`content-body ${isVisible ? "animate" : ""}`}>
        <h2 className="animate__fadeInLeft">Our Menu</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          services.map((service) => (
            <div className="service-item animate__fadeInLeft"  key={service._id}>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-content">
                <p className="service-description">{service.description}</p>
                <p className="dash-p">-------------------------------</p>
                <p className="service-duration">{service.duration}</p>
                <p className="service-price">${service.price}</p>
              </div>
            </div>
          ))}
          <div className="service-button-div">
          <button onClick={handleBookAppointment}>Book Now</button>
          </div>
      </div>
          </div>
    </>
  );
};

export default Services;
