import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const CarTechSpecs = () => {
  const carTechSpecifications = [
    "Brand",
    "Model",
    "Year",
    "Engine Type",
    "Horsepower",
    "Torque",
    "Transmission Type",
    "Drive Type (FWD, RWD, AWD)",
    "Fuel Type",
    "Fuel Efficiency (City/Highway)",
    "Mileage",
    "0-60 MPH Time",
    "Top Speed",
    "Tire Size",
    "Wheelbase",
    "Dimensions (Length, Width, Height)",
    "Curb Weight",
    "Seating Capacity",
    "Cargo Capacity",
    "Safety Features",
    "Infotainment System",
    "Touchscreen Display Size",
    "Navigation System",
    "Audio System",
    "Bluetooth Connectivity",
    "Smartphone Integration (Apple CarPlay, Android Auto)",
    "Camera System (Rearview, 360-Degree, etc.)",
    "Parking Assistance (Park Assist, Sensors, etc.)",
    "Driver Assistance Features (Adaptive Cruise Control, Lane Keeping, etc.)",
    "Keyless Entry and Ignition",
    "Sunroof/Moonroof",
    "Interior Material and Trim",
    "Number of Doors",
    "Number of Airbags",
    "Fuel Tank Capacity",
    "Towing Capacity (if applicable)",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Color Options (if available)",
    "Price",
    "Availability",
    "Additional Features",
    "Product Condition",
    "Brand New (Yes/No)",
    "Horsepower (HP)",
    "Torque (lb-ft)",
    "Fuel Efficiency (MPG)",
    "Curb Weight (lbs)",
    "Acceleration (0-60 MPH)",
    "Maximum Speed (MPH)",
    "Cargo Space (cubic feet)",
    "Dimensions (inches)",
    "Seating Material",
    "Airbag Count",
    "Fuel Tank Capacity (gallons)",
    "Towing Capacity (lbs)",
    "Manufacturer Warranty (years)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Car Tech Specifications</h2>
      <div className={containerDisplay}>
        {carTechSpecifications.map((spec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{spec}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};

 