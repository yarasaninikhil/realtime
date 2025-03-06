import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaHandHoldingDollar } from "react-icons/fa6";

import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import { supabase } from '../../Client';
import Video from "../../Component/assets/video.mp4";
import './Home.css';

const text = "Welcome To YNA Tours & Travels";

const testimonials = [
  {
    name: "Nayan Babariya",
    location: "Pune",
    feedback: "Staff's behaviour I liked the most. Even they provided water bottles to the travellers and pickup cab facility was also good."
  },
  {
    name: "Vikas Morvadiya",
    location: "Hyderabad",
    feedback: "I travel a lot for work from Bangalore to Pune on buses and have traveled by almost all bus services. Since my first ride with Orange Travels."
  },
  {
    name: "Amit Patel",
    location: "Mumbai",
    feedback: "The seats were extremely comfortable, and the service was excellent. A very smooth journey with friendly staff."
  },
  {
    name: "Rohit Sharma",
    location: "Delhi",
    feedback: "Best travel experience! The bus was on time, and the amenities provided made the journey very relaxing."
  }
];

const Home = () => {
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 2) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 2 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    async function fetchTour() {
      try {
        const { data, error } = await supabase.from('Tours').select('*');
        if (error) throw error;

        const uniqueDistrictsList = data.reduce((acc, item) => {
          if (!acc.some(tour => tour.District === item.District)) acc.push(item);
          return acc;
        }, []);

        setUniqueDistricts(uniqueDistrictsList);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchTour();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="headvideo">
          <video className="video-bg" src={Video} autoPlay muted loop />

          <div className="overlay-text">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, color: "#ffffff" }}
                animate={{ opacity: 1, y: 0, color: ["#ff5733", "#33ff57", "#5733ff", "#ffff33"] }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

\      <div className="Section-2">
        <div className="Section-trip">
          <h2 className="trip">Popular Trips</h2>
          <p className="top">Get started with handpicked top-rated trips.</p>
        </div>
      </div>

\      <div className="district-filter">
        <h1 className="title">Domestic Destinations:</h1>
        <div className="district-grid">
          {uniqueDistricts.map((item, index) => (
            <Link to={`/district/${item.District}`} key={index}>
              <div
                className={`district-item ${selectedDistrict === item.District ? "active" : ""}`}
                onClick={() => setSelectedDistrict(item.District)}
              >
                <img src={item.image} alt={item.District} className="district-image" />
                <div className="district-info">
                  <p className="district-name">{item.District}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="section5">
        <div className="diagonal-section">
          <div className="overlay">
            <div className="content">
              <img
                src="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?fm=jpg&q=60&w=3000"
                alt="Destination"
                className="content-image"
              />
              <div className="text-content">
                <h2 className="Escape">Escape Ordinary, Experience Extraordinary</h2>
                <p className="use">
                  We prioritize ease of use, security, and reliability in all our services. Our user-friendly solutions ensure a seamless experience.
                </p>
                <div className="stats">
                  <div className="icons"><FaHandHoldingDollar /> 100% Money Safe</div>
                  <div className="icons"><FaHandHoldingDollar /> 17+ Years Travel Experience</div>
                  <div className="icons"><FaHandHoldingDollar /> 8,50,203+ Happy Customers</div>
                  <div className="icons"><FaHandHoldingDollar /> 24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
<div className="Section-3">
        
        <div className="testimonial-main">
          <div className="testimonial-text">
            <span style={{ color: "white" }}>CLIENTS</span>
            <span>TESTIMONIALS</span>
          </div>

          <div className="underline">
            <div className="long"></div>
            <div className="short"></div>
          </div>
          <p>There is no better way to gain trust and prove the validity of your brand than customer testimonials.</p>
        </div>

        
        <div className="testimonial-slider">
        <h1 className='people'>WHAT PEOPLE SAYS?</h1>
          <AnimatePresence>
            <motion.div
              key={index}
              className="testimonial-wrapper"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
            >
              {testimonials.slice(index, index + 2).map((testimonial, i) => (
                <div key={i} className="testimonial-card">
                  <h3>{testimonial.name}</h3>
                  <p className="location">{testimonial.location}</p>
                  <p>{testimonial.feedback}</p>
                  <span className="quote">”</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="testimonial-navigation">
          <button onClick={prevTestimonial}><FaChevronLeft /></button>
          <button onClick={nextTestimonial}><FaChevronRight /></button>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
