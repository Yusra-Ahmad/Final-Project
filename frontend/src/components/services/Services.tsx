import "./services.scss"
import ServiceBackground from "../../assets/ServiceBackground.jpeg"
const Services =()=>{
    return(
<>
<div className="servicebody">
    <div className="serviceheader">
        <div className="header-p">
    <h1 >Services </h1>
    <p className="text-on-image">
Step into a realm of unparalleled beauty and relaxation at our salon. From personalized services tailored to your unique needs to indulgent spa treatments designed to rejuvenate your senses, every visit promises a delightful escape from the ordinary. With expert stylists and therapists dedicated to your satisfaction, discover the perfect blend of luxury, expertise, and tranquility that awaits you.</p>
        </div>
<div className="imagediv">
<img src={ServiceBackground} alt="" />
</div>
    </div>

    </div>
</>
    );
};

export default Services