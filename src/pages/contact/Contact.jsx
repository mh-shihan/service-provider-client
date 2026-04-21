import { Helmet } from "react-helmet";
import SectionBanner from "../../components/SectionBanner";
import Information from "./Information";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section className="pt-28 min-h-screen bg-gradient-to-br from-primary-200 via-white to-primary-400 pb-10 dark:from-primary-200 dark:via-black dark:to-primary-400">
      <div className="-mt-20 max-w-screen-2xl mx-auto px-4 md:px-8">
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <SectionBanner
          img={
            "https://res.cloudinary.com/dipwayvsu/image/upload/v1752444369/ezmae2rtposulwh28ktc.jpg"
          }
          title="Contact Us"
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start lg:px-20 md:px-12 px-0">
          {/* Information Card */}
          <div className="animate-slide-in-left bg-white/90 dark:bg-gray-700 border border-primary-100 dark:border-gray-900 rounded-3xl shadow-2xl flex flex-col justify-center p-10">
            <Information />
          </div>
          {/* Contact Form Card */}
          <div className="animate-slide-in-right bg-white/90 dark:bg-gray-700 border dark:border-gray-900 border-primary-100 rounded-3xl shadow-2xl p-10">
            <div className="mb-8 text-left w-full dark:bg-gray-700">
              <h3 className="text-3xl lg:text-4xl font-bold text-primary-700 mb-2 tracking-wide dark:text-white">
                Contact Form
              </h3>
              <div className="w-16 h-1 bg-primary-400 rounded mb-3" />
              <span className="text-primary-500 text-base lg:text-xl font-medium italic block">
                Sent Us a Message
              </span>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
