import React from "react";

const Footer = () => (
  <footer className="w-full py-6 bg-gradient-to-t from-violet-200 to-white dark:from-violet-900 dark:to-black text-center text-gray-800 dark:text-purple-200 text-sm mt-12">
    &copy; {new Date().getFullYear()} Manodya Dissanayake. All rights reserved.
  </footer>
);

export default Footer; 