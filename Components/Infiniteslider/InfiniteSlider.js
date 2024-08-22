"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./infiniteslider.css";
import Link from "next/link";

const Infiniteslider = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2000 }} // Adjust delay as needed
      slidesPerView={4}
      spaceBetween={10}
      loop={true} // Enable infinite looping
      breakpoints={{
        320: {
          slidesPerView: 2, // Show 2 slides on mobile
        },
        640: {
          slidesPerView: 3, // Show 2 slides on mobile
        },
        768: {
          slidesPerView: 3, // Show 3 slides on tablets
        },
        1024: {
          slidesPerView: 4, // Show 4 slides on desktops
        },
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img1.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img2.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img3.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img1.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img2.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img3.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img1.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img2.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide>
        <Link href="" className="no-underline">
          <div className="sliderimages">
            <img src="assets/img/slider/img3.png" alt="VU CINEMA TV 2024" />
          </div>
          <div className="slidertitle mt-3">
            <h3 className="text-white">VU 98" & 85" MASTERPIECE QLED TV</h3>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default Infiniteslider;
