import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../Client";
import "./DistrictPage.css";
import Navbar from "../../Component/Navbar/Navbar";
import { motion } from "framer-motion";
import { slideFromLeft, slideFromRight } from "./animations";
import { useInView } from "react-intersection-observer";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const DistrictPage = () => {
  const { district } = useParams();
  const [districtTours, setDistrictTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDistrictTours() {
      try {
        const { data, error } = await supabase
          .from("Tours")
          .select("*")
          .eq("District", district);

        if (error) throw error;
        setDistrictTours(data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchDistrictTours();
  }, [district]);

  const handleBooking = (tour, placeIndex) => {
    navigate(`/see/${tour.id}/${placeIndex}`, { state: { tour, placeIndex } });
  };

  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.2, 
  });

  const scrollAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <>
      <Navbar />
      <motion.di
        className="district-page"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={scrollAnimation}
        ref={ref}
      >
        <h1>{district} Tours</h1>

        {districtTours.length > 0 ? (
          <div className="district-tours">
            {districtTours.map((tour, index) => (
              <motion.div
                key={index}
                className="tour-card"
                initial="hidden"
                animate="visible"
                variants={
                  index === 0 || index === 2 || index === 3
                    ? slideFromLeft(index * 0.2)
                    : slideFromRight(index * 0.2)
                }
              >
                <div className="para1">
                  <div className="image">
                    <img src={tour.image} alt={tour.Name} className="tour-image" />
                  </div>
                  <div className="tour1">
                    <h1>{tour.Place}</h1>
                    <p>{tour.Description}</p>
                    <h4>Price: <span>₹{tour.OriginalPrice}</span></h4>
                    <h3>Final Price: <span>{tour.Discount}</span></h3>
                    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    </Stack>
                    <button className="Book" onClick={() => handleBooking(tour, 1)}>
  See the Details
</button>
                  </div>
                </div>

                <div className="para2">
                  <div className="tour2">
                    <h1>{tour.Place2}</h1>
                    <p>{tour.Description2}</p>
                    <h4>Price: <span>₹{tour.OrginalPrice2}</span></h4>
                    <h3>Final Price: <span>{tour.Discount2}</span></h3>
                    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    </Stack>
                    <button className="Book" onClick={() => handleBooking(tour, 2)}>
  See the Details
</button>
                  </div>
                  <div className="image">
                    <img src={tour.image2} alt={tour.Name} className="tour-image" />
                  </div>
                </div>

                <div className="para3">
                  <div className="image">
                    <img src={tour.image3} alt={tour.Name} className="tour-image" />
                  </div>
                  <div className="tour3">
                    <h1>{tour.Place3}</h1>
                    <p>{tour.Description3}</p>
                    <h4>Price: <span>₹{tour.OriginalPrice3}</span></h4>
                    <h3>Final Price: <span>{tour.Discount3}</span></h3>
                    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
    </Stack>
                    <button className="Book" onClick={() => handleBooking(tour, 3)}>
  See the Details
</button>
                  </div>
                </div>

                <div className="para4">
                  <div className="tour4">
                    <h1>{tour.Place4}</h1>
                    <p>{tour.Description4}</p>
                    <h4>Price: <span>₹{tour.OriginalPrice4}</span></h4>
                    <h3>Final Price: <span>{tour.Discount4}</span></h3>
                    <Stack spacing={1}>
      <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
    </Stack>
                    <button className="Book" onClick={() => handleBooking(tour, 4)}>
  See the Details
</button>
                  </div>
                  <div className="image">
                    <img src={tour.image4} alt={tour.Name} className="tour-image" />
                  </div>
                </div>

                {tour.Video && (
                  <div className="disvideo">
                    <h1 style={{ color: "red" }}>Tour Video</h1>
                    <video
                      src={tour.Video}
                      autoPlay
                      muted
                      loop
                      className="tour-video"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p>No tours available for this district.</p>
        )}
      </motion.di>
    </>
  );
};

export default DistrictPage;
