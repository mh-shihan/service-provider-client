import SectionTitle from "../../components/SectionTitle";
import featuredImg from "../../assets/home/featured.png";

const Featured = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle heading="Featured Item" subHeading="Check it out" />
        <div className="grid  md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-12 mt-8">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={featuredImg}
              alt="Featured"
              className="rounded-2xl shadow w-full max-w-md object-cover"
            />
          </div>
          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase">
              Where can I get some?
            </h2>
            <p className="text-gray-700 dark:text-white text-base md:text-lg leading-relaxed">
              Get the Right Help — Exactly When You Need It. From doctors to
              teachers to lawyers, we connect you with experts you can rely on.
              Whether you are not feeling well, need academic advice, or have
              legal issues — we make life easier.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>
                Consult licensed doctors for healthcare tips and treatment
              </li>
              <li>Receive competent teachers to guide you or your child</li>
              <li>
                Get expert, easy-to-understand advice from qualified lawyers
              </li>
            </ul>
            <span className="block mt-2 text-gray-600 dark:text-gray-400">
              Each of our experts is handpicked, skilled, and on call to help
              you — anywhere, anytime.
            </span>
            {/* <button className="mt-4 w-max px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow hover:bg-primary-700 transition-all duration-300">
              Schedule Your Session
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
