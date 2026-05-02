import { useEffect, useRef, useState } from "react";

export default function FaqItem({ faq, index, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="border-b border-stone-200 group"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-6 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`tracking-wide font-crimson-text text-lg transition-colors duration-300 ${
            isOpen ? "text-stone-900" : "text-black"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-stone-400 transition-all duration-300 ${
            isOpen ? "rotate-45" : "rotate-0 group-hover:text-stone-700"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={answerRef}
          className={`pb-5 text-sm text-stone-500 leading-relaxed pr-8 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
