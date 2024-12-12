"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import bed from "@/app/assets/bed.jpeg"
import React from "react";
import { Vortex } from "@/components/ui/vortex";
 

export default function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote:
                "I'm quite sleepy most of the time so I usually will just go to my bed and just sleep whenever I feel tired.",
            name: "Sleeping",
            designation: "Yes I Love My Bed",
            src: "/image/bed.jpg"
        },
        {
            quote:
                "Chcken rice has been my favourite food since young, the fragrance of the rice, the chicken, it is all very tasty and I love it.",
            name: "My Favourite Food",
            designation: "Chicken Rice",
            src: "/image/chicken.jpg"
        },
        {
            quote:
                "Cycling is usually my form of transport, exercise and a way to relieve my stress. It keeps me alive and refreshed whenever the wind blows to my face.",
            name: "Cycling",
            designation: "Bicycle",
            src: "/image/bike.jpg"
        },

    ];
    return (

    <div className="mx-auto overflow-auto min-h-fit text-black dark:text-white">
    <Vortex
      backgroundColor=" bg-transparent "
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-dvh"
    >
      <AnimatedTestimonials testimonials={testimonials} />;

    </Vortex>
    </div>
    )
}
