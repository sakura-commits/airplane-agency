
import  '../App.css';

const Footer = ()=>{
    return(
        <>
       <footer className="footer">
  <div className="columnOne">
    <h3>About Us</h3>
    <p>We are committed to providing the best travel experience across Tanzania and beyond.</p>
  </div>

  <div className="columnTwo">
    <h3>Contact</h3>
    <p>Email: airkulty@info.org</p>
    <p>Phone: +123 456 7890</p>
  </div>

  <div className="columnThree">
    <h3>Follow Us</h3>
    <div className="social-links">
      <p>Facebook | Twitter | Instagram</p>
    </div>
    <p style={{marginTop: '15px'}}>Join our newsletter for travel deals:</p>
    <input 
      type="email" 
      placeholder="Your email" 
      style={{padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '4px', border: 'none'}} 
    />
    <button className="sus">Subscribe</button>
  </div>
</footer>
        
        </>
    )
}

export default Footer;