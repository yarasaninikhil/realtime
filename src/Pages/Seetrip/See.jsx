import  { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../Client";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";
import ContactForm from "./ContactForm";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./see.css";

const SeePage = () => {
  const { tourId, placeIndex } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tour, setTour] = useState(location.state?.tour || null);
  const [openDay, setOpenDay] = useState("Day1");

  useEffect(() => {
    async function fetchTourDetails() {
      if (!location.state?.tour) {
        try {
          const { data, error } = await supabase
            .from("Tours")
            .select("*")
            .eq("id", tourId)
            .single();

          if (error) throw error;
          
          console.log("Fetched Tour Data:", data); 
          setTour(data);
        } catch (err) {
          console.error("Error fetching tour:", err.message);
        }
      }
    }
    fetchTourDetails();
  }, [tourId, location.state]);

  if (!tour) {
    return <p>Loading...</p>;
  }

 
  console.log("Tour Background Image URL:", tour.Bc);

  const placeData = [
    { name: tour.Place, desc: tour.Description, img: tour.image, price: tour.OriginalPrice, discount: tour.Discount },
    { name: tour.Place2, desc: tour.Description2, img: tour.image2, price: tour.OrginalPrice2, discount: tour.Discount2 },
    { name: tour.Place3, desc: tour.Description3, img: tour.image3, price: tour.OriginalPrice3, discount: tour.Discount3 },
    { name: tour.Place4, desc: tour.Description4, img: tour.image4, price: tour.OriginalPrice4, discount: tour.Discount4 },
  ];

  const selectedPlace = placeData[placeIndex - 1] || placeData[0];

  const handleClick = (day) => {
    setOpenDay(day);
  };

  const handleBookNow = () => {
    navigate(`/booking/${tourId}`);
  };

  return (
    <>
      <Navbar />
      <div className="see">
        <div
          className="see-page"
          style={{ backgroundImage: `url(${tour.Bc})` }} 
        >
          <h2 className="explore-heading">Explore With YNA Tours & Travels</h2>
        </div>

        <div className="Explore">
          <div className="Exploretext">
            <h1>{selectedPlace.name}</h1>
            <h4>From ₹{selectedPlace.price}</h4>
            <h3>Final Price: ₹{selectedPlace.discount}</h3>
            <button onClick={handleBookNow}>BOOK NOW</button>
          </div>
          <div className="Exploreimg">
            <img src={selectedPlace.img} alt={selectedPlace.name} />
          </div>
        </div>

        <div className="see-details">
          <h2>{tour.title}</h2>
          <p>{tour.description}</p>
          <p><span>Duration:</span> 3 to 4 days</p>
          <p><span>Trip Location:</span> {selectedPlace.name}</p>
          <p><span>Start Point:</span>{tour.Start}</p>
          <p><span>End Point:</span>{tour.End}</p>
          <p><span>Accommodation:</span> Hotel, Resort</p>
          <p><span>Things To Do:</span> Adventure Tours, Sightseeing, Culinary Experiences</p>
        </div>
    <div className="aboutpackge">
          <p className="pack">About The Package:</p>
          <p>{tour.Description}</p>
        </div>
        <div className="Inclucion">
          <h2 className="nam">Inclusions:</h2>
          <div className="corr">
            <div className="Corect1">
              <div className="icon"><FaCheck color="green" size={24} /><p>Assistance on Arrival</p></div>
              <div className="icon"><FaCheck color="green" size={24} /><p>04 Times Breakfast in Hotels</p></div>
              <div className="icon"><FaCheck color="green" size={24} /><p>Complimentary Wi-Fi in Hotels</p></div>
              <div className="icon"><FaCheck color="green" size={24} /><p>All Hotel Taxes</p></div>
            </div>
            <div className="Corect2">
              <div className="icon"><FaCheck color="green" size={24} /><p>04 Nights Stay in Hotels</p></div>
              <div className="icon"><FaCheck color="green" size={24} /><p>04 Times Dinner in Hotel</p></div>
              <div className="icon"><FaCheck color="green" size={24} /><p>All state taxes, toll, parking, fuel charges and driver allowance</p></div>
              <div className="icon"><FaCheck color="green" size={24} /><p>All transfers and sightseeing by AC Vehicle</p></div>
            </div>
          </div>
        </div>

        <div className="Exclusion">
          <h2 className="nam">Exclusions:</h2>
          <div className="incorr">
            <div className="incorect1">
              <div className="icon"><FaTimes color="red" /><p>Any flight or train ticket</p></div>
              <div className="icon"><FaTimes color="red" /><p>Any Entry fee</p></div>
              <div className="icon"><FaTimes color="red" /><p>Expense of Personal Nature</p></div>
              <div className="icon"><FaTimes color="red" /><p>Tipping to Driver/ Guide/ Waiter</p></div>
              <div className="icon"><FaTimes color="red" /><p>GST 5%</p></div>
            </div>
            <div className="incorect2">
              <div className="icon"><FaTimes color="red" /><p>Any Guide Fee</p></div>
              <div className="icon"><FaTimes color="red" /><p>Room Heater Charges</p></div>
              <div className="icon"><FaTimes color="red" /><p>Any changes you may choose to make during your tour</p></div>
              <div className="icon"><FaTimes color="red" /><p>Additional costs due to flight cancellation, road blocks etc</p></div>
            </div>
          </div>
          </div>

        <div className="Itinerary">
          <div className="but">
            {["Day1", "Day2", "Day3", "Day4"].map((day) => (
              <button key={day} className={openDay === day ? "active" : ""} onClick={() => handleClick(day)}>
                {day}
              </button>
            ))}
          </div>
        {openDay === 'Day1' && (
            <div className="day">
              <h1>Arrival to Shoranur & Transfer to Munnar Via Athirapally</h1>
              <p>Arrive at Shoranur Junction at 3:40 AM (no bathing only freshup facility will be provided) and begin your journey to Athirapally, known as the “Niagara of India.” Along the way, visit:</p>
              <ul>
                <li>Cheeyapara</li>
                <li>Valara Waterfalls</li>
                <li>Experience Zipline (Own cost)</li>
              </ul>
              <p>The natural beauty of these waterfalls will leave you awestruck. Afterward, continue your drive to Munnar, arriving by evening for an overnight stay, ready to explore more the next day.</p>
            </div>
          )}

{openDay === 'Day2' && (
   <div className="day">            <h1>Explore Tour</h1>
            <p>Explore tour and visit the Place</p>
            <p>Blossom Park for breathtaking views.</p>
            <p>After a full day of sightseeing, return to your hotel in Munnar for the night and enjoy the cool mountain air.</p>
          </div>
        )}
        {openDay === 'Day3' && (
          <div className="day">
            <h1>Day 3 Visiting</h1>

            <p>Start by 8am (90 KMS – 3 HRS JOURNEY) After breakfast , home to the famous </p>
            <li>Periyar Wildlife Sanctuary</li>
            <p> Enjoy a jeep YNA to spot wildlife and attend cultural performances like</p>
            <li>Kathakali and martial arts</li>

            <p> The cultural shows will give you a unique insight into Kerala’s traditions. End the day with an overnight stay in Thekkady, ready for more adventure tomorrow.</p>
          </div>
        )}
        {openDay === 'Day4' && (
   <div className="day">            <h1>Return to home</h1>

            <p>Start by 9am (100 KMS – 3 HRS) Head to Alleppey for a serene </p>
            <li>Bike ride and Car ride</li>
            <p> through the backwaters. The peaceful ride will be a perfect way to end your Kerala tour. After lunch, return to Shoranur Railway Station for your onward journey, with the train departing at 1:00AM . Reflect on your memorable trip as you travel back home.  </p>
          </div>
        )}


     
      </div>

        <div className="mapfrom">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SeePage;