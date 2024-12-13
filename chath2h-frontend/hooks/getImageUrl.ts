import getConfig from 'next/config';

const useImageUrl = (imageId: string) => {
  // If no imageId is provided, return empty string
  if (!imageId) {
    return '';
  }

  const { publicRuntimeConfig } = getConfig();
  
  // Use the backend URL from config if available, otherwise use the production URL
  const baseUrl = publicRuntimeConfig?.backendUrl || 'https://chath2h.com/api';
  
  // Construct and return the full URL
  return `${baseUrl}/files/${imageId}`;
};

export default useImageUrl;