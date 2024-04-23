
import "./contactus.css";

function Contactus()
{

    return(<>
        <body>
        <section className="section-wrapper">
            <div className="box-wrapper">
                <div className="info-wrap">
                    <h2 className="info-tittle">Contact Information</h2>
                    <h3 className="info-sub-tittle">Fill up the form our team will get back to you within 24 hours</h3>
                    <ul className="info-details">
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span>Phone: </span> <a href="tel: +919908875796">9908875796</a>
                        </li>
                        <li>
                            <i className="fas fa-paper-plane"></i>
                            <span>Email: </span> <a href="mailto: jaymani8328@gmail.com">jmani8328@gmail.com</a>
                        </li>
                        <li>
                            <i className="fas fa-globe"></i>
                            <span>Website: </span> <a href="https://">gitHub.com</a>
                        </li>
                    </ul>  
                        <ul className="social-icons">
                            <li>
                                <a href="#">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                </div>
                <div className="form-wrap">
                    <form action="#" method="post">
                        <h2 className="form-tittle">Send us a message</h2>
                        <div className="form-fields">
                            <div className="form-group">
                                <input type="text" className="fname" placeholder="First Name"/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="lname" placeholder="Last Name"/>
                            </div>
                            <div className="form-group">
                                <input type="email" className="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="number" className="phone" placeholder="Phone"/>
                            </div>
                            <div className="form-group">
                                <textarea className="message" id="" placeholder="Write your message"></textarea>
                            </div>
                            <input type="submit" value="Send message" className="submit-button"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </body>
        </> )

}

export default Contactus;