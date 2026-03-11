 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
 import '../App.css';
 
 const Hero = ()=>{
    return(
<>
<div className = "container">
   <h1 className='head'>Search for your destination</h1> 
   <div className='box'>
   <input type="text" />
    <FontAwesomeIcon icon={faSearch} className='search'/>
    </div>
    </div>
</>
    );
};
export default Hero;