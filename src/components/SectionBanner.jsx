const SectionBanner = ({ img, title, descriptions }) => {
  return (
    <div
      className="lg:px-[15%] md:px-[10%] px-[5%] lg:py-20 md:py-12 py-7 lg:mt-20 md:mt-12 mt-7 rounded-lg bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div
        className="
        bg-white dark:bg-dark-800 text-dark-900 dark:text-white lg:p-20 md:p-12 p-7 lg:space-y-8 md:space-y-5 space-y-3 
        rounded-lg opacity-85 hover:opacity-100 hover:duration-500
        "
      >
        <h1 className="text-4xl text-center lg:font-semibold">{title}</h1>
        {descriptions ? (
          <p className="text-center lg:px-5">{descriptions}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SectionBanner;
