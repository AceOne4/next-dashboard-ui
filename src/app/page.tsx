/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const images = [
    "/bg-1.jpg", // Add path to the school building image
    "/bg-2.jpg", // Add path to the classroom image
    "/bg-3.jpg", // Add path to the sports facilities image
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate the image every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000); // 30000ms = 30 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex justify-center items-center lg:justify-start gap-2"
          >
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold">Ace School</span>
          </Link>

          {/* Navbar */}
          <nav className="space-x-6">
            <Link
              href="/aboutUs"
              className="text-gray-500 hover:text-lamaPurple"
            >
              About Us
            </Link>
            <Link
              href="/contactUs"
              className="text-gray-500 hover:text-lamaPurple"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="text-white bg-lamaYellow hover:bg-lamaYellowLight px-4 py-2 rounded-md"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-[500px] bg-cover bg-center bg-gray-200">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

        {/* Hero Text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold">Welcome to Ace School</h1>
          <p className="mt-4 text-lg max-w-md">
            A place to empower, inspire, and educate future leaders. Join us on
            the journey to excellence.
          </p>
          <Link
            href="/aboutUs"
            className="mt-8 px-6 py-3 bg-lamaPurple hover:bg-lamaPurpleLight text-white font-semibold rounded-md"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="container mx-auto py-20 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold text-center ">
          About Ace School
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
          Ace School is dedicated to nurturing a love for learning and guiding
          each student toward a brighter future.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <Image
              src="/classroom.webp"
              alt="Classroom"
              className="rounded-md"
              width={400}
              height={100}
            />
            <p className="mt-4 text-gray-500 text-center">
              Engaging Classrooms
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <Image
              src="/lab.webp"
              alt="Labs"
              className="rounded-md"
              width={400}
              height={100}
            />
            <p className="mt-4 text-gray-500 text-center">Modern Labs</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <Image
              src="/sports.png"
              alt="Sports Facilities"
              className="rounded-md"
              width={400}
              height={100}
            />
            <p className="mt-4 text-gray-500 text-center">Sports Facilities</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold text-center">
          What Our Community Says
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mt-8">
          <div className="bg-white p-6 rounded-md shadow-md max-w-xs text-center">
            <p className="text-gray-500">
              "Ace School has transformed our child's education!"
            </p>
            <p className="mt-4 text-lamaYellow font-semibold">- Parent</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md max-w-xs text-center">
            <p className="text-gray-500">
              "The teachers and staff are amazing."
            </p>
            <p className="mt-4 text-lamaYellow font-semibold">- Student</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">
            &copy; 2024 Ace School. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-500 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              Contact Us
            </a>
          </div>
          <div className="mt-6">
            <p className="text-gray-500">123 School Street, Education City</p>
            <p className="text-gray-500">Phone: +1 234 567 890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
