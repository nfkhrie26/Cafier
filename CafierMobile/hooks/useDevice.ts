import { useWindowDimensions } from 'react-native';


export const BREAKPOINTS = {
  tablet: 768, 
};

export const useDevice = () => {
  const { width, height } = useWindowDimensions();
  return {
    isTablet: width >= BREAKPOINTS.tablet,
    isLandscape: width > height,
    screenWidth: width,
    screenHeight: height,
  };
};