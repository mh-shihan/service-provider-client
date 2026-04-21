import { Link, useLocation } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { Helmet } from "react-helmet";

const FullProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabName = ["Overview", "Location", "Review", "Business Hours"];
  const location = useLocation();
  const { provider, category } = location.state || {};
  // console.log(provider.totalReview);
  if (!provider || !category)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <span className="loading loading-spinner loading-lg text-primary-500 scale-150 animate-pulse"></span>
      </div>
    );
  console.log("Provider Data:", provider);
  return (
    <>
      <Helmet>
        <title>Full Profile</title>
      </Helmet>
      <div className="relative min-h-screen py-12 px-2 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 flex flex-col items-center">
        <div className="relative w-full max-w-7xl mx-auto mt-[-60px] z-10">
          <div className="mt-52 pb-32 backdrop-blur-xl bg-white/80 dark:bg-dark-800/80 rounded-3xl shadow-2xl border border-primary-100 dark:border-dark-700 px-6 md:px-12 py-10 flex flex-col gap-10 animate-fade-in-up">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <div className="relative -mt-32 mb-4 md:mb-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary-400 dark:border-primary-700 shadow-xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-300 dark:from-dark-700 dark:to-dark-900">
                  <img
                    src={provider.userImg}
                    alt={provider.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold animate-bounce">
                    {provider.category}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h1 className="text-3xl md:text-5xl font-extrabold text-center md:text-left mb-2 tracking-tight text-black dark:text-white">
                  {provider.name}
                </h1>
                <p className="py-2 text-lg text-primary-700 dark:text-primary-500 font-semibold text-center md:text-left">
                  {provider.qualification}
                </p>
                <div className="flex gap-2 items-center justify-center md:justify-start mb-2">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={provider.rating}
                    readOnly
                  />
                  <p className="text-gray-500 dark:text-gray-300">
                    ({provider.totalReview})
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {provider.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 dark:bg-dark-400 dark:text-primary-500 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <Link
                  to="/appointment"
                  state={{ bookingBtnCategory: category }}
                  className="btn bg-gradient-to-r from-primary-500 to-primary-700 text-white border-none shadow-lg hover:scale-105 hover:from-primary-600 hover:to-primary-800 transition-all duration-200 text-md font-bold py-3 rounded-full mt-2"
                >
                  Book Now
                </Link>
              </div>
            </div>
            {/* Tabs Section */}
            <div className="w-full mt-4">
              <Tabs
                defaultIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
              >
                <div className="text-center">
                  <TabList className="flex flex-wrap justify-center gap-2 border-b border-primary-100 dark:border-dark-700 pb-2">
                    {tabName.map((name, index) => (
                      <Tab
                        key={index}
                        className="px-4 py-2 text-md font-semibold rounded-t-lg cursor-pointer focus:outline-none transition-all duration-200 border-b-2 border-transparent data-[selected]:border-primary-600 data-[selected]:text-primary-700 data-[selected]:dark:text-primary-300 data-[selected]:bg-primary-50/60 data-[selected]:dark:bg-dark-700/60"
                      >
                        {name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <div className="mt-10">
                  {/* Overview */}
                  <TabPanel>
                    <div className="max-w-[95%] md:max-w-[90%] mx-auto">
                      <p className="font-bold text-xl mb-2 text-black dark:text-white">
                        About Me
                      </p>
                      <p className="mb-6 text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                        {provider.about}
                      </p>
                      <div className="md:flex mt-5 gap-8">
                        <div className="flex-1 md:space-y-10 space-y-5">
                          <div>
                            <p className="font-bold text-xl mb-2 text-gray-700 dark:text-gray-200 ">
                              Education
                            </p>
                            {provider.education.map((education, index) => (
                              <div key={index} className="py-2">
                                <p className="font-bold text-sm text-gray-700 dark:text-gray-200 ">
                                  {education.institution}
                                </p>
                                <p className="text-gray-700 dark:text-gray-200 ">
                                  {education.degree}
                                </p>
                                <p className="text-gray-700 dark:text-gray-200 ">
                                  {education.time}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="font-bold text-xl mb-2 text-gray-700 dark:text-gray-200 ">
                              Working Experience
                            </p>
                            {provider.workingExperience.map(
                              (workingExperience, index) => (
                                <div key={index} className="py-2">
                                  <p className="text-gray-700 dark:text-gray-200 ">
                                    {workingExperience}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-xl mb-2 text-gray-700 dark:text-gray-200 ">
                              Services
                            </p>
                            {provider.services.map((services, index) => (
                              <div key={index} className="py-2">
                                <p className="text-gray-700 dark:text-gray-200 ">
                                  {services}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div>
                            <p className="font-bold text-xl mb-2 text-gray-700 dark:text-gray-200 ">
                              Rewards
                            </p>
                            {provider.rewards.map((rewards, index) => (
                              <div key={index} className="py-2">
                                <p className="font-bold text-sm text-gray-700 dark:text-gray-200 ">
                                  {rewards.name}
                                </p>
                                <p className="text-gray-700 dark:text-gray-200 ">
                                  {rewards.date}
                                </p>
                                <p className="text-gray-700 dark:text-gray-200 ">
                                  {rewards.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  {/* Location */}
                  <TabPanel>
                    <div>
                      <h2 className="text-lg font-bold text-center text-gray-700 dark:text-gray-200 ">
                        Location
                      </h2>
                      <p className="text-sm text-center text-gray-700 dark:text-gray-200 ">
                        {provider.location}
                      </p>
                      <div className="max-w-[95%] md:max-w-[90%] mx-auto mt-5 md:mt-10 rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            provider.location
                          )}&output=embed`}
                          width="100%"
                          height="400"
                          allowFullScreen=""
                          loading="lazy"
                          title="Provider Location"
                          className="rounded-2xl w-full h-80 border-none"
                        ></iframe>
                      </div>
                    </div>
                  </TabPanel>
                  {/* Reviews */}
                  <TabPanel>
                    <div>
                      <p className="font-bold text-xl mb-2 text-gray-700 dark:text-gray-200 ">
                        Reviews
                      </p>
                      <p className="text-gray-700 dark:text-gray-200">
                        No reviews yet.
                      </p>
                    </div>
                  </TabPanel>
                  {/* Business Hours */}
                  <TabPanel>
                    <div className="w-[95%] md:max-w-[50%] mx-auto">
                      <h2 className="text-lg font-bold text-center mb-4 text-gray-700 dark:text-gray-200 ">
                        Business Hours
                      </h2>
                      {Object.entries(provider.timeTable).map(
                        ([day, timing], index) => (
                          <div
                            key={index}
                            className="flex justify-between py-2 border-b border-primary-100 dark:border-dark-700"
                          >
                            <p className="font-medium text-gray-700 dark:text-gray-200 ">
                              {day}
                            </p>
                            <p className="text-gray-700 dark:text-gray-200 ">
                              {timing}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullProfile;
