import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [vehicle, setVehicle] = useState({
    name: "",
    brand: "",
    modelYear: "",
    price: "",
    type: "",
  });

  const [vehicles, setVehicles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:1880/api/vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleToSend = {
      ...vehicle,
      modelYear: Number(vehicle.modelYear), // send as number
      price: Number(vehicle.price),         // send as number
    };

    console.log("Sending vehicle:", vehicleToSend);

    try {
      const response = await fetch("http://localhost:1880/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleToSend),
      });

      if (!response.ok) throw new Error("Failed to add vehicle");

      setVehicle({ name: "", brand: "", modelYear: "", price: "", type: "" });
      fetchVehicles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1880/api/vehicles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete vehicle");

      fetchVehicles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Vehicle Management</h1>

      <form onSubmit={handleSubmit}>
        <label>Vehicle Name</label>
        <input
          type="text"
          name="name"
          value={vehicle.name}
          onChange={handleChange}
          required
        />

        <label>Vehicle Brand</label>
        <input
          type="text"
          name="brand"
          value={vehicle.brand}
          onChange={handleChange}
          required
        />

        <label>Model Year</label>
        <input
          type="number"
          name="modelYear"
          value={vehicle.modelYear}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={vehicle.price}
          onChange={handleChange}
          required
        />

        <label>Type of Vehicle</label>
        <select
          name="type"
          value={vehicle.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Truck">Truck</option>
          <option value="Bus">Bus</option>
        </select>

        <button type="submit">Add Vehicle</button>
      </form>

      <h2 className="heading">All Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Model Year</th>
              <th>Price</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.brand}</td>
                <td>{v.modelYear}</td>
                <td>{v.price}</td>
                <td>{v.type}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(v.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
