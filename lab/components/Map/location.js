// TODO: Remove and change to a ENV_VARIABLE
//const GOOGLE_API_KEY = 'AIzaSyDE8GXWulLuQrzD_191DM6JRBLgatawx-8';
const GOOGLE_API_KEY = 'AIzaSyDE8GXWulLuQrzD_191DM6JRBLgatawx-8';

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:F%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
