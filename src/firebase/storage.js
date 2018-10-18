import { storage } from './firebase';

// Upload Tmp Image
export const uploadTmpImage = (file) =>
  storage.ref().child('tmp/landing/').child(file.name).put(file);

// Delete Tmp Image
export const deleteTmpImage = (file) =>
  storage.ref().child(file.metadata.fullPath).delete();

// Upload Image
export const uploadImage = (file) =>
  storage.ref().child('landing/').child(file.name).put(file);
