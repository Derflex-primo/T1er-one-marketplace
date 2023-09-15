import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface CameraSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

export const CameraSpecs: React.FC<CameraSpecsProps> = ({
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
  const fields = [
    "Product Condition",
    "Brand New (Yes/No)",
    "Camera Model",
    "Camera Kit",
    "Lens Mount",
    "Image Sensor",
    "NFC Enabled",
    "Sensor Type",
    "Image Sensor Format",
    "Sensor Crop Factor",
    "Effective Megapixels",
    "Bluetooth",
    "Total Pixels",
    "Colour Filter System",
    "Colour Space",
    "Low Pass Filter",
    "Dust Reduction",
    "Processor",
    "Viewfinder",
    "Viewfinder Type",
    "Percentage Coverage",
    "Effective Magnification",
    "Diopter Adjustment",
    "Depth of Field Preview",
    "LCD Size",
    "LCD Resolution",
    "Swivel LCD",
    "Live Preview",
    "AF Type",
    "Focusing Modes",
    "AF Points",
    "AF Point Selection",
    "AF Assist Beam",
    "ISO",
    "White Balance Settings 1",
    "Auto White Balance",
    "White Balance Bracketing",
    "Exposure Compensation",
    "Shutter Type",
    "Shutter Speeds",
    "Shutter Lag",
    "Self-Timer",
    "Drive Modes",
    "Max Burst Jpeg",
    "Max Burst Raw",
    "Max Burst Raw+JPEG",
    "Model number",
    "Built-in Flash Type",
    "Recycling Time",
    "Flash Metering System",
    "Flash Sync",
    "Flash Guide Number",
    "Video Output Format",
    "Video Modes",
    "Movie File Formats",
    "Movie Video Compression",
    "Movie Audio Compression",
    "Max Video Resolution",
    "Image Playback Modes 1",
    "Card Slot",
    "Storage Media",
    "Data Interface",
    "Video Interface",
    "Wi-Fi",
    "NFC",
    "Bluetooth",
    "Jpeg",
    "Raw",
    "Raw+Jpeg",
    "Guided Shooting Mode",
    "Languages Supported",
    "Compatible Operating Systems",
    "Lens Frame Colour",
    "Lens Range",
    "Stabilized",
    "Model Number",
    "Filter Size",
    "Lens Weight",
    "Stabilized Body",
    "Body Colour",
    "Intelligent Shoe",
    "Cable Release",
    "Weather Sealed",
    "Battery Type",
    "Included Battery Model",
    "Power Saving Modes",
    "Width",
    "Height",
    "Depth",
    "Weight",
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Camera Specifications</h2>
      <div className={containerDisplay}>
        {fields.map((field, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{field}:</label>
            <input
              type="text"
              name={field}
              value={specs[field] || ""}
              onChange={handleInputChange}
              className={inputUi}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
