import React from "react";
import "./about.css";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <>
      <section className="allbanners mb-5 mt-0">
        <div className="banner-overlay">
          <div className="container">
            <div className="allbannercontent text-center">
              <h2 className="text-white">About Us</h2>
            </div>
          </div>
        </div>
      </section>

      {/* <section class="about-section">
                <div class="container">
                    <div class="row">
                        <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
                            <div class="inner-column">
                                <div class="sec-title">
                                    <span class="title">About </span>
                                    <h2>Welcome to Auxtronics!</h2>
                                </div>
                                <div class="text">Auxtronics is an “Vu Televisions” delaer for deals with High-end Vu Luxury High Definition LED and Ultra HD 4K Televisions, 3D TVs, Premium Smart TVs, Corporate TVs, Super TVs, Inteligent TVs, Touch Screen, Professional Displays, Video Walls, Digital Signages, Kiosks and Telepresence.</div>
                                <div class="text">
                                    We had more than 20 years of experience in Electronics, IT and ITES fields, we started with a mini strength of staff & headed by top personalities who have put years of services in Electronics, IT and ITES field right through the tenure, the organization has grown stupendously in the field of selling & servicing. Various brand of IT products have been sold to the market & the service back up given by technical engineers is breath-taking.
                                </div>
                                <button className='contactbtn'>
                                    Contact
                                </button>
                            </div>
                        </div>


                        <div class="image-column col-lg-6 col-md-12 col-sm-12">
                            <div class="inner-column wow fadeInLeft">
                                <div class="author-desc">
                                    <h2>Auxtronics</h2>
                                 
                                </div>
                                <figure class="image-1"><a href="#" class="lightbox-image" data-fancybox="images"><img title="Auxtronics" src="asset/img/about/Protect_and_extend_life_of_TV.png" alt="" /></a></figure>

                            </div>
                        </div>

                    </div>

                </div>
            </section> */}

      <section className="about-me" id="about-me">
        <div className="container">
          <div className="about-me-container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="about-me-flex-container">
                  <div className="about-me-image">
                    <div className="back-div"></div>
                    <div className="black-image">
                      <img
                        src="/assets/img/about/aboutimage1.png"
                        alt="black"
                      />
                    </div>
                    <div className="main-image">
                      <img
                        src="/assets/img/about/about_image2.png"
                        alt="smit"
                      />
                    </div>
                  </div>
                </div>

                <div className="mail-button mail-button2">
                  <a href="mailto:auxtronics@gmail.com">
                    <img
                      src="https://raw.githubusercontent.com/Smit-Prajapati/prajapatismit/20391be8bf1ed24ef0e5da066bf68a5f6ee78fa1/images/mail.svg"
                      alt="mail"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="about-me-title">
                  <h1>Welcome to Auxtronics!</h1>
                </div>
                <div className="about-me-content mt-3">
                  <div className="text-white">
                    <p>
                      {" "}
                      Auxtronics is an “Vu Televisions” delaer for deals with
                      High-end Vu Luxury High Definition LED and Ultra HD 4K
                      Televisions, 3D TVs, Premium Smart TVs, Corporate TVs,
                      Super TVs, Inteligent TVs, Touch Screen, Professional
                      Displays, Video Walls, Digital Signages, Kiosks and
                      Telepresence.
                    </p>
                  </div>
                  <div className="text-white">
                    <p>
                      {" "}
                      We had more than 20 years of experience in Electronics, IT
                      and ITES fields, we started with a mini strength of staff
                      & headed by top personalities who have put years of
                      services in Electronics, IT and ITES field right through
                      the tenure, the organization has grown stupendously in the
                      field of selling & servicing. Various brand of IT products
                      have been sold to the market & the service back up given
                      by technical engineers is breath-taking.
                    </p>
                  </div>
                  <button className="contactbtn mt-3">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="abouttabs my-5">
        <div className="container">
          <div className="about-me-title">
            <h2 className="text-white">About VU</h2>
          </div>
          <div className="about-me-content mt-3">
            <div className="text-white ">
              <p className="text-justify">
                Vu Televisions [pronounced “view”] is a Television brand
                established in 2006 between California, USA and Mumbai, India.
              </p>
            </div>
            <div className="text-white">
              <p className="text-justify">
                The development of Vu’s Television products was inspired by the
                human factors approach of New Product Development pioneered by
                MIT Media Lab, Boston and innovation labs across the world. Each
                television produced by Vu’s factories worldwide is built from
                the highest A+ grade panels, with the fastest processors,
                RoHS-grade materials and energy efficient power solutions. Vu
                works closely with consumers to understand their entertainment
                preferences and content choices to develop user-friendly
                interfaces for their interaction with the TV.
              </p>
            </div>
            <div className="text-white">
              <p className="text-justify">
                All Vu Televisions are designed to operate for over 100,000
                hours in normal circumstances and provide the best picture
                quality even in brightly-lit environments. Vu’s NPD Labs have
                pioneered in television technology with award-winning innovative
                products such as the Iconium range, the Play range, the
                Intelligent TV, the Waterproof TV, the Netflix-integrated TV,
                the rose gold 85” 4K TV, the Digital Home, the Office TV and
                more.
              </p>
            </div>
            <div className="text-white">
              <p className="text-justify">
                The consumer experience of a Vu TV extends to world-class and
                personalized customer relations after purchase, for which Vu set
                up the first ISO 9001 Certified Customer Support center for
                televisions in the country. Therefore, the brand has been
                constantly rated 5/5 on multiple consumer forums, received TV of
                the year from the media and is the fastest growing TV brand in
                various segments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="abouttabs my-5">
        <div className="container">
          <div className="about-me-title">
            <h2 className="text-white">Happy Client</h2>
          </div>
          <div className="about-me-content mt-3">
            <div className="text-white ">
              <p className="text-justify">
                All Vu Televisions are designed to operate for over 100,000
                hours in normal circumstances and provide the best picture
                quality even in brightly-lit environments. Vu’s NPD Labs have
                pioneered in television technology with award-winning innovative
                products such as the Iconium range, the Play range, the
                Intelligent TV, the Waterproof TV, the Netflix-integrated TV,
                the rose gold 85” 4K TV, the Digital Home, the Office TV and
                more.
              </p>
            </div>
            <div className="text-white">
              <p className="text-justify">
                The consumer experience of a Vu TV extends to world-class and
                personalized customer relations after purchase, for which Vu set
                up the first ISO 9001 Certified Customer Support center for
                televisions in the country. Therefore, the brand has been
                constantly rated 5/5 on multiple consumer forums, received TV of
                the year from the media and is the fastest growing TV brand in
                various segments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
