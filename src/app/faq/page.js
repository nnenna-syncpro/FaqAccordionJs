"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export default function Home() {
  //use state to manage all faqs
  const [faqList] = useState(faqs);
  //handle search term using search params
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  //filter FAQs list using search term. But only when faqs or search term changes
  const filteredFaqList = useMemo(() => {
    return faqList.filter((faq) => {
      if (searchQuery !== null) {
        return faq.question.toLowerCase().includes(searchQuery.toLowerCase());
      } else {
        return faqList;
      }
    });
  }, [faqList, searchQuery]);

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
        faqs={filteredFaqList}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            fill="none"
            viewBox="0 0 40 41"
          >
            <path
              fill="#AD28EB"
              d="M37.5 20.5a2.467 2.467 0 0 1-1.64 2.344l-9.913 3.604-3.603 9.911a2.5 2.5 0 0 1-4.688 0l-3.604-9.922-9.911-3.593a2.5 2.5 0 0 1 0-4.688l9.921-3.604 3.594-9.911a2.5 2.5 0 0 1 4.688 0l3.604 9.921 9.911 3.594A2.467 2.467 0 0 1 37.5 20.5Z"
            />
          </svg>
          <span className="font-bold text-4xl">FAQs</span>
        </div>
        <div onClick={handleToggle} className="flex justify-end text-base">
          <button className="flex gap-3">
            <span className="hidden sm:block">
              {isOpen ? "Collapse All" : "Expand All"}
            </span>
            <div>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 30 31"
                >
                  <path
                    fill="#301534"
                    d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.2 12.2 0 0 0 15 3.312Zm4.688 13.124h-9.375a.938.938 0 0 1 0-1.875h9.374a.938.938 0 0 1 0 1.876Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 30 31"
                >
                  <path
                    fill="#AD28EB"
                    d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z"
                  />
                </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 30 31"
            >
              <path
                fill="#301534"
                d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.2 12.2 0 0 0 15 3.312Zm4.688 13.124h-9.375a.938.938 0 0 1 0-1.875h9.374a.938.938 0 0 1 0 1.876Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 30 31"
            >
              <path
                fill="#AD28EB"
                d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z"
              />
            </svg>
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //keep input value after refresh
  const searchTerm = searchParams.get("search") ?? "";

  const searchHandler = (value) => {
    console.log(value);

    //create a search param that you can modify
    const query = new URLSearchParams(searchParams);

    //if theres no search value remove ?search= from url and vice versa
    if (value.trim() === "") {
      query.delete("search");
    } else {
      query.set("search", value);
    }

    //write the query string /?search=value to url
    router.push(`${pathname}?${query.toString()}`);
  };

  const debounce = useDebounceCallback(searchHandler, 500);

  return (
    <section className="relative bg-white mx-auto max-w-sm sm:max-w-4xl rounded-xl mt-10 p-3">
      <input
        className="text-base md:text-lg text-gray-500 focus:outline-none cursor-pointer w-full"
        type="search"
        required
        placeholder="Search..."
        onChange={(e) => debounce(e.target.value)}
        defaultValue={searchTerm}
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
