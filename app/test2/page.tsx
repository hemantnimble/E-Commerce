'use client';
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
const ScrollAnimation = () => {
    const redDivRef = useRef(null);

    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: redDivRef.current,
                start: "-160% 0%",
                end: "700% 100%",
                markers: true,
                scrub: true,
            },
        });
        tl.to(redDivRef.current, 1, {
            x: "150%",
            y:"350%",
            ease: "power2.inOut",
        });
    }, { scope: redDivRef });

    return (
        <>
            <section className='grid justify-center w-full h-[100vh] items-center'>
                <div className='relative'>
                    <img className='w-56' src="/assets/earpodbox.png" alt="" />
                    <img ref={redDivRef} className='absolute w-16 -top-8 left-32' src="/assets/earpopsingle.png" alt="" />
                </div>
            </section>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officia omnis enim numquam consectetur ut voluptatem optio qui facilis non tenetur libero reiciendis explicabo eos, ipsa eum aut dolorem ea, quasi facere illum obcaecati quo ab! Consequuntur, iste atque. Dolorem, minus iure velit voluptatem voluptate porro nisi expedita possimus officiis id hic accusantium impedit itaque consequatur quasi deserunt, et omnis laudantium? Excepturi libero blanditiis totam voluptas culpa eum fugit pariatur, adipisci cumque labore minus neque eveniet ab sed tempora officiis consequatur sequi autem aliquid molestiae. Sequi ullam, aperiam fugit quidem at numquam, quis maxime harum quasi non earum modi cum labore aliquid qui doloribus. Sapiente dolorem saepe neque rerum deserunt praesentium corrupti facilis vero nam cum itaque, commodi molestias, facere, consequatur quas recusandae voluptas? In cumque neque consectetur! Fuga, exercitationem adipisci nostrum a dicta odio expedita iure iste, dolores, et rem aspernatur voluptatum minima fugiat molestias provident pariatur itaque omnis. Nam voluptatum, cupiditate, sunt assumenda a quas in fuga dolor similique soluta laboriosam ipsum. Saepe sed molestias commodi distinctio. Totam cumque deleniti ullam quasi impedit, quos corrupti dolore. Magnam harum quos nisi ipsam ratione minus ex officiis vero dignissimos laboriosam, nostrum aliquid in perferendis. Dolorem exercitationem quisquam ipsa deleniti eos, fugit ut deserunt, quis quam dolore nemo iure quidem. Perspiciatis sed soluta optio, ad adipisci saepe iure facere unde deleniti dolorem tempore rem eaque eveniet dolores aspernatur omnis aut! Sit dolorum saepe recusandae doloremque ullam! Dignissimos unde quidem praesentium suscipit amet, quae nobis numquam autem repudiandae quas dolorum modi sapiente aliquam vitae sint porro debitis enim nihil possimus ipsum aut atque nesciunt blanditiis voluptas. Quos corporis laborum natus deleniti qui a quasi ipsa voluptatem molestias officia? Odit deserunt a sunt nemo, fuga libero aliquid doloribus ex dolore, perferendis consequatur quo. Nobis ipsam reiciendis magni esse, vero maxime ex consequatur at eum delectus praesentium consectetur magnam veniam officia, pariatur quam neque rem. Libero ex optio, laboriosam voluptas excepturi doloremque pariatur. Enim, culpa! Fugit blanditiis, inventore, qui exercitationem quibusdam nostrum esse harum nisi quam, dolorum officia voluptatum porro natus ducimus sit sequi sunt aut beatae reprehenderit? Labore, rerum cumque iure quas eius sapiente praesentium rem quo, suscipit quos blanditiis assumenda? Quo, nesciunt reiciendis? Illum similique, quasi asperiores quidem nulla earum ullam! Quibusdam vel, pariatur corrupti quisquam consectetur illum esse, cumque, accusantium officiis enim neque repellendus culpa? Minus placeat assumenda ex, libero maxime, unde maiores, aut corporis aliquid numquam similique. Iure numquam atque pariatur iste, esse voluptatem quas corporis odit laudantium. Officiis ad aperiam ullam quos consequatur sint at ea eaque voluptate cumque accusantium repellendus repudiandae veniam nesciunt atque nemo suscipit dolores molestiae, dolor ducimus! Distinctio, atque sunt, fugiat facere nihil quam accusantium incidunt minima voluptates sapiente delectus ducimus rem! Aliquid, sit culpa! Doloribus, fugiat accusantium amet ut natus obcaecati impedit quasi nisi perferendis repellat modi dolorum numquam omnis, nihil laborum quod. Deserunt ad molestias voluptate perferendis iure laudantium id alias modi repudiandae officia consectetur, libero mollitia accusamus fugiat tempora consequuntur quaerat nisi voluptas nulla vero, quidem laborum! Dolores aliquam perferendis a numquam?</p>
        </>
    );
};

export default ScrollAnimation;


