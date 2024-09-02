'use client';
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ScrollAnimation = () => {
    const redDivRef = useRef(null);

    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        // Create an animation that moves the div based on scroll
        gsap.fromTo(
            redDivRef.current,
            {
                // Initial state of the div
                top: "0%",
                left: "0%",
                opacity: 1,
            },
            {
                // Final state of the div based on scroll
                top: "10%",     // Adjust as needed to control the amount of vertical movement
                left: "50%",   // Adjust as needed to control the amount of horizontal movement
                ease: "none",   // No easing, movement is directly tied to scroll
                scrollTrigger: {
                    trigger: redDivRef.current, // Element that triggers the animation
                    start: "10% 0%",
                    end: "50% 10%",   // End when the bottom of the element is at 10% of the viewport height
                    scrub: true,         // Smoothly animate in sync with scroll position
                    markers: true,       // Markers for debugging (remove in production)
                },
            }
        );

        return () => {
            // Cleanup animation on component unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <>
            <div className="w-full h-[100vh]">
                <div
                    ref={redDivRef} 
                    style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "red",
                        position: "absolute",
                        top: "0%",  // Adjust starting top position as needed
                        right: "0%", // Adjust starting right position as needed
                    }}
                >
                    Animated Div
                </div>
            </div>
        </>
    );
};

export default ScrollAnimation;
