import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { supabase } from '../../../Client';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNav from "../AdminNavbar/AdminNav";
import "./Admin.css";

const Admin = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [tourData, setTourData] = useState({
    District: "",
    Place: "",
    OriginalPrice: "",
    Discount: "",
    image: "",
    Description: "",
    Place2: "",
    OrginalPrice2: "",
    Discount2: "",
    image2: "",
    Description2: "",
    Place3: "",
    OriginalPrice3: "",
    Discount3: "",
    image3: "",
    Description3: "",
    Place4: "",
    OriginalPrice4: "",
    Discount4: "",
    image4: "",
    Description4: "",
    Bc: "",
    Start: "",
    End: "",
    Video: "",
    Explore: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase.from("Tours").select("*");
      if (error) throw error;
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error.message);
      toast.error("Failed to fetch tours");
    }
  };

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!tourData.District || !tourData.Place) {
        toast.error("District and Place are required");
        return;
      }

      let response;
      if (selectedTour) {
        response = await supabase.from("Tours").update(tourData).eq("id", selectedTour.id);
      } else {
        response = await supabase.from("Tours").insert([tourData]);
      }

      if (response.error) throw response.error;

      toast.success(`Tour ${selectedTour ? "updated" : "added"} successfully!`);
      setTimeout(() => {
        fetchTours();
        resetForm();
      }, 1000);
    } catch (error) {
      console.error("Error saving tour:", error.message);
      toast.error("Error saving tour details");
    }
  };

  const resetForm = () => {
    setTourData({
      District: "",
      Place: "",
      OriginalPrice: "",
      Discount: "",
      image: "",
      Description: "",
      Place2: "",
      OrginalPrice2: "",
      Discount2: "",
      image2: "",
      Description2: "",
      Place3: "",
      OriginalPrice3: "",
      Discount3: "",
      image3: "",
      Description3: "",
      Place4: "",
      OriginalPrice4: "",
      Discount4: "",
      image4: "",
      Description4: "",
      Bc: "",
      Start: "",
      End: "",
      Video: "",
      Explore: "",
    });
    setSelectedTour(null);
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setTourData(tour);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("Tours").delete().eq("id", id);
      if (error) throw error;

      toast.success("Tour deleted successfully!");
      fetchTours();
    } catch (error) {
      console.error("Error deleting tour:", error.message);
      toast.error("Error deleting tour");
    }
  };

  const districts = [...new Set(tours.map((tour) => tour.District))];

  return (
    <div>
      <AdminNav />
      <h1 className="Manage">Manage Tours</h1>

      <div className="adding">
      <Box className="AddForm" component="form" sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}>
        {Object.keys(tourData).map((field, index) => (
          <TextField key={index} name={field} onChange={handleChange} value={tourData[field]} label={field} variant="filled" />
        ))}
        
      </Box>
      <div style={{ display: "flex", justifyContent: "center" }}>
          <Button className="Addtour" onClick={handleSubmit}>
            {selectedTour ? "Update Tour" : "Add Tour"}
          </Button>
        </div>
        </div>

      <h2 className="all">All States</h2>
      <div className="allname" >
        {districts.map((district, index) => (
          <div key={index} style={{ cursor: "pointer", textAlign: "center" }}>
            <h3 onClick={() => setSelectedDistrict(district)}>{district}</h3>
          </div>
        ))}
      </div>

      {selectedDistrict && (
        <>
          <h2 className="places">Places in {selectedDistrict}</h2>
          <ul>
            {tours
              .filter((tour) => tour.District === selectedDistrict)
              .map((tour) => (
                <li className="adin" key={tour.id} >
                  <div className="adminimg">
                  <div >
                    <p>{tour.Place}</p>
                    <br />
                    <img src={tour.image} alt={tour.Place}  />
                  </div>

                  {tour.Place2 && (
                    <div>
                      <p>{tour.Place2}</p>
                      <br />
                      <img src={tour.image2} alt={tour.Place2}  />
                    </div>
                  )}

                  {tour.Place3 && (
                    <div>
                      <p>{tour.Place3}</p>
                      <br />
                      <img src={tour.image3} alt={tour.Place3}  />
                    </div>
                  )}

                  {tour.Place4 && (
                    <div>
                      <p>{tour.Place4}</p>
                      <br />
                      <img src={tour.image4} alt={tour.Place4} />
                    </div>
                  )}
</div>
<div className="up">
                  <Button className="Edit" onClick={() => handleEdit(tour)}>Edit</Button>
                  <Button className="Delete" color="error" onClick={() => handleDelete(tour.id)} style={{ marginLeft: "10px" }}>
                    Delete
                  </Button>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default Admin;
