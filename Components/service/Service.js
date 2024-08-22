import Link from "next/link";

import "./service.css";

export default function Service() {
  return (
    <>
      <section className="allbanners mb-5 mt-0">
        <div className="banner-overlay">
          <div className="container">
            <div className="allbannercontent text-center">
              <h2 className="text-white">Service</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg bg-background border border-gray-300 shadow-sm transition-all hover:shadow-md">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only text-white">View service</span>
            </Link>
            <img
              src="/assets/img/service/tour_4.jpg"
              alt="Service 1"
              width="360"
              height="240"
              className="h-60 w-full object-cover transition-all group-hover:scale-105"
              style={{ aspectRatio: "360/240", objectFit: "cover" }}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">
                Product Installation
              </h3>
              <p className="mt-2 text-white text-justify">
                We help to set up your product for optimum performance. Our
                engineers do more than just install - They also interconnect all
                compatible products that you own to the main product during
                installation.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg bg-background border border-gray-300 shadow-sm transition-all hover:shadow-md">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View service</span>
            </Link>
            <img
              src="/assets/img/service/tour_5.jpg"
              alt="Service 2"
              width="360"
              height="240"
              className="h-60 w-full object-cover transition-all group-hover:scale-105"
              style={{ aspectRatio: "360/240", objectFit: "cover" }}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">
                Specialised Customer Training
              </h3>
              <p className="mt-2 text-white text-justify">
                Specialised demonstration & technical support to customers on
                products and related applications, by company-trained personnel.
                Live demonstration of all features of the product on site and
                provide handy care tips.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg bg-background border border-gray-300 shadow-sm transition-all hover:shadow-md">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View service</span>
            </Link>
            <img
              src="/assets/img/service/tour_6.jpg"
              alt="Service 3"
              width="360"
              height="240"
              className="h-60 w-full object-cover transition-all group-hover:scale-105"
              style={{ aspectRatio: "360/240", objectFit: "cover" }}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">
                Service Station for Diagnosis and Repairs
              </h3>
              <p className="mt-2 text-white text-justify">
                We help to provide guidance and service support assistance for
                all VU products. Arrange company service technicians at your
                place to repair, covering both pre and post-manufacturer
                warranty periods.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg bg-background border border-gray-300 shadow-sm transition-all hover:shadow-md">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View service</span>
            </Link>
            <img
              src="/assets/img/service/tour_7.jpg"
              alt="Service 4"
              width="360"
              height="240"
              className="h-60 w-full object-cover transition-all group-hover:scale-105"
              style={{ aspectRatio: "360/240", objectFit: "cover" }}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">
                Demonstration of Product Usage
              </h3>
              <p className="mt-2 text-white text-justify">
                We help to set up your product for optimum performance. Live
                demonstration of all features of the product on site. Provide
                handy care tips.
              </p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-lg bg-background border border-gray-300 shadow-sm transition-all hover:shadow-md">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View service</span>
            </Link>
            <img
              src="/assets/img/service/tour_9.jpg"
              alt="Service 5"
              width="360"
              height="240"
              className="h-60 w-full object-cover transition-all group-hover:scale-105"
              style={{ aspectRatio: "360/240", objectFit: "cover" }}
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white">
                Extended Warranty Service - VU Q Care Plan
              </h3>
              <p className="mt-2 text-white text-justify">
                The extended warranty offered by the manufacturer. Extended
                warranties cost extra and for a percentage of the item's retail
                price.
              </p>
            </div>
          </div>
          {/* <div className="group relative overflow-hidden rounded-lg bg-background border border-gray-300 shadow-sm transition-all hover:shadow-md">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View service</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Service 6"
            width="360"
            height="240"
            className="h-60 w-full object-cover transition-all group-hover:scale-105"
            style={{ aspectRatio: "360/240", objectFit: "cover" }}
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white">IT Consulting</h3>
            <p className="mt-2 text-white text-justify">
              Our experienced consultants provide tailored solutions to optimize your IT infrastructure.
            </p>
          </div>
        </div> */}
        </div>
      </section>

      <section className="pb-12 md:py-20">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/awRcJWjeYJM?autoplay=1&loop=1&playlist=awRcJWjeYJM&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
