import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminCreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [gender, setGender] = useState("");
  const [variants, setVariants] = useState([
    { size: "", color: "", stock: "" },
  ]);
  const [imageFile, setImageFile] = useState(null);

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", stock: "" }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("basePrice", basePrice);
    formData.append("gender", gender);
    formData.append("variants", JSON.stringify(variants));
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch("http://localhost:5000/api/products/create", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      navigate("/admin/products");
    } else {
      alert("Failed to create product");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* VARIANTS */}
        <div>
          <h2 className="font-semibold mb-2">Variants</h2>

          {variants.map((v, index) => (
            <div key={index} className="flex gap-2 mb-2">

              <input
                type="text"
                placeholder="Size"
                value={v.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />

              <input
                type="text"
                placeholder="Color"
                value={v.color}
                onChange={(e) =>
                  handleVariantChange(index, "color", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />

              <input
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
                className="border p-2 rounded w-1/3"
              />

              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="bg-red-600 text-white px-3 rounded"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}