'use client';
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReactLenis from "lenis/react";


const ScrollAnimation = () => {
  const redDivRef = useRef(null);

  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Timeline for moving the image up
    const moveUp = gsap.timeline({
      scrollTrigger: {
        trigger: redDivRef.current,
        start: "-170% 10%", // Adjust start point
        end: "top 30%", // Adjust end point
        scrub: true,
        markers: true,
      },
    });

    moveUp.to(redDivRef.current, {
      y: "-100%", // Moves up by 100%
      x: "50%", // Moves right by 50%
      ease: "power2.inOut",
    });

    // Timeline for moving the image down
    const moveDown = gsap.timeline({
      scrollTrigger: {
        trigger: redDivRef.current,
        start: "0% 30%", // Starts after the first timeline ends
        end: "300% 50%", // Adjust end point for desired effect
        scrub: true,
        markers: true,
      },
    });

    moveDown.to(redDivRef.current, {
      y: "350%", // Moves down by 350%
      x: "150%", // Moves further to the right
      scale: 2,  // Increases size
      zIndex: 1100,
      ease: "power2.inOut",
    });
  }, { scope: redDivRef });

  return (
    <>
      <ReactLenis root>
        <section className='grid justify-center w-full h-[100vh] items-center'>
          <div className='relative'>
            <img className='w-56 relative z-0' src="/assets/up.png" alt="" />
            <img className='w-56 relative z-10' src="/assets/bottom.png" alt="" />
            <img ref={redDivRef} className='absolute w-[4.5rem] top-6 left-32' src="/assets/earpopsingle.png" alt="" />
          </div>
        </section>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla consequuntur ea dolore veritatis voluptas officiis. Voluptatem fugit deserunt numquam eius reiciendis neque ut placeat architecto atque officiis debitis, iste delectus, eveniet nobis impedit quo ratione iure! In possimus magnam facilis nesciunt, consequuntur deserunt perspiciatis, dolor impedit, commodi modi itaque dolores eius cupiditate. Dolor maiores repudiandae sapiente tempore nobis nesciunt. Neque deserunt quibusdam maiores nemo officiis odio quasi tempora voluptatem dignissimos sint reprehenderit repellat veritatis a itaque ullam, cum reiciendis. Inventore eveniet ipsam quo, fugiat officiis cupiditate neque iusto ipsum corporis molestiae. Corrupti officia exercitationem non totam aliquam nisi at molestias ad! Aspernatur voluptas fugit quam cumque, error voluptatibus consectetur eum ducimus repellat ex modi enim omnis, similique numquam tenetur architecto dolorem perspiciatis magni. Dolore, autem architecto. Incidunt saepe cumque dicta deleniti cum natus esse sit alias quia magni nulla ducimus perspiciatis ea possimus exercitationem ratione neque sequi rem quos dolor officia nostrum, ex architecto! Et molestias provident amet vero fugiat nostrum quo corporis veritatis rerum, sunt consectetur tenetur doloremque dolor atque. Doloremque est praesentium porro soluta consectetur perferendis reprehenderit sequi placeat aliquam delectus, vero cumque totam vitae facere commodi asperiores magni quibusdam quisquam. Illo laborum, distinctio fugit nihil nisi reprehenderit iusto voluptas cumque, accusantium eligendi pariatur magnam rem laboriosam modi. Deserunt excepturi beatae ratione delectus facilis? Aliquam deserunt pariatur officia illum, laborum placeat cupiditate saepe id sed aliquid provident eius iusto veniam atque dolorum necessitatibus repellendus exercitationem animi voluptate dolorem! Aliquid veritatis dolorem eum, dolore quasi quia, tenetur aut amet rerum numquam, corrupti tempora earum? Odio impedit iusto distinctio quos explicabo tempore dolores praesentium corporis nesciunt, esse, quo delectus suscipit et velit sunt facilis doloribus! Ipsum, mollitia tempora quasi iusto eveniet architecto, doloremque tempore blanditiis minus accusamus similique culpa. Eligendi beatae molestias aut quia libero doloremque id, unde labore molestiae ratione sapiente nam nulla quisquam itaque amet dicta nihil. Delectus eaque debitis omnis, qui blanditiis dignissimos commodi nostrum dolorum. Consequatur enim aspernatur impedit! Et dicta harum, minus porro soluta itaque, perspiciatis doloremque cumque labore provident optio? Earum nam soluta iste debitis quia officiis molestiae ad? Est ducimus, pariatur, consequuntur optio maiores sunt aliquid rem, ut quam explicabo libero accusamus! Quod, optio? Voluptatibus impedit eos fuga assumenda a beatae sapiente corporis quis temporibus, officiis, doloribus rerum eveniet at ab optio saepe architecto commodi soluta. Id voluptas ea blanditiis voluptate, nobis quidem, asperiores ipsum nesciunt corrupti qui sequi totam rem, excepturi quo cumque reiciendis in nisi ratione aperiam ducimus exercitationem minima! Totam facere inventore debitis nihil quas expedita iure nemo aperiam. Nisi iusto, temporibus accusamus quod aliquid perspiciatis cumque voluptate porro repudiandae distinctio omnis ipsam alias quaerat vitae nam enim possimus recusandae laudantium provident ipsum quibusdam! Dolorum expedita iure aut velit, atque optio soluta fuga odit dolor placeat deserunt, asperiores, necessitatibus fugit illum distinctio laboriosam. Repudiandae beatae earum quasi porro dolore. Fuga maiores veniam ducimus tempora. Aliquam illum, dolor nemo placeat quae blanditiis iusto cumque aut officiis, magni repudiandae culpa deserunt quaerat nulla omnis libero corporis est dolore possimus? Quibusdam, iste veritatis.</p>
      </ReactLenis>
    </>
  );
};

export default ScrollAnimation;
