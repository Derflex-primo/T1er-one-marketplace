import ntc from "ntcjs";

export const analyzeImageColor = async (file: File): Promise<{hex: string, name: string}> =>  {
  // Create an HTMLImageElement to load the image
  const img = new Image();
  img.src = URL.createObjectURL(file);

  // Wait for the image to load
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  // Create a canvas element to draw the image on
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the image on the canvas
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

  // Compute the average color
  let r = 0, g = 0, b = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
  }

  r = Math.floor(r / (imageData.length / 4));
  g = Math.floor(g / (imageData.length / 4));
  b = Math.floor(b / (imageData.length / 4));

  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  const hexColor = `#${rHex}${gHex}${bHex}`;

  const colorName = ntc.name(hexColor)[1];  // Assuming you imported ntcjs

  return {
    hex: hexColor,
    name: colorName
  };
}
