// pages/contact.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
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
      {/* Contact Us Header */}
      <section className=" py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-lamasky">
            Get in Touch with Ace School
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We’d love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold text-center text-lamaPurple">
          Contact Us
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-2xl mx-auto">
          For any inquiries or to get in touch, please fill out the form below.
        </p>
        <form className="bg-white mt-8 p-6 rounded-md shadow-md max-w-lg mx-auto space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lamasky"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lamasky"
            />
          </div>
          <div>
            <label className="block text-gray-600">Message</label>
            <textarea className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lamasky"></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-lamaYellow hover:bg-lamaYellowLight text-white font-semibold rounded-md"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Contact Information and Map */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-lamaPurple">
              Our Contact Information
            </h2>
            <p className="text-gray-500">
              Feel free to reach out through any of the following methods:
            </p>
            <p className="text-gray-500">
              <strong>Address:</strong> 123 School Street, Education City
            </p>
            <p className="text-gray-500">
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p className="text-gray-500">
              <strong>Email:</strong> contact@aceschool.edu
            </p>
          </div>

          {/* Map Section */}
          <div className="w-full h-64 bg-gray-200 rounded-md">
            {/* Insert iframe for Google Maps or any map service here */}
            <iframe
              className="w-full h-full rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0742289728667!2d-122.41941548425648!3d37.7749292797595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808581d92f3e5ed9%3A0x8bffbbd01c40d37a!2sEducation+City!5e0!3m2!1sen!2sus!4v1635804010932!5m2!1sen!2sus"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
