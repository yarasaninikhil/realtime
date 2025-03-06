import { useState, useEffect } from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import './About.css';
import Footer from '../../Component/Footer/Footer';

const images = [
  "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/08/Tusk-Travel-Guest.jpg?fit=1024%2C768&ssl=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b2/7b/d4/taj-mahal-day-tour-packages.jpg?w=1200&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b2/7b/d1/golden-triangle-india.jpg?w=1200&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b2/7b/d1/golden-triangle-india.jpg?w=1200&h=-1&s=1"
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      <div className="about">
        <div className="Aboutimg">
          <h1>About Us</h1>
        </div>
        <div className="about-main">
          <h4 className='story'>THE STORY</h4>
          <h2 className='yna'>The YNA Tours</h2>
          <div className="about-right">
           
            <p>
              Welcome to The YNA Tours, your gateway to unforgettable travel experiences... 
            </p>
            <img src="https://img.freepik.com/premium-vector/travel-tours-logo-icon-brand-identity-sign-symbol_880781-721.jpg" alt="Travel" />
          </div>
          <div className="Our">
            <h2>Our Mission</h2>
            <p>
            At The YNA Tours, we are passionate about travel and committed to delivering the best holiday experiences. Our goal is simple: to help you explore the world in comfort and style while creating memories that last a lifetime. We believe travel is not just about the destination, but the journey – and we’re here to make sure every step is as exciting, enriching, and seamless as possible.
            </p>
          </div>
          <div className="what">
            <h2>What We Offer</h2>
            <ul>
            <li><span>Domestic and International Holiday Packages:</span> Whether you’re looking to relax on a tropical beach, hike through the majestic mountains, or explore vibrant cities, we curate custom travel experiences for every type of traveler.</li>
              <li><span>Luxury Honeymoon Packages:</span> Embark on the journey of a lifetime with our specially designed luxury honeymoon packages. From exotic beach resorts to romantic city escapes, we create unforgettable, intimate experiences for you and your partner.</li>
              <li><span>Corporate Trips:</span> Let us handle the planning for your next corporate trip or incentive program. We specialize in organizing everything from team-building activities to luxury retreats, ensuring your team has a productive and enjoyable time.</li>
            </ul>
          </div>
          <div className="Gallery">
            <h1>Our Gallery</h1>
            <div className="slider">
              <img src={images[currentIndex]} alt="Gallery Slide" className="slide-image" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
