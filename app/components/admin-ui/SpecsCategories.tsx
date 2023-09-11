import { AccessoriesSpecs } from "./Categories/AccessoriesSpecs";
import { CameraLensSpecs } from "./Categories/CameraLensSpecs";
import { CameraSpecs } from "./Categories/CameraSpecs";
import { CarTechSpecs } from "./Categories/CarTechSpecs";
import { ChipsSpecs } from "./Categories/ChipsSpecs";
import { CordsSpecs } from "./Categories/CordsSpecs";
import { DIYElectronicsSpecs } from "./Categories/DIYElectronicsSpecs";
import { DefaultSpecs } from "./Categories/DefaultSpecs";
import { DesktopSpecs } from "./Categories/DesktopSpecs";
import { DronesSpecs } from "./Categories/DronesSpecs";
import { EReadersSpecs } from "./Categories/EReadersSpecs";
import { ExternalHardDriveSpecs } from "./Categories/ExternalHardDriveSpecs";
import { FitnessTrackersSpecs } from "./Categories/FitnessTrackersSpecs";
import { GamingAccessoriesSpecs } from "./Categories/GamingAccessoriesSpecs";
import { GamingConsoleSpecs } from "./Categories/GamingConsoleSpecs";
import { HomeAutomationSpecs } from "./Categories/HomeAutomationSpecs";
import { LaptopSpecs } from "./Categories/LaptopSpecs";
import { MemoryCardSpecs } from "./Categories/MemoryCardSpecs";
import { MicrophoneSpecs } from "./Categories/MicrophoneSpecs";
import { ModemSpecs } from "./Categories/ModemSpecs";
import { MonitorSpecs } from "./Categories/MonitorSpecs";
import { NetworkSwitchSpecs } from "./Categories/NetworkSwitchSpecs";
import { PrinterSpecs } from "./Categories/PrinterSpecs";
import { ProjectorsSpecs } from "./Categories/ProjectorsSpecs";
import { RouterSpecs } from "./Categories/RouterSpecs";
import { ScannerSpecs } from "./Categories/ScannerSpecs";
import { ServerEquipmentSpecs } from "./Categories/ServerEquipmentSpecs";
import { SmartphoneSpecs } from "./Categories/SmartPhoneSpecs";
import { SmartwatchesSpecs } from "./Categories/SmartwatchesSpecs";
import { SoftwareSpecs } from "./Categories/SoftwareSpecs";
import { TabletSpecs } from "./Categories/TabletSpecs";
import { TelevisionsSpecs } from "./Categories/TelevisionsSpecs";
import { VirtualRealitySpecs } from "./Categories/VirtualRealitySpecs";
import { WiredHeadphonesSpecs } from "./Categories/WiredHeadphonesSpecs";
import { WirelessHeadphonesSpecs } from "./Categories/WirelessHeadphonesSpecs";

export type CategoryType = "smartPhones" | "laptops" | "cameras" | "camera-lens" | "wired-headphones" | "wireless-headphones" | "cords" | "accessories" | "microphone" | "chips" | "desktop" | "tablet" | "monitor" | "external-hard-drives" | "memory-cards" | "routers" | "modems" | "network-switches" | "printer" | "scanner" | "gaming-consoles" | "gaming-accessories" | "software" | "office-furniture" | "server-equipment" | "diy-electronics" | "drones" | "virtual-reality" | "smartwatches" | "fitness-trackers" | "e-readers" | "projectors" | "televisions" | "car-tech" | "home-automation";

interface SpecsCategoriesProps {
  category: CategoryType;
}

export const containerDisplay = "text-xs font-semibold text-stone-500 grid grid-cols-1 md:grid-cols-4 gap-2"

const SpecsCategories: React.FC<SpecsCategoriesProps> = ({ category }) => {
  switch (category) {
    case 'cameras':
      return <CameraSpecs />;
    case 'camera-lens':
      return <CameraLensSpecs />;
    case 'laptops':
      return <LaptopSpecs />;
    case 'smartPhones':
      return <SmartphoneSpecs />;
    case 'wired-headphones':
      return <WiredHeadphonesSpecs />;
    case 'wireless-headphones':
      return <WirelessHeadphonesSpecs />;
    case 'cords':
      return <CordsSpecs />;
    case 'accessories':
      return <AccessoriesSpecs />;
    case 'microphone':
      return <MicrophoneSpecs />;
    case 'chips':
      return <ChipsSpecs />;
    case 'desktop':
      return <DesktopSpecs />;  
    case 'tablet':
      return <TabletSpecs />;  
    case 'monitor':
      return <MonitorSpecs />;  
    case 'external-hard-drives':
      return <ExternalHardDriveSpecs />; 
    case 'memory-cards':
      return <MemoryCardSpecs />; 
    case 'routers':
      return <RouterSpecs />; 
    case 'modems':
      return <ModemSpecs />;  
    case 'network-switches':
      return <NetworkSwitchSpecs />;  
    case 'printer':
      return <PrinterSpecs />;  
    case 'scanner':
      return <ScannerSpecs />;  
    case 'gaming-consoles':
      return <GamingConsoleSpecs />;  
    case 'gaming-accessories':
      return <GamingAccessoriesSpecs />;  
    case 'software':
      return <SoftwareSpecs />;  
    case 'server-equipment':
      return <ServerEquipmentSpecs />;  
    case 'diy-electronics':
      return <DIYElectronicsSpecs />; 
    case 'drones':
      return <DronesSpecs />;  
    case 'virtual-reality':
      return <VirtualRealitySpecs />;  
    case 'smartwatches':
      return <SmartwatchesSpecs />;  
    case 'fitness-trackers':
      return <FitnessTrackersSpecs />;  
    case 'e-readers':
      return <EReadersSpecs />;  
    case 'projectors':
      return <ProjectorsSpecs />;  
    case 'televisions':
      return <TelevisionsSpecs />;  
    case 'car-tech':
      return <CarTechSpecs />;  
    case 'home-automation':
      return <HomeAutomationSpecs />;  
    default:
      return <DefaultSpecs />;
  }
};

export default SpecsCategories;
