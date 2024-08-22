import About from "@/Components/about/About";
import Category from "@/Components/Category/Category";
import SliderCarousel from "@/Components/SliderCarousel/SliderCarousel";
import Counter from "@/Components/counter/Counter";
import VideoSection from "@/Components/video/VideoSection";
import InfiniteSlider from "@/Components/Infiniteslider/InfiniteSlider";

export default function Home() {
  return (
    <>
      <SliderCarousel />
      <div className="my-5">
        {" "}
        <About />
      </div>
      <Category />
      <div className="w-full   flex items-center justify-center my-5">
        <div className="container mx-auto p-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Our Metrics
          </h2>
          <Counter />
        </div>
      </div>
      <div className="container my-5  sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Our Products
        </h2>
        <InfiniteSlider />
      </div>
      <div>
        <VideoSection />
        {/* Other content */}
      </div>
    </>
  );
}
