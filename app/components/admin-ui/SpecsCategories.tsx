import { useState } from "react";
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
import { SpecsProps, SpecsCategoriesProps } from "@/types";


export const containerDisplay = "text-xs font-semibold text-stone-500 grid grid-cols-1 md:grid-cols-4 gap-2"

const SpecsCategories: React.FC<SpecsCategoriesProps> = ({ category , onSpecsChange }) => {
  const [specs, setSpecs] = useState<SpecsProps>({});

  const handleSpecsChange = (newSpecs: SpecsProps) => {
    setSpecs(newSpecs);
    onSpecsChange(newSpecs);
  };

  switch (category) {
    case 'cameras':
      return <CameraSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'camera lens':
      return <CameraLensSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'laptops':
      return <LaptopSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'smart phones':
      return <SmartphoneSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'wired headphones':
      return <WiredHeadphonesSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'wireless headphones':
      return <WirelessHeadphonesSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'cords':
      return <CordsSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'accessories':
      return <AccessoriesSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'microphone':
      return <MicrophoneSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'chips':
      return <ChipsSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'desktop':
      return <DesktopSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'tablet':
      return <TabletSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'monitor':
      return <MonitorSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'external hard drives':
      return <ExternalHardDriveSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'memory cards':
      return <MemoryCardSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'routers':
      return <RouterSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'modems':
      return <ModemSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'network switches':
      return <NetworkSwitchSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'printer':
      return <PrinterSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'scanner':
      return <ScannerSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'gaming consoles':
      return <GamingConsoleSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'gaming accessories':
      return <GamingAccessoriesSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'software':
      return <SoftwareSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'server equipment':
      return <ServerEquipmentSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'diy electronics':
      return <DIYElectronicsSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'drones':
      return <DronesSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'virtual reality':
      return <VirtualRealitySpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'smartwatches':
      return <SmartwatchesSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'fitness trackers':
      return <FitnessTrackersSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'e readers':
      return <EReadersSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'projectors':
      return <ProjectorsSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'televisions':
      return <TelevisionsSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'car tech':
      return <CarTechSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    case 'home automation':
      return <HomeAutomationSpecs specs={specs} onSpecsChange={handleSpecsChange} />;
    default:
      return <DefaultSpecs />;
  }
};

export default SpecsCategories;
