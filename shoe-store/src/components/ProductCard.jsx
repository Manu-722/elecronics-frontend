const ProductCard = ({ product }) => {
  const variant = product.variants?.[0];
  const image = variant?.images?.[0];

  return (
    <div className="product-card bg-gray-900 p-4 rounded">
      {image && (
        <img
          src={image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
      )}

      <h3 className="text-white mt-2">{product.name}</h3>
      <p className="text-gray-400">{product.description}</p>
    </div>
  );
};

export default ProductCard;