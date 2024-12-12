// @ts-nocheck
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Bike from "@/app/assets/Bike.jpg";
import React from "react";
import Image from "next/image";

// AboutMe Component
const AboutMe: React.FC = () => {
  return (
    <BackgroundBeamsWithCollision className="!min-h-full">
      <div style={styles.container}>
        <header style={styles.header}>
          <h1></h1>
        </header>

        <section style={styles.introduction}>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Hi, I'm Lucas!
          </h1>
          <p className="text-black dark:text-white">
            I love cycling as a hobby because I got to meet many new friends
            through it and explored places I've never been to in Singapore.
          </p>
        </section>

        <section
          style={styles.hobbies}
          className="flex gap-4 flex-col-reverse md:flex-row"
        >
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              What Bike Do I Ride?
            </h2>
            <div style={styles.hobbyList}>
              <div style={styles.hobbyItem} className="md:w-1/2">
                <h3 className="text-black dark:text-white">Fixed Gear Bike</h3>
                <p className="text-black dark:text-white">
                  A fixed gear bike is a very unique bike that only has one gear
                  and has no brakes and you stop by applying pressure on the
                  paddles as the pedals won't stop moving.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image src={Bike} alt="" height={1200} width={1200}></Image>
          </div>
        </section>

        <section style={styles.contact}>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Add me On Social Media!
          </h2>
          <p className="text-black dark:text-white">
            Follow me on Instagram @_1uc45_133_
          </p>
          <p className="text-black dark:text-white">
            Follow me on Tik Tok @45_degree
          </p>
        </section>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

// Inline styles object
const styles = {
  container: {
    width: "150%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Courier New, monospace",
    color: "#FFFFFF",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  headerTitle: {
    fontSize: "3rem",
    color: "#4CAF50",
  },
  introduction: {
    marginBottom: "30px",
  },
  introductionText: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
  },
  hobbies: {
    marginBottom: "30px",
  },
  hobbyList: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  hobbyItem: {
    marginBottom: "20px",
  },
  hobbyItemTitle: {
    fontSize: "1.5rem",
    color: "#00796b",
    marginBottom: "10px",
  },
  hobbyItemText: {
    fontSize: "1rem",
    color: "#555",
  },
  contact: {
    marginTop: "30px",
    textAlign: "center",
  },
  contactLink: {
    color: "#00796b",
    textDecoration: "none",
    fontWeight: "bold",
  },
  contactLinkHover: {
    textDecoration: "underline",
  },
};

export default AboutMe;
