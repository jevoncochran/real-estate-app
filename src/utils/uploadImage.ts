import { Photo } from "@/types";
import { UPLOAD_PRESET, CLOUD_NAME } from "@/constants";

export const uploadImage = async (photo: Photo) => {
  if (!photo) return;

  const formData = new FormData();

  formData.append("file", photo);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    const imageUrl = data["secure_url"];

    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};
