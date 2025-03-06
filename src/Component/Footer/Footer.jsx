import React from 'react'
import './Footer.css'
import Video from "../../Component/assets/footer.mp4";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer-main">
                    <video className="video-bg" src={Video} autoPlay muted loop />
                    <div className="footerwrap">
                        <div className="logo">
                            YNA
                            <div className="tagline">Journey Beyond Boundaries</div>
                        </div>

                        <div className="useful-links">
                            <h3>Useful Links</h3>
                            <ul>
                                <li>Home</li>
                                <li>Destination</li>
                                <li>About Us</li>
                                <li>Contact Us</li>
                                
                            </ul>
                        </div>
                        <div className="contact-info">
                            <h3>Contact Info</h3>
                            <ul>
                                <li>Email ID: support@theynatours.in</li>
                                <li>Phone number: 91 9000 847 111</li>
                                <li>Head Office: Gachibowli - Miyapur Rd, Laxmi Cyber City,<br></br> Whitefields, Kothaguda, Kondapur, Telangana 500084.</li>

                            </ul>
                        </div>
                    </div>
                    <div className="underfooter">
                    <div className="social-media">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-instagram"></i></a>
                    </div>

                    <div className="bottom-bar">
                        TECHNOLOGIES ©2024. All Rights Reserved by theYNAtours
                        <a href="#">Company Policies</a>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Trip Acknowledgment</a>
                    </div>
                    </div>
                </div>


            </div>



        </>)
}

export default Footer