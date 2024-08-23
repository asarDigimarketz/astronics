import React from "react";
import "./video.css";
import "bootstrap/dist/css/bootstrap.min.css";

const VideoSection = () => {
  return (
    <section className="relative w-full aspect-video overflow-hidden bg-gray-900 text-white h-[50vh] sm:h-[60vh] lg:h-[70vh]">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="assets/img/video/VU_MasterPiece_lo_QLED_TV_Long_Final_with_watermark.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
