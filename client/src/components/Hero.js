import React from "react";
import {  FaExternalLinkAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";

const Hero = () => {
  return (
    <section className="relative bg-gray-900 overflow-hidden">

      <div className="relative z-10 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Empowering Communities <br className="hidden lg:inline" />
            in Times of Crisis
          </h1>
          <p className="text-lg text-gray-200">
            Providing swift, effective response to emergencies <br className="hidden lg:inline" />
            through technology and community collaboration
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="/report-emergency"
            className="inline-flex items-center py-3 px-6 text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
          >
            Report Emergency
            <FaExternalLinkAlt className="ml-2 w-5 h-5" />
          </a>
          <a
            href="/become-volunteer"
            className="inline-flex items-center py-3 px-6 text-base font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:ring-gray-600"
          >
            Become a Volunteer
            <AiFillCheckCircle className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
