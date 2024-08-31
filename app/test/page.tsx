'use client'
import Meteors from "@/components/magicui/meteors";
import TextReveal from "@/components/magicui/text-reveal";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { ConfettiButton } from "@/components/magicui/confetti";

import { useRef } from "react";

import type { ConfettiRef } from "@/components/magicui/confetti";
import Confetti from "@/components/magicui/confetti";

const Navbar = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  return (
    <>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Meteors number={30} />
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Meteors
        </span>
      </div>
      <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
        <TextReveal text="Magic UI will change the way you design." />
      </div>
      <VelocityScroll
        text="Velocity Scroll"
        default_velocity={5}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
      />
      <div className="relative">
        <ConfettiButton>Confetti 🎉</ConfettiButton>
      </div>


      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Confetti
        </span>

        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </div>
    </>
  );
};

export default Navbar;
