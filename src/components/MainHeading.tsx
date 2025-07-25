interface MainHeadingProps {
  title: string;
  subTitle: string;
}

const MainHeading = ({ title, subTitle }: MainHeadingProps) => {
  return (
    <>
      <span className="uppercase text-gray-500 font-semibold leading-4">
        {subTitle}
      </span>
      <h2 className="text-red-500 font-bold text-3xl sm:text-4xl italic">{title}</h2>
    </>
  );
};

export default MainHeading;
