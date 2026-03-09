import { API_URL } from "./api";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/upload/image`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}