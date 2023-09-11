import React from 'react';
import { containerDisplay } from '../SpecsCategories';
import { inputUi } from '../AddProducts';

export const MicrophoneSpecs = () => {
  const microphoneFields = [
    'Brand',
    'Model Number',
    'Product Condition',
    'Brand New (Yes/No)',
    'Microphone Type',
    'Polar Pattern',
    'Frequency Response',
    'Sensitivity',
    'Impedance',
    'Connector Type',
    'Cable Length',
    'Color',
    'Material',
    'Mounting Type',
    'Power Source',
    'Signal-to-Noise Ratio (SNR)',
    'Dimensions (Height, Width, Depth)',
    'Weight',
    'Country of Origin',
    'Certifications (Yes/No)',
    'Package Contents',
    "Manufacturer's Warranty - Parts",
    "Manufacturer's Warranty - Labour",
    'Additional Features',
    'Accessories Included',
    'Adjustable Stand (Yes/No)',
    'Bluetooth (Yes/No)',
    'Built-in Mixer (Yes/No)',
    'Compatible Devices',
    'Frequency Range',
    'Microphone Stand Included (Yes/No)',
    'Mounting Thread Size',
    'Noise Cancelling (Yes/No)',
    'On/Off Switch (Yes/No)',
    'Phantom Power Required (Yes/No)',
    'Recording Quality (bitrate, sample rate)',
    'Storage Options',
    'Wireless (Yes/No)',
    'Wireless Range',
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="mb-4">Microphone Specifications</h2>
      <div className={containerDisplay}>
        {microphoneFields.map((field, index) => (
          <div
            className={'flex flex-col mb-4'}
            key={index}
          >
            <label>{field}:</label>
            <input className={inputUi} type="text" />
          </div>
        ))}
      </div>
    </div>
  );
};

 
