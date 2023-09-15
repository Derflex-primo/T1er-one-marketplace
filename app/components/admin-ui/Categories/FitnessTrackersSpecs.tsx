import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface FitnessTrackersSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const FitnessTrackersSpecs: React.FC<FitnessTrackersSpecsProps> = ({
  specs,
  onSpecsChange,
}) => {
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    const newSpecs = {
      ...specs,
      [name]: value,
    };

    onSpecsChange(newSpecs);
  };
  const fitnessTrackerSpecifications = [
    "Brand",
    "Model",
    "Display Type",
    "Display Size",
    "Resolution",
    "Touchscreen",
    "Activity Tracking",
    "Heart Rate Monitor",
    "Sleep Tracking",
    "Step Count",
    "Calories Burned",
    "Distance Traveled",
    "GPS",
    "Altimeter",
    "Barometer",
    "Accelerometer",
    "Gyroscope",
    "Pulse Oximeter",
    "ECG Monitoring",
    "Blood Pressure Monitoring",
    "Hydration Tracking",
    "Body Temperature Monitoring",
    "Sweat Resistance",
    "Waterproof Rating",
    "Battery Life",
    "Charging Method",
    "Compatibility with Smartphones",
    "Bluetooth Version",
    "Mobile App Compatibility",
    "Supported Activities",
    "Customizable Watch Faces",
    "Interchangeable Bands",
    "Strap Material",
    "Case Material",
    "Dimensions (L x W x H)",
    "Weight",
    "Notifications",
    "Voice Assistant",
    "Music Playback Control",
    "Mobile Payment Support",
    "App Store Access",
    "Price",
    "Availability",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Color Options",
    "Operating Temperature Range",
    "Water Resistance",
    "Dust Resistance",
    "Fall Detection",
    "Emergency SOS Feature",
    "Fitness Goals Tracking",
    "Multi-Sport Tracking",
    "Breathing Exercises",
    "Stress Tracking",
    "Calorie Intake Tracking",
    "Food Logging",
    "Medication Reminders",
    "Hydration Goals Tracking",
    "Sleep Apnea Detection",
    "UV Radiation Sensor",
    "Sunscreen Reminders",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Fitness Tracker Specifications</h2>
      <div className={containerDisplay}>
        {fitnessTrackerSpecifications.map((spec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{spec}:</label>
            <input
              type="text"
              name={spec}
              value={specs[spec] || ""}
              onChange={handleInputChange}
              className={inputUi}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
