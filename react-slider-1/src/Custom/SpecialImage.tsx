// src/SpecialImage.tsx
import React, { forwardRef } from 'react';

interface SpecialImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  xoriginal?: string;
}

const SpecialImage = forwardRef<HTMLImageElement, SpecialImageProps>((props, ref) => {
  return <img {...props} ref={ref} />;
});

SpecialImage.displayName = 'SpecialImage'; // Optional but recommended for debugging

export default SpecialImage;
