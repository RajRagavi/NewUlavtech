import React, { useEffect, useRef } from "react";
import agree from "../assets/img/agree.png";
import phaseImage from "../assets/img/phaseImage.jpg";
import organic from "../assets/img/organic.jpg";
import land from "../assets/img/land.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const seedRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const scrollToSeedSection = () => {
    if (seedRef.current) {
      seedRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full mt-26 md:mt-20 lg:mt-26">
      {/* Header Section */}
      <div className="bg-green-200 min-h-screen rounded-b-4xl p-5">
        <div className="flex flex-col md:flex-row items-center relative">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              How UlavTech is <br /> Transforming <span className="text-green-700">Farming Investments</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              At UlavTech, we make farm investments seamless, transparent, and profitable. Our digital dashboard allows investors to:
            </p>
            <h2 className="text-xl font-bold text-green-700">
              Monitor their farm investments in real-time <br />
              Track crop growth, yields, and market trends <br />
              Receive detailed financial insights and reports
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              With UlavTech, you don’t just invest—you become a part of the future of farming.
            </p>
            <button
              className="text-white bg-black border border-black px-4 w-[120px] py-2 rounded-md text-sm cursor-pointer"
              onClick={scrollToSeedSection}
            >
              Know More
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex md:justify-end mt-6 md:mt-0 relative">
            <img
              src={agree}
              alt="Farming Technology"
              className="absolute w-full md:w-full h-50 md:h-[600px] object-cover rounded-lg lg:mt-10 md:mt-10 md:top-[-180px]"
              data-aos="fade-down"
            />
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="py-16 text-center pt-40">
        <h2 className="text-3xl font-bold text-green-700">
          THE UPCOMING KEY MILESTONES <br /> PLANNED FOR 3 YEARS
        </h2>
      </div>

      {/* Phase Sections */}
      {[ 
        { title: "PHASE 1", image: phaseImage, 
          content: `In our Phase 1, we will focus on:`, 
          points: [
            "Delivery Mechanisms", "Warehouses", "Order Management Systems", 
            "Coordinating a Strong Farmer Community", "Market Analysis"
          ],
          summary: `Our Phase 1 will reveal the need for corporate structure in farming and its allied activities.
          We will reach the end of Phase 1 in one year.`,
          footer: `The main objective of UlavTech is to produce and distribute natural products with utmost freshness and quality. 
          We can't achieve everything in a single day. In order to develop an effective delivery mechanism, UlavTech is 
          planning to engage in trading activities, primarily having individual farmers as our vendors.`
        },
        { title: "PHASE 2", image: organic,
          content: `In our Phase 2, we will mainly focus on:`, 
          points: [
            "Organic Fertilizer Production", "Organic Pesticides Manufacturing"
          ],
          summary: `Our Phase 2 will give us the main raw material requirements which will significantly impact the price 
          of all our products to be low. We will reach the end of Phase 2 in one year.`,
          footer: `Producing organic natural products is a complex process as everything is costly today. 
          The major raw material requirements for organic production of natural products are organic fertilizers and pesticides. 
          UlavTech has its scope to provide organic natural products at minimal retail prices. To ensure cost control of production, 
          UlavTech will produce its raw material requirements internally.`
        },
        { title: "PHASE 3", image: land,
          content: `In our Phase 3, we will mainly focus on:`, 
          points: [
            "Land Requirements", "R&D in Land Treatment", "Irrigation Setups", "Application of Scientific Farming Techniques"
          ],
          summary: `Our Phase 3 will be a major milestone in the journey of UlavTech.
          Joining UlavTech is an endless journey with multiple opportunities, we will not drop you at any point in this journey.`,
          footer: `UlavTech will produce its own natural products with utmost quality and deliver them to your doorstep with the 
          utmost freshness in its third phase. The basic requirements are already fulfilled in our previous phases, and UlavTech 
          will kickstart its production activities in this phase.`
        }
      ].map((phase, index) => (
        <div key={index} className="p-2">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Left - Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img src={phase.image} alt={phase.title} className="w-full md:w-[90%] rounded-lg shadow-md" />
            </div>

            {/* Right - Text Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-green-700 text-2xl md:text-3xl font-bold">{phase.title}</h2>
              <p className="text-gray-800 mt-4">{phase.content}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                {phase.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p className="text-gray-800 mt-4">{phase.summary}</p>
            </div>
          </div>

          {/* Footer Content */}
          <div className="text-center font-semibold">
            <p className="text-gray-900 m-6">{phase.footer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
