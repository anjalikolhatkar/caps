import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LibraryServiceForm = ({ onSubmit }) => {
  const [pairs, setPairs] = useState([{ service: "", clothingType: "" }]);
  const [roomNumber, setRoomNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [block, setBlock] = useState("");
  const [errors, setErrors] = useState({});

  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...pairs];
    updatedPairs[index][field] = value;
    setPairs(updatedPairs);
  };

  const addPair = () => setPairs([...pairs, { service: "", clothingType: "" }]);

  const removePair = (index) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter((_, i) => i !== index));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!roomNumber) newErrors.roomNumber = "Room number is required.";
    if (!phoneNumber || !/^\d+$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number must be numeric.";
    if (!hostelType) newErrors.hostelType = "Please select a hostel type.";
    if (!block) newErrors.block = "Please select a block.";
    if (pairs.some((pair) => !pair.service || !pair.clothingType))
      newErrors.pairs = "Each pair must include a service and clothing type.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form!");
    } else {
      setErrors({});
      onSubmit({ roomNumber, phoneNumber, hostelType, block, pairs });
      toast.success("Your order has been successfully placed!");
      // Reset the form
      setRoomNumber("");
      setPhoneNumber("");
      setHostelType("");
      setBlock("");
      setPairs([{ service: "", clothingType: "" }]);
    }
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      marginBottom: "25px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "rgba(207, 217, 252, 1)",
      color: "#333",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "rgba(207, 217, 252, 1)",
      color: "#333",
    },
    button: {
      display: "inline-block",
      padding: "10px 20px",
      borderRadius: "4px",
      backgroundColor: "rgba(48, 51, 105, 1)",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
      marginLeft: "350px",
      width: "200px",
    },
    removeButton: {
      backgroundColor: "#dc3545",
      marginLeft: "10px",
    },
    error: {
      color: "red",
      fontSize: "12px",
      marginTop: "5px",
    },
    pairRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    clothingTypeSelect: {
      marginLeft: "10px", // Added margin to create gap between service and clothing type select
    },
  };

  return (
    <div id="library-service-form" className="py-20">
    <form onSubmit={handleSubmit} style={styles.container}>
      <h1 style={styles.heading}>Library Service Form</h1>
      <div style={styles.formGroup}>
        <label htmlFor="roomNumber" style={styles.label}>Room Number:</label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          style={styles.input}
        />
        {errors.roomNumber && <p style={styles.error}>{errors.roomNumber}</p>}
      </div>

      {/* Phone Number */}
      <div style={styles.formGroup}>
        <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
        />
        {errors.phoneNumber && <p style={styles.error}>{errors.phoneNumber}</p>}
      </div>

      {/* Hostel Type */}
      <div style={styles.formGroup}>
        <label htmlFor="hostelType" style={styles.label}>Hostel Type:</label>
        <select
          id="hostelType"
          value={hostelType}
          onChange={(e) => setHostelType(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Hostel Type</option>
          <option value="Girls Hostel">Girls Hostel</option>
          <option value="Boys Hostel">Boys Hostel</option>
        </select>
        {errors.hostelType && <p style={styles.error}>{errors.hostelType}</p>}
      </div>

      {/* Block */}
      {hostelType && (
        <div style={styles.formGroup}>
          <label htmlFor="block" style={styles.label}>Block:</label>
          <select
            id="block"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Block</option>
            {hostelType === "Girls Hostel" && (
              <>
                <option value="Block 1">Block 1</option>
                <option value="Block 2">Block 2</option>
              </>
            )}
            {hostelType === "Boys Hostel" && (
              <>
                <option value="Block 1">Block 1</option>
                <option value="Block 2">Block 2</option>
                <option value="Block 3">Block 3</option>
              </>
            )}
          </select>
          {errors.block && <p style={styles.error}>{errors.block}</p>}
        </div>
      )}

      {/* Service-Clothing Pairs */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Service and Clothing Type:</label>
        {pairs.map((pair, index) => (
          <div key={index} style={styles.pairRow}>
            <select
              value={pair.service}
              onChange={(e) => handlePairChange(index, "service", e.target.value)}
              style={styles.select}
            >
              <option value="">Select Service</option>
              <option value="Iron">Iron</option>
              <option value="Wash">Wash</option>
              <option value="Dry Clean">Dry Clean</option>
            </select>
            <select
              value={pair.clothingType}
              onChange={(e) => handlePairChange(index, "clothingType", e.target.value)}
              style={{ ...styles.select, ...styles.clothingTypeSelect }}
            >
              <option value="">Select Clothing Type</option>
              <option value="Shirt">Shirt</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jeans">Jeans</option>
            <option value="Coat">Coat</option>
            <option value="Suit">Suit</option>
            <option value="Shorts">Shorts</option>
            <option value="Blazer">Blazer</option>

            <option value="Dress">Dress</option>
            <option value="Skirt">Skirt</option>
            <option value="Blouse">Blouse</option>
            <option value="Kurta">Kurta</option>
            <option value="Saree">Saree</option>
            <option value="Leggings">Leggings</option>
            <option value="Palazzo">Palazzo</option>
            <option value="Jumpsuit">Jumpsuit</option>

            
            <option value="Jacket">Jacket</option>
            <option value="Sweater">Sweater</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Tracksuit">Tracksuit</option>

          
            <option value="Bedsheet">Bedsheet</option>
            <option value="Blanket">Blanket</option>
            <option value="Pillow Cover">Pillow Cover</option>
            <option value="Curtains">Curtains</option>
            <option value="Cushion Cover">Cushion Cover</option>
            </select>
            {pairs.length > 1 && (
              <button
                type="button"
                onClick={() => removePair(index)}
                style={{ ...styles.button, ...styles.removeButton }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addPair} style={styles.button}>
          Add More
        </button>
        {errors.pairs && <p style={styles.error}>{errors.pairs}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" style={styles.button}>
        Submit
      </button>
      <ToastContainer />
    </form>
    </div>
  );
};

export default LibraryServiceForm;