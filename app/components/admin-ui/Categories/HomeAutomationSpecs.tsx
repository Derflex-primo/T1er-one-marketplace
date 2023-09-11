import React from "react";
import { containerDisplay } from "../SpecsCategories";
import { inputUi } from "../AddProducts";

export const HomeAutomationSpecs = () => {
  const homeAutomationSpecifications = [
    "Brand",
    "Model",
    "Compatible Ecosystems (e.g., Amazon Alexa, Apple HomeKit)",
    "Connectivity (Wi-Fi, Bluetooth, Zigbee, Z-Wave, etc.)",
    "Voice Control (Yes/No)",
    "Mobile App Control (Yes/No)",
    "Smart Hub Required (Yes/No)",
    "Number of Supported Devices",
    "Supported Device Types (Lights, Thermostats, Locks, Cameras, etc.)",
    "Automation Routines (Scheduled Events, Geofencing, etc.)",
    "Voice Assistant Integration (e.g., Alexa Skills, Google Actions)",
    "Energy Monitoring (Yes/No)",
    "Security Features (e.g., Intrusion Detection, Video Surveillance)",
    "Remote Access (Yes/No)",
    "Notifications (Alerts, Push Notifications, Email)",
    "Installation Type (DIY, Professional)",
    "Power Source (Battery, Wired)",
    "Dimensions (Length, Width, Height)",
    "Weight",
    "Color Options (if available)",
    "Price Range",
    "Warranty Information",
    "Manufacturer Website",
    "User Manual",
    "Supported Operating Systems (iOS, Android)",
    "Compatibility with Other Smart Devices (e.g., Smart Locks, Smart Thermostats)",
    "HomeKit Support (Yes/No)",
    "Google Home Support (Yes/No)",
    "Amazon Alexa Support (Yes/No)",
    "IFTTT Integration (Yes/No)",
    "Third-Party App Support (Yes/No)",
    "Security Protocols (e.g., WPA2, AES Encryption)",
    "Data Privacy and Protection Features",
    "Installation Difficulty (Easy, Moderate, Complex)",
    "Product Condition",
    "Brand New (Yes/No)",
    "Wi-Fi Compatibility (2.4GHz, 5GHz)",
    "Mobile App Compatibility",
    "Voice Assistant Compatibility",
    "Dimensions (inches)",
    "Manufacturer Warranty (years)",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Home Automation Specifications</h2>
      <div className={containerDisplay}>
        {homeAutomationSpecifications.map((spec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{spec}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};
