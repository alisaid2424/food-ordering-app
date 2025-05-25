const Footer = () => {
  return (
    <footer className="flex items-center justify-center text-sm sm:text-base py-3 text-black bg-white bg-opacity-75 h-[50px] shadow-top-md">
      Copyright &copy; {new Date().getFullYear()} My Website. All rights
      reserved.
    </footer>
  );
};

export default Footer;
