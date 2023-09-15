import { inputUi } from "../AddProducts";
import { containerDisplay } from "../SpecsCategories";
import { ItemSpecsRefProps, Specs } from "@/types";

export interface CameraLensSpecsProps extends ItemSpecsRefProps {
  onSpecsChange: (newSpecs: Specs) => void;
}

const lensSpecLabels = [
  "Product condition",
  "Brand New (Yes/No)",
  "Lens Type",
  "Lens Mount",
  "Zoom Focal Length",
  "Apparent Focal Length with APS-C/DX Sensor",
  "Horizontal Angle of View with 35 mm Sensor",
  "Horizontal Angle of View with APS-C/DX Sensor",
  "Maximum Aperture",
  "Minimum Aperture",
  "Closest Focusing Distance",
  "Maximum Magnification",
  "Macro (Yes/No)",
  "Focus Adjustment",
  "Focusing Motor",
  "Manual Focusing (Yes/No)",
  "Construction (Elements/Groups)",
  "Zoom System",
  "Diaphragm Blades",
  "Stabilization (Yes/No)",
  "Colour",
  "Body Construction",
  "Mount Construction",
  "Filter Attachment Type",
  "Filter Size",
  "Maximum Diameter",
  "Maximum Length",
  "Weight",
  "Compatible Brand",
  "Manufacturer's Warranty - Parts",
  "Manufacturer's Warranty - Labour",
];

export const CameraLensSpecs: React.FC<CameraLensSpecsProps> = ({
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
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4 ">Camera Lens Specifications</h2>
      <div className={containerDisplay}>
        {lensSpecLabels.map((labelText) => (
          <div className="flex flex-col mb-4" key={labelText}>
            <label>{labelText}:</label>
            <input
              type="text"
              name={labelText}
              value={specs[labelText] || ""}
              onChange={handleInputChange}
              className={inputUi}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
