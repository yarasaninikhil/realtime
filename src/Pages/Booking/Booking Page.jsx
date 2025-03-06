import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../Client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./BookingPage.css";
import Footer from "../../Component/Footer/Footer";
import Navbar from "../../Component/Navbar/Navbar";

const BookingPage = () => {
  const { tourId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tour, setTour] = useState(location.state?.tour || null);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", phone: "", date: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const pdfRef = useRef();

  useEffect(() => {
    async function fetchTourDetails() {
      if (!tour) {
        try {
          const { data, error } = await supabase
            .from("Tours")
            .select("*")
            .eq("id", tourId)
            .single();
          if (error) throw error;
          setTour(data);
        } catch (err) {
          console.error("Error fetching tour:", err.message);
        }
      }
    }
    fetchTourDetails();
  }, [tourId, tour]);

  if (!tour) return <p>Loading tour details...</p>;

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.date) {
      setErrorMessage("Please fill in all the details before confirming your booking.");
      return;
    }
    setErrorMessage("");

    try {
      const { data, error } = await supabase.from("Bookings").insert([
        {
          username: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          place: tour.Place,
          date: userDetails.date,
          status: "Confirmed",
        },
      ]);

      if (error) {
        console.error("Error inserting booking:", error.message);
        return;
      }

      setIsConfirmed(true);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Booking_Confirmation_${userDetails.name}.pdf`);
    });
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        {isConfirmed ? (
          <div className="confirmation-container" ref={pdfRef}>
            <h2>Booking Confirmed!</h2>
            <p>Thank you, {userDetails.name}. Your trip to {tour.Place} has been successfully booked.</p>
            <p>A confirmation email has been sent to {userDetails.email}.</p>
            <h3>Booking Details</h3>
            <p><strong>Visiting Place:</strong> {tour.Place}</p>
            <p><strong>Price:</strong> ₹{tour.Discount}</p>
            <p><strong>Start Point:</strong> {tour.Start}</p>
            <p><strong>End Point:</strong> {tour.End}</p>
            <p><strong>Date:</strong> {userDetails.date}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <button className="download-pdf" onClick={generatePDF}>Download PDF</button>
            <button onClick={() => navigate("/Home")}>Go Home</button>
          </div>
        ) : (
          <>
            <h2 className="con">Confirm Your Booking</h2>
            <div className="tourid">
              <div className="tour-details">
                <h3><strong>Visiting Place:</strong> {tour.Place}</h3>
                <p><strong>Price:</strong> ₹{tour.Discount}</p>
                <p><strong>Duration:</strong> 3 to 4 Days</p>
                <p><strong>Start Point:</strong> {tour.Start}</p>
                <p><strong>End Point:</strong> {tour.End}</p>
              </div>
              <div className="user-info">
                <h3>Enter Your Details</h3>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={userDetails.name} 
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={userDetails.email} 
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} 
                />
                <input 
                  type="date" 
                  value={userDetails.date} 
                  onChange={(e) => setUserDetails({ ...userDetails, date: e.target.value })} 
                />
                
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={userDetails.phone} 
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} 
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>

            </div>
            <div className="payment">
              <h3>Payment Details</h3>
              <p>Card Number: 4242 4242 4242 4242</p>
              <p>Expiry Date: 12/26</p>
              <p>CVV: 123</p>
              <button className="pay-button" onClick={handlePayment}>Pay ₹{tour.Discount}</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
