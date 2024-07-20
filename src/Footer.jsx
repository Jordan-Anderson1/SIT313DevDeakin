import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter, FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <div className="grid grid-cols-3 justify-between gap-6  p-6 bg-gray-200">
        <div>
          <h1 className="text-center text-2xl">Explore</h1>
          <ul className="text-center my-6 space-y-2">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/questions">Questions</a>
            </li>
            <li>
              <a href="/articles">Articles</a>
            </li>
            <li>
              <a href="/tutorials">Tutorials</a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-center text-2xl">Support</h1>
          <ul className="text-center my-6 space-y-2">
            <li>
              <a href="/faq">FAQs</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-center text-2xl">Stay Connected</h1>

          <ul className="flex items-center justify-center my-6 gap-2">
            <li>
              <a href="/facebook">
                <FaFacebookSquare size={45} color="blue" />
              </a>
            </li>
            <li>
              <a href="/twitter">
                <FaSquareTwitter size={45} color="navy" />
              </a>
            </li>
            <li>
              <a href="/instagram">
                <FaSquareInstagram size={45} className="text-red-500" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
