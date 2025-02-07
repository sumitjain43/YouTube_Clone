import React, { useRef, useCallback } from "react";
import Button from "./Button";
import leftScrollIcon from "../assets/left-scroll.svg";
import rightScrollIcon from "../assets/right-scroll.svg";

const btnList = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Cricket",
  "News",
  "Bollywood",
  "Computer",
  "Scene",
  "Mixes",
  "History",
  "Programming",
  "Hollywood",
];

const ButtonList = () => {
  const scrollRef = useRef(null);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        const itemWidth = scrollRef.current.children[0]?.offsetWidth || 120;
        scrollRef.current.scrollBy({ left: direction * itemWidth * 3, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div className="flex ml-[300px] z-40 bg-white pb-2 items-center relative">
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll(-1)}
        className="hover:rounded-full w-10 h-10 absolute left-0 hover:bg-gray-100 z-50"
        aria-label="Scroll Left"
      >
        <img alt="Scroll Left" className="inline-block" src={leftScrollIcon} />
      </button>

      {/* Scrollable Button List */}
      <div ref={scrollRef} className="max-w-[86%] overflow-x-hidden flex mx-12 space-x-2">
        {btnList.map((btnName, index) => (
          <Button key={index} name={btnName} />
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll(1)}
        className="hover:rounded-full w-10 h-10 absolute right-0 hover:bg-gray-100 z-50"
        aria-label="Scroll Right"
      >
        <img alt="Scroll Right" className="inline-block" src={rightScrollIcon} />
      </button>
    </div>
  );
};

export default ButtonList;
