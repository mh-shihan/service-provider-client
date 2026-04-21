import { Helmet } from "react-helmet";

const team = [
  {
    name: "Fahim Rashid",
    role: "Founder & CEO",
    img: "https://res.cloudinary.com/dipwayvsu/image/upload/v1752233973/twbjtlc3a6t6wcsffmko.jpg",
  },
  {
    name: "Md Ashfaqul Islam",
    role: "Chief Technology Officer",
    img: "https://res.cloudinary.com/dipwayvsu/image/upload/v1752233973/isweep4rj4e2c2xehzbc.jpg",
  },
  {
    name: "Abdullah Al Noman",
    role: "Head of Operations",
    img: "https://res.cloudinary.com/dipwayvsu/image/upload/v1752233973/nipu4okrkqj3jz4xu2r5.jpg",
  },
  {
    name: "Md. Mamunur Rashid",
    role: "Head of Marketing",
    img: "https://res.cloudinary.com/dipwayvsu/image/upload/v1752233973/hkbln9u7zgaxymld6uoe.jpg",
  },
  {
    name: "Atonu Dey",
    role: "Lead Developer",
    img: "https://res.cloudinary.com/dipwayvsu/image/upload/v1752233974/olora0ltxq9zdxchqsrz.jpg",
  },
];

const About = () => {
  return (
    <div className="pt-16 bg-gradient-to-br from-primary-50 to-white min-h-screen">
      <Helmet>
        <title>About us</title>
      </Helmet>

      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 px-4 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="flex-1 flex flex-col gap-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-600 mb-2">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-base-content/80 max-w-xl text-gray-700 dark:text-gray-200 text-justify">
            We’re not just another service provider—we’re your partner in making
            things easier. Whether you need a helping hand or a smart solution,
            we’re here to support you every step of the way. Our team is built
            on a foundation of trust, innovation, and a genuine desire to
            improve the way people get things done.
          </p>
          <div className="flex gap-4 mt-4">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold shadow-sm">
              Reliable
            </span>
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold shadow-sm">
              Innovative
            </span>
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold shadow-sm">
              Supportive
            </span>
          </div>
        </div>
        <div className="flex-1 flex justify-center animate-fade-in-up">
          <img
            src="https://res.cloudinary.com/dipwayvsu/image/upload/v1740128751/ylwjmpespysqztizbjmn.jpg"
            alt="About us illustration"
            className="rounded-3xl shadow-xl w-full max-w-md object-cover border-4 border-primary-100"
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-0 py-10 grid md:grid-cols-2 gap-10 animate-fade-in">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-primary-400 dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-primary-600 mb-3">
            Our Mission
          </h2>
          <p className="text-base-content/80 text-gray-700 dark:text-gray-200 text-center">
            To empower individuals and businesses by providing seamless,
            trustworthy, and innovative service solutions that simplify everyday
            life.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-primary-400 dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-primary-600 mb-3">
            Our Vision
          </h2>
          <p className="text-base-content/80 text-gray-700 dark:text-gray-200 text-center">
            To be the most trusted and forward-thinking service platform,
            recognized for our commitment to quality, customer satisfaction, and
            positive impact on communities.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-6xl mx-auto px-4 md:px-0 py-12 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-primary-600 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary-100"
              />
              <h3 className="text-lg font-bold text-primary-700 mb-1  dark:text-primary-600">
                {member.name}
              </h3>
              <p className="text-base-content/70 dark:text-gray-200 text-center">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-0 py-10 animate-fade-in">
        <h2 className="text-2xl font-bold text-primary-600 mb-6 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-primary-50 rounded-xl p-6 text-center shadow">
            <div className="text-4xl mb-2">🤝</div>
            <h4 className="font-bold text-lg mb-1 text-gray-700 dark:text-gray-200 ">
              Integrity
            </h4>
            <p className="text-base-content/70 text-gray-700 dark:text-gray-200 ">
              We act with honesty and transparency in all we do.
            </p>
          </div>
          <div className="bg-primary-50 rounded-xl p-6 text-center shadow">
            <div className="text-4xl mb-2">🚀</div>
            <h4 className="font-bold text-lg mb-1 text-gray-700 dark:text-gray-200 ">
              Innovation
            </h4>
            <p className="text-base-content/70 text-gray-700 dark:text-gray-200 ">
              We embrace change and continuously seek better solutions.
            </p>
          </div>
          <div className="bg-primary-50 rounded-xl p-6 text-center shadow">
            <div className="text-4xl mb-2">🌟</div>
            <h4 className="font-bold text-lg mb-1 text-gray-700 dark:text-gray-200 ">
              Excellence
            </h4>
            <p className="text-base-content/70 text-gray-700 dark:text-gray-200 ">
              We strive for the highest standards in everything we deliver.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
