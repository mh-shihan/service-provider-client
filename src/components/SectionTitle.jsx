const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center max-w-7xl mx-auto space-y-2 my-10">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        {heading}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 italic">
        {subHeading}
      </p>
    </div>
  );
};
export default SectionTitle;
