// @ts-nocheck

import ncc from "@/app/assets/ncc.jpg"
import camp from "@/app/assets/camp.jpeg"
import camp2 from "@/app/assets/camp2.jpg"
import React from "react";
import Image from 'next/image';

const NCCSEA: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-950 font-mono">
      <header className="bg-navy-blue text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">NCCSEA (National Cadet Corps Sea) - My CCA</h1>
          <p className="text-xl">Developing leadership, discipline, and teamwork through maritime activities</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-6 text-white">
            The NCC Sea Cadet Corps is part of the National Cadet Corps in Singapore, which focuses on
            developing leadership, discipline, and teamwork through various maritime-related activities. 
            As a cadet in NCCSEA, we engage in a wide range of training sessions, physical activities, 
            and leadership programs.
          </p>
          <Image src = {ncc} alt = "" height = {500} width = {500}></Image>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-white">My Role and Responsibilities</h2>
          <p className="mb-4 text-white">As a cadet in NCCSEA, I have been involved in several key activities:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-white">
            <li>Participating in weekly training sessions focused on maritime knowledge.</li>
            <li>Taking part in leadership and team-building exercises.</li>
            <li>Helping to organize and lead events during camps and training programs.</li>
            <li>Engaging in physical fitness drills to maintain discipline and stamina.</li>
          </ul>
        </section>

        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold mb-4 text-black">Skills Gained</h2>
          <p className="mb-4">Through my involvement in NCCSEA, I have developed a variety of valuable skills, including:</p>
          <div className="grid md:grid-cols-2 gap-4 text-white">
            {[
              { skill: "Leadership", description: "Taking charge of group activities" },
              { skill: "Discipline", description: "Enhanced time management through regular drills and training" },
              { skill: "Teamwork", description: "Improved skills working closely with peers to achieve common goals" },
              { skill: "Confidence", description: "Increased confidence in public speaking and handling responsibility" }
            ].map((item, index) => (
              <div key={index} className="bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-white">{item.skill}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-white">Events and Camps</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="mb-4">
              One of the most memorable experiences was the annual NCCSEA camp, where I had the chance to
              showcase my leadership skills and work as part of a team. These events are essential to our
              training, offering us a chance to develop practical skills and build camaraderie.
            </p>
            <div className="flex justify-between">
            <Image src = {camp} alt = "" height = {600} width = {600}></Image>
            <Image src = {camp2} alt = "" height = {500} width = {500}></Image>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-white">Conclusion</h2>
          <div className="bg-navy-blue text-white p-6 rounded-lg shadow-md">
            <p className="text-lg leading-relaxed">
              Overall, NCCSEA has been an enriching experience for me, providing me with a strong sense of
              discipline, responsibility, and leadership. It has significantly shaped my personal growth and
              has prepared me for future challenges.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-navy-blue text-white py-6 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 NCCSEA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NCCSEA;

