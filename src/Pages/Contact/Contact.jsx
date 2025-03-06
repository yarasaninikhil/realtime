import  { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import { MdPhoneInTalk } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoHome } from "react-icons/io5";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      user_travelers: formData.travelers,
    };

    emailjs
      .send(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        templateParams,
        'YOUR_PUBLIC_KEY' 
      )
      .then(
        (response) => {
          console.log('Email sent successfully!', response.status, response.text);
          alert('Your booking request has been sent successfully!');
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send email. Please try again later.');
        }
      );
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="Contactimg">
          <h1>Contact Us</h1>
        </div>
        <div className="touch">
          <h1 className='Get'>Get In Touch</h1>
          <div className="icon-container">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="line"></span>
    </div>
        <div className="contact-main">
         
          <div className="contact-card">
            
            <h2><MdPhoneInTalk />
            Phone Number</h2>
            <p>91 9000 847 111</p>
          </div>
          <div className="contact-card">
            <h2 ><MdEmail />
            Email ID</h2>
            <p>support@theynatours.in</p>
          </div>
          <div className="contact-card">
            <h2><IoHome />
            Address</h2>
            <p>Gachibowli - Miyapur Rd, Laxmi Cyber City, Whitefields, Kothaguda, Kondapur, Telangana 500084.</p>
          </div>
        </div>
        <div className="form-container">
          <h2>Book A Tour</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name *
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Email ID *
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Phone Number *
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Number Of Travelers *
              <input type="number" name="travelers" value={formData.travelers} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
