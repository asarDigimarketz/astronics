"use client";

import "bootstrap/dist/css/bootstrap.min.css";

// components/Counter.js

import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./counter.css";

const formatNumber = (number) => {
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`;
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`;
  } else {
    return number.toString();
  }
};

const CounterItem = ({ label, count, unit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Animation setup
  const props = useSpring({
    number: isVisible ? count : 0,
    from: { number: 0 },
    config: { duration: 2000 },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md lightclr"
      aria-label={`${label}: ${formatNumber(count)}${unit ? " " + unit : ""}`}
    >
      <animated.h3 className="text-4xl font-bold text-danger">
        {props.number.to(
          (n) => `${formatNumber(Math.floor(n))}${unit ? " " + unit : ""}`
        )}
      </animated.h3>
      <p className="text-lg text-gray-600 text-white">{label}</p>
    </div>
  );
};

const Counter = () => {
  const counters = [
    { label: "Sales", count: 120, unit: "K" },
    { label: "Users", count: 800, unit: "M" },
    { label: "Projects", count: 45, unit: "" },
    { label: "Reviews", count: 200, unit: "%" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {counters.map((item, index) => (
        <CounterItem
          key={index}
          label={item.label}
          count={item.count}
          unit={item.unit}
        />
      ))}
    </div>
  );
};

export default Counter;
