import "./servicesAnimation.scss"
import"./services.scss"
import service from "../../assets/Service1.jpeg"
const Services =()=>{
    return(
<>
<div className="backgroundAnim">
<div className="servicebody">
    <div className="serviceheader" >
        <div className="header-p">
    <h1 >Services </h1>
    <p className="text-on-image animate__fadeInLeftBig">
    Enter our peaceful place. Enjoy personal services and spa treatments to refresh your senses. Book now for a break from the everyday.</p>
        </div>
<div className="imagediv "> 
<img src={service} alt="" />
</div>
    </div>
    </div>
</div>
{/* <div className="content-body">
<h2>Our Menu</h2>
</div> */}
</>
    );
};

export default Services