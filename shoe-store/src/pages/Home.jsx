import React from 'react';

const Home = () => {
  const textShadowStyle = {
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="bg-cover bg-center bg-no-repeat text-white py-32 px-6 text-center h-[90vh]"
        style={{
          backgroundImage: "url('src/assets/pexels-pixabay-373638.jpg')",
          ...textShadowStyle,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Cyman Wear
        </h1>
        <p className="text-lg max-w-xl mx-auto">
          Redefining modern fashion with bold designs, premium quality, and effortless style.
        </p>
      </section>

      {/* MISSION & VISION SECTION */}
      <section
        className="bg-cover bg-center bg-no-repeat text-white py-28 px-6 text-center h-[80vh]"
        style={{
          backgroundImage: "url('/src/assets/pexels-tima-miroshnichenko-6765524.jpg')",
          ...textShadowStyle,
        }}
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          At Cyman Wear, our mission is to craft stylish, comfortable, and durable apparel
          that empowers individuals to express themselves confidently.
        </p>

        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="max-w-2xl mx-auto">
          To become Africa’s leading fashion brand — inspiring creativity, confidence,
          and culture through every piece we create.
        </p>
      </section>

      {/* ABOUT US SECTION */}
      <section
        className="bg-cover bg-center bg-no-repeat text-white py-28 px-6 text-center h-[80vh]"
        style={{
          backgroundImage: "url('/src/assets/pexels-mnzoutfits-1598505.jpg')",
          ...textShadowStyle,
        }}
      >
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto">
          Cyman Wear is a Nairobi‑born fashion brand built on creativity, authenticity,
          and premium craftsmanship. From everyday essentials to standout pieces,
          we design clothing that blends comfort, culture, and modern style.
        </p>
      </section>
    </main>
  );
};

export default Home;