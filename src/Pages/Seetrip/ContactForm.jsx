import  { useState } from "react";
import emailjs from "@emailjs/browser"; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    from_phonenumber: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.from_name || !formData.from_email || !formData.from_phonenumber || !formData.message) {
      alert("All fields are required!");
      setLoading(false);
      return;
    }

    console.log("Form Data Submitted:", formData);

    const serviceID = "service_ruvh3z8"; 
    const templateID = "template_egqqinc"; 
    const publicKey = "UBx611kqITzUT60Up"; 

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        alert("Message sent successfully!");
        console.log("EmailJS Response:", response);

        setFormData({
          from_name: "",
          from_email: "",
          from_phonenumber: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send message!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="form">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="from_name"
          value={formData.from_name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <br />
        <input
          type="email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="tel"
          name="from_phonenumber"
          value={formData.from_phonenumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <br />
       
       
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
