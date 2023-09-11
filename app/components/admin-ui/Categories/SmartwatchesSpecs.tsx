import React from 'react';
import { containerDisplay } from '../SpecsCategories';
import { inputUi } from '../AddProducts';

export const SmartwatchesSpecs = () => {
  const smartwatchSpecifications = [
    'Brand',
    'Model',
    'Operating System',
    'Display Type',
    'Display Size',
    'Resolution',
    'Touchscreen',
    'Processor',
    'RAM',
    'Storage Capacity',
    'Connectivity',
    'Bluetooth Version',
    'Wi-Fi',
    'GPS',
    'NFC',
    'Sensors',
    'Battery Life',
    'Charging Method',
    'Water Resistance',
    'Strap Material',
    'Case Material',
    'Dimensions (L x W x H)',
    'Weight',
    'Additional Features',
    'Health and Fitness Tracking',
    'Heart Rate Monitor',
    'Sleep Tracking',
    'Activity Tracking',
    'Notifications',
    'Voice Assistant',
    'Music Playback',
    'Mobile Payment Support',
    'App Compatibility',
    'Price',
    'Availability',
    'Warranty Information',
    'Manufacturer Website',
    'User Manual',
    'Supported Apps',
    'App Store',
    'Interchangeable Straps',
    'Display Protection',
    'Microphone',
    'Speaker',
    'Built-in Camera',
    'ECG Monitoring',
    'Blood Pressure Monitoring',
    'Fall Detection',
    'Voice Calls',
    'Mobile Data Support',
    'Wireless Charging',
    'Custom Watch Faces',
    'Color Options',
    'Compatibility with Smartphones',
    'Operating Temperature Range',
    'Display Always-On Option',
    'Battery Saver Mode',
    'Display Brightness',
    'Altimeter',
    'Barometer',
    'Gyroscope',
    'Compass',
    'Waterproof Rating',
    'Sleep Apnea Detection',
    'UV Radiation Sensor',
    'Emergency SOS Feature',
    'Activity Goals Tracking',
    'Dust Resistance',
    'Multi-Sport Tracking',
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Smartwatch Specifications</h2>
      <div className={containerDisplay}>
        {smartwatchSpecifications.map((spec, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label>{spec}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};

 
