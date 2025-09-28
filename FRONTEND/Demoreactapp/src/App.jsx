import { useState, useEffect } from "react";
import config from "./Config";
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
  const [editId, setEditId] = useState(null);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  // fetch all vehicles
  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/vehicles`);
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // add or update vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleToSend = {
      ...vehicle,
      modelYear: Number(vehicle.modelYear),
      price: Number(vehicle.price),
    };

    try {
      if (editId) {
        await fetch(`${config.API_URL}/api/vehicles/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicleToSend),
        });
      } else {
        await fetch(`${config.API_URL}/api/vehicles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vehicleToSend),
        });
      }

      setVehicle({ name: "", brand: "", modelYear: "", price: "", type: "" });
      setEditId(null);
      fetchVehicles();
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  // delete vehicle
  const handleDelete = async (id) => {
    try {
      await fetch(`${config.API_URL}/api/vehicles/${id}`, {
        method: "DELETE",
      });
      fetchVehicles();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // edit vehicle
  const handleEdit = (v) => {
    setVehicle({
      name: v.name,
      brand: v.brand,
      modelYear: v.modelYear,
      price: v.price,
      type: v.type,
    });
    setEditId(v.id);
  };

  return (
    <div className="container">
      <h1 className="heading">Vehicle Management</h1>

      {/* form */}
      <form onSubmit={handleSubmit} className="form">
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

        <button type="submit">
          {editId ? "Update Vehicle" : "Add Vehicle"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setVehicle({
                name: "",
                brand: "",
                modelYear: "",
                price: "",
                type: "",
              });
              setEditId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* vehicle table */}
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
                  <button className="edit-btn" onClick={() => handleEdit(v)}>
                    Edit
                  </button>
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
