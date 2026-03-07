import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../App.css';
const  Services = ()=>{
    return(
        <>
        <div className="cards">
            <div className="one">
       <h2>Hotel</h2>
        <Link to="/hotel"><a href='#'><FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/></a></Link> 
            </div>
            <div className="two">
         <h2>Car Rental</h2>
             <Link to="/car-rental"><a href='#'><FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/></a></Link>  
            </div>
            <div className="three">
          <h2>Travel Guide</h2>
 <Link to="/travel"><a href='#'><FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/></a></Link>  
            </div>
        </div>
        </>
    )
} 

export default Services;