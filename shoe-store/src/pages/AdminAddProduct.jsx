import { useState } from "react";
import { uploadImage } from "../services/uploadService";
import { apiClient } from "../services/apiClient";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = await uploadImage(file);
    setLoading(false);

    if (data.url) {
      setImages((prev) => [...prev, data.url]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !price || !size || !color) {
      alert("Fill all fields");
      return;
    }

    const productData = {
      name,
      description,
      variants: [
        {
          size,
          color,
          price,
          images,
        },
      ],
    };

    const res = await apiClient("/products", "POST", productData, true);

    if (res._id) {
      alert("Product created!");
      setName("");
      setDescription("");
      setPrice("");
      setSize("");
      setColor("");
      setImages([]);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 rounded"
      />

      <input
        type="text"
        placeholder="Size (e.g., 42)"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 rounded"
      />

      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full mb-3 p-2 bg-gray-800 rounded"
      />

      <label className="block mb-2">Upload Images</label>
      <input type="file" onChange={handleImageUpload} className="mb-4" />

      {loading && <p>Uploading...</p>}

      <div className="flex gap-3 mb-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Product
      </button>
    </div>
  );
}