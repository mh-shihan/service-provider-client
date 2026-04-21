import { Helmet } from "react-helmet";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SectionBanner from "../../components/SectionBanner";
import useProviders from "../../hooks/useProviders";

import { useState } from "react";
import Cart from "../../components/Cart";
import SectionTitle from "../../components/SectionTitle";
import useCategories from "../../hooks/useCategories";

const OurServices = () => {
  const [providers, providersLoading] = useProviders();
  const [categories, categoriesLoading] = useCategories();
  const [tabIndex, setTabIndex] = useState(0);

  if (providersLoading || categoriesLoading)
    return (
      <div className="text-center pt-[40%] h-screen">
        <span className="loading loading-ball w-[80px] text-primary-400 "></span>
      </div>
    );

  return (
    <section className="pt-28 min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100/60 pb-10">
      <div className="-mt-20 max-w-screen-2xl mx-auto px-4 md:px-8">
        <Helmet>
          <title>Our services</title>
        </Helmet>

        <SectionBanner
          title="All Provider "
          img="https://res.cloudinary.com/dipwayvsu/image/upload/v1752424089/qssw8yvorfmhnynnbphi.avif"
          alt="Section banner"
        ></SectionBanner>
        <div className="lg:px-20 md:px-12 px-0">
          <SectionTitle
            heading="All Providers"
            subHeading="Browse what you need"
          ></SectionTitle>
          {/* <p className="text-2xl font-semibold text-center my-10 dark:text-white text-dark-900">
          Browse through the Provider categories
        </p> */}
          <div>
            <Tabs
              defaultIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <div className="text-center">
                <TabList>
                  {categories.map((category, index) => (
                    <Tab key={index}>{category.serviceProviderType}</Tab>
                  ))}
                </TabList>
              </div>
              <div className="my-5">
                {categories.map((category) => (
                  <TabPanel key={category._id}>
                    <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                      {providers
                        .filter(
                          (provider) =>
                            provider.category === category.serviceProviderType
                        )
                        .map((item) => (
                          <Cart key={item._id} provider={item}></Cart>
                        ))}
                    </div>
                  </TabPanel>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
