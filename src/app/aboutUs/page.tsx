/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutPage: React.FC = () => {
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
      {/* Slogan */}
      <div className="h-[800px] ">
        <div
          className="bg-cover bg-top h-full"
          style={{ backgroundImage: 'url("/EMP.webp")' }}
        ></div>
      </div>
      <section className=" py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-lamasky">
            "Empowering Minds, Shaping Futures"
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Creating a world where every student excels.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold text-lamaPurple text-center">
          Our History
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
          Founded in 2020, Ace School has grown from a small initiative into a
          vibrant educational community. Our founders envisioned a school that
          not only imparts knowledge but also nurtures character and values.
          Over the years, we have continually evolved to meet the needs of our
          students and the demands of an ever-changing world. Today, we are
          proud to serve a diverse student body and remain committed to
          excellence in education.
        </p>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold text-lamaPurple text-center">
          Our Mission
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
          At Ace School, our mission is to inspire and educate every student to
          reach their full potential, fostering a love for learning and
          equipping them with the skills needed for a successful future.
        </p>
      </section>

      {/* Vision Section */}
      <section className=" py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-lamaPurple text-center">
            Our Vision
          </h2>
          <p className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
            We envision a community where each student achieves academic
            excellence and is prepared to positively impact society. Ace School
            is committed to nurturing compassionate, confident, and creative
            individuals.
          </p>
        </div>
      </section>

      {/* Target Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-3xl font-semibold text-lamaPurple text-center">
          Our Target
        </h2>
        <p className="mt-4 text-center text-gray-500 max-w-3xl mx-auto">
          Our target is to provide a well-rounded education that challenges
          students to think critically, communicate effectively, and develop
          into global citizens who value diversity and respect others.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
