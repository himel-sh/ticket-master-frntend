const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to TicketMaster
            </h2>
            <p className="text-gray-700 leading-relaxed">
              TicketMaster is your premier destination for booking and managing
              transportation tickets. We connect travelers with reliable
              transport providers, making journey planning simple and
              convenient.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to revolutionize the way people book transportation
              tickets by providing a seamless, user-friendly platform that
              connects passengers with trusted vendors across multiple transport
              modes including buses, trains, flights, and boats.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Wide variety of transport options</li>
              <li>Competitive pricing and special offers</li>
              <li>Secure and easy booking process</li>
              <li>24/7 customer support</li>
              <li>Verified vendors and reliable service</li>
              <li>Flexible cancellation policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in transparency, reliability, and customer
              satisfaction. Every transaction on TicketMaster is backed by our
              commitment to quality service and fair pricing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
