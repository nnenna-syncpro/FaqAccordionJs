"use client";
import IconMinus from "@/assets/images/icon-minus.svg";
import IconPlus from "@/assets/images/icon-plus.svg";
import IconStar from "@/assets/images/icon-star.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  //create state for each accordion item and expand/collapse all
  const [isOpen, setOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //check if any state changes to true
  const isSomeOpen = isOpen.some((item) => item);

  //handle toggle for all states including expand/collapse all
  const toggleOpen = () => {
    //if any state is true change it to false and vice versa
    isSomeOpen
      ? setOpen([false, false, false, false, false, false, false])
      : setOpen([true, true, true, true, true, true, true]);
  };

  return (
    <main className="min-h-screen relative p-4 pb-10 bg-purple-600">
      <Search />
      <Faq
        handleToggle={toggleOpen}
        isOpen={isSomeOpen}
        faqs={faqs}
        active={isOpen}
        setOpen={setOpen}
      />
    </main>
  );
}

const faqs = [
  {
    question: "What is Next.js?",
    answer: "Next.js is a React framework for building web applications.",
    id: 1,
  },
  {
    question: "How does Tailwind CSS work?",
    answer:
      "Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.",
    id: 2,
  },
  {
    question: "What is the purpose of getStaticProps?",
    answer: "getStaticProps is used to fetch data at build time in Next.js.",
    id: 3,
  },
];

function Faq({ handleToggle, isOpen, faqs, active, setOpen }) {
  return (
    <section className="relative bg-white mx-auto max-w-sm sm:max-w-4xl rounded-xl flex flex-col gap-4 mt-10 md:mt-35 p-5">
      {/* max width on mobile screens is 320px and 768px on larger screens */}
      <h1 className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image src={IconStar} alt="star-icon" className="h-9 w-auto"></Image>
          <span className="font-bold text-4xl">FAQs</span>
        </div>
        <div onClick={handleToggle} className="flex justify-end text-base">
          <button className="flex gap-3">
            <span className="hidden sm:block">
              {isOpen ? "Collapse All" : "Expand All"}
            </span>
            <div>
              {isOpen ? (
                <Image
                  src={IconMinus}
                  alt="minus-icon"
                  className="h-6 w-auto"
                ></Image>
              ) : (
                <Image
                  src={IconPlus}
                  alt="plus-icon"
                  className="h-6 w-auto"
                ></Image>
              )}
            </div>
          </button>
        </div>
      </h1>
      <div>
        {faqs.map((faq, i) => (
          <Accordian
            question={faq.question}
            answer={faq.answer}
            key={i}
            id={faq.id}
            active={active}
            setOpen={setOpen}
          />
        ))}
      </div>
    </section>
  );
}

function Accordian({ question, answer, id, active, setOpen }) {
  const toggleAccordionOpen = () => {
    //keep a copy of the isOpen array in state
    let isActive = [...active];
    //change the state of one item
    isActive[id] = !isActive[id];
    //set the new state
    setOpen(isActive);
  };

  const [animationParent] = useAutoAnimate();

  return (
    <div ref={animationParent} className="flex flex-col gap-4 py-4">
      {/* question */}
      <div
        onClick={toggleAccordionOpen}
        className="flex justify-between cursor-pointer font-semibold text-xl md:text-2xl"
      >
        <span>{question}</span>
        <div>
          {active[id] ? (
            <Image
              src={IconMinus}
              alt="minus-icon"
              className="h-6 w-auto"
            ></Image>
          ) : (
            <Image
              src={IconPlus}
              alt="plus-icon"
              className="h-6 w-auto"
            ></Image>
          )}
        </div>
      </div>
      {/* if accordion is open then show answer */}

      {active[id] && (
        <div>
          <p className="text-base md:text-lg text-gray-500 pb-3">{answer}</p>
        </div>
      )}
    </div>
  );
}

function Search() {
  return (
    <section className="relative bg-white mx-auto max-w-sm sm:max-w-4xl rounded-xl mt-10 p-3">
      <input
        className="text-base md:text-lg text-gray-500 focus:outline-none cursor-pointer w-full"
        type="search"
        required
        placeholder="Search..."
      ></input>
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 p-3 rounded-full"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
      </button>
    </section>
  );
}
