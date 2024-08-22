"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import axios from "axios";
import "./SliderCarousel.css";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const SliderCarousel = () => {
  const [bannerCarousel, setBannerCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`api/carouselbanner`);
      const banner = await response.data;
      setBannerCarousel(banner);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <main>
      {isLoading && <LoadingSkeleton />}
      {!isLoading && (
        <div>
          <div className="carousel">
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              centeredSlides={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true, // Optional: Makes pagination bullets dynamic
              }}
              modules={[Autoplay, Pagination, EffectFade]}
              className="mySwiper"
            >
              {bannerCarousel
                .map((banner) => (
                  <SwiperSlide
                    key={banner._id}
                    className="swiper-slide"
                    style={{
                      backgroundImage: `url(${banner.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Optional: Add overlay content */}
                  </SwiperSlide>
                ))
                .reverse()}
              <div className="swiper-pagination"></div>{" "}
              {/* Ensure this element is present */}
            </Swiper>
          </div>
        </div>
      )}
    </main>
  );
};

export default SliderCarousel;
