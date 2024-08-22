import React from "react";
import "@/components/about/about.css";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <>
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
    </>
  );
};

export default About;
