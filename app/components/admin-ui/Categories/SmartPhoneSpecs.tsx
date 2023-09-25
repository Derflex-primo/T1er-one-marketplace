import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";
import { ItemSpecsRefProps, SpecsProps } from "@/types";

export interface SmartphoneSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: SpecsProps) => void;
}
export const SmartphoneSpecs: React.FC<SmartphoneSpecsProps> = ({
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

  const smartphoneSpecs = [
    "Product Condition",
    "Brand New (Yes/No)",
    "Brand",
    "Model",
    "Operating System",
    "Processor",
    "Number of Cores",
    "RAM",
    "Internal Storage",
    "Expandable Storage (Yes/No)",
    "Screen Size",
    "Screen Resolution",
    "Screen Type",
    "Refresh Rate",
    "Rear Camera Megapixels",
    "Front Camera Megapixels",
    "Battery Capacity",
    "Fast Charging (Yes/No)",
    "Wireless Charging (Yes/No)",
    "Face Unlock (Yes/No)",
    "Fingerprint Sensor (Yes/No)",
    "Dual SIM (Yes/No)",
    "5G Compatible (Yes/No)",
    "Bluetooth Version",
    "Wi-Fi Version",
    "GPS (Yes/No)",
    "NFC (Yes/No)",
    "Audio Jack (Yes/No)",
    "Infrared (Yes/No)",
    "USB Type",
    "Weight",
    "Dimensions",
    "Water Resistant (Yes/No)",
    "Warranty",
    "Release Date",
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Smartphone Specifications</h2>
      <div className={containerDisplay}>
        {smartphoneSpecs.map((spec, index) => (
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
