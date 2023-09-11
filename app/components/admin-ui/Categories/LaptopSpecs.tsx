import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";

export const LaptopSpecs = () => {
  const laptopSpecs = [
    "Product Condition",
    "Brand New (Yes/No)",
    "Model Number",
    "Series",
    "Form Factor",
    "Operating System",
    "CPU Brand",
    "CPU Model",
    "CPU Frequency",
    "Number of Cores",
    "RAM Size",
    "RAM Type",
    "RAM Speed",
    "Storage Type",
    "Storage Size",
    "Screen Size",
    "Screen Resolution",
    "Screen Type",
    "Refresh Rate",
    "Graphics Card Brand",
    "Graphics Card Model",
    "VRAM Size",
    "Battery Type",
    "Battery Life",
    "Power Supply Wattage",
    "Charging Port Type",
    "Keyboard Type",
    "Backlit Keyboard",
    "Webcam",
    "Speaker Configuration",
    "Audio Jack",
    "Wi-Fi",
    "Bluetooth",
    "Ethernet",
    "USB Ports",
    "HDMI Ports",
    "Other Ports",
    "Optical Drive",
    "Card Reader",
    "Fingerprint Sensor",
    "Facial Recognition",
    "Cooling System",
    "Fan Count",
    "Build Material",
    "Color",
    "Dimensions",
    "Weight",
    "Included Accessories",
    "Warranty",
    "Price",
    "Release Date",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4 ">Laptop Specifications</h2>
      <div className={containerDisplay}>
        {laptopSpecs.sort().map((laptopSpec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{laptopSpec}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};