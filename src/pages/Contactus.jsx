import React from "react";

const Contactus = () => {
  return (
    <div className="bg-white">
      {/* Google Map */}
      <div className="w-full h-80 mt-30">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537363153159!3d-37.81627974202154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf4cbaa4ed2fd1dd0!2sFederation%20Square!5e0!3m2!1sen!2sin!4v1627306923585!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
      <div className="py-16 px-4 md:px-10 lg:px-20 ">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-start gap-10">
      {/* Left Section */}
      <div className="md:w-1/2">
        <h2 className="text-sm text-black uppercase">Contact Us</h2>
        <h1 className="text-4xl font-bold text-black mt-2">GET IN TOUCH NOW</h1>
        <p className="text-black mt-3">
          You can get in touch with us. Our representative will be readily available to attend to your inquiries and can rectify your doubts regarding product investments.
        </p>

        <div className="mt-6">
          {/* <p className="text-lg font-semibold text-gray-800">Phone:</p>
          <p className="text-black">+91 98765 43210</p> */}

          <p className="text-lg font-semibold text-gray-800 mt-5">Email:</p>
          <p className="text-black">contact@yourdomain.com</p>

          <p className="text-lg font-semibold text-gray-800 mt-5">Address:</p>
          <p className="text-black">6/683/7/3, Cholan Street, Lakshminagar, Virudhunagar - 626001</p>
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button
            type="submit"
            className="w-full !bg-black text-white py-3 rounded-md hover:!bg-green-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Contactus;
