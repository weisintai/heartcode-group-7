import Snorlax from "@/app/assets/Snorlax.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { LinkPreview } from "@/components/ui/LinkPreview";

export default function Home() {
  const words = ["DRUGS", "WEED", "ICE", "CRACK", "CANNABIS"];
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-800 font-sans">
      <header className="bg-neutral-600 text-white text-center py-8">
        <h1 className="text-5xl font-mono font-bold mb-2 text-white">
          CHOOSE LIFE, NOT <FlipWords words={words} />
        </h1>
        <p className=" font-mono font-normal mb-4">
          Join Us In The Fight Against Drug Abuse And Help Create A Healthier,
          Drug-Free Future.
        </p>
        <Link
          href="#learn-more"
          className="bg-neutral-500 text-white px-6 py-2 rounded-md inline-block hover:bg-neutral-700 transition-colors"
        >
          Learn More Below
        </Link>
      </header>

      <main className="container mx-auto px-4">
        <section id="say-no-to-drugs" className="my-12 text-center">
          <h2 className="text-3xl font-bold font-mono text-black dark:text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Why Say No to Drugs?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-black dark:text-black ">
            {[
              {
                title: "Protect Your Brain",
                content:
                  "Drugs can severely impact brain function, affecting memory, learning, and decision-making abilities. Staying drug-free helps maintain cognitive health.",
              },
              {
                title: "Safeguard Your Health",
                content:
                  "Drugs can cause serious health problems, including heart disease, lung damage, and increased risk of infections. A drug-free life promotes overall well-being.",
              },
              {
                title: "Strengthen Relationships",
                content:
                  "Drug use often leads to strained relationships with family and friends. Staying drug-free helps maintain healthy, meaningful connections with loved ones.",
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="bg-white border-2 border-neutral-500 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-bold font-mono text-black dark:text-black mb-2">
                  {reason.title}
                </h3>
                <p>{reason.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="statistics" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-black dark:text-white border-b-2 border-neutral-500 pb-2 mb-6 text-center">
            Statistics and Facts
          </h2>
          <p className="text-lg mb-2 text-black dark:text-white">
            Did you know? Over <strong>200 million</strong> people worldwide use
            drugs at least once a year.
          </p>
          <p className="text-lgtext-black dark:text-white">
            In Singapore, the number of drug abusers arrested in 2023{" "}
            <strong>increased by 10%</strong> from 2022.
          </p>
        </section>

        <section id="stories" className="my-12">
          <h2 className="text-3xl font-bold font-monotext-black dark:text-white border-b-2 border-neutral-500 pb-2 mb-6 text-center">
            Personal Stories
          </h2>
          <p className="mb-4text-black dark:text-white mb-8">
            Read inspiring stories of individuals like Jeremy who have overcome
            addiction.
          </p>
          <LinkPreview url="https://www.getsmartaboutdrugs.gov/consequences/true-stories/true-story-jeremy-b">
            <Image src={Snorlax} alt="" height={100} width={100} />
          </LinkPreview>
        </section>

        <section id="prevention-articles" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-black dark:text-white border-b-2 border-neutral-500 pb-2 mb-6 text-center">
            Drug Prevention Articles
          </h2>
          <ul className="space-y-2">
            {[
              {
                title: "Preventive Drug Education in Singapore",
                url: "https://www.cnb.gov.sg/aseanpde/who-we-are/preventive-drug-education-approaches/singapore",
              },
              {
                title:
                  "Singapore Schools Include Anti-Drug Content in More Subjects",
                url: "https://www.todayonline.com/singapore/singapore-schools-include-anti-drug-content-more-subjects-amid-rise-young-abusers-2373096",
              },
              {
                title: "Keeping Singapore Drug-Free",
                url: "https://www.hometeamns.sg/frontline/keeping-singapore-drug-free/",
              },
            ].map((article, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md">
                <LinkPreview
                  url={article.url}
                  className="!text-black !hover:underline"
                >
                  {article.title}
                </LinkPreview>
              </li>
            ))}
          </ul>
        </section>

        <section id="support" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-black dark:text-white border-b-2 border-neutral-500 pb-2 mb-6 text-center">
            Support and Help
          </h2>
          <p className="mb-4 text-black dark:text-white">
            If you or someone you know needs help, contact our support services.
          </p>
          <ul className="space-y-2">
            <li className="bg-gray-100 p-3 rounded-md text-black">
              Hotline: 1-800-123-4567
            </li>
            <li className="bg-gray-100 p-3 rounded-md text-black">
              Support Groups: Find a local group
            </li>
            <li className="bg-gray-100 p-3 rounded-md text-black">
              Counseling Services: Available 24/7
            </li>
          </ul>
        </section>

        <section id="events" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-black dark:text-white border-b-2 border-neutra;-500 pb-2 mb-6 text-center">
            Events and Campaigns
          </h2>
          <h2 className="text-1x1 font-normal text-black dark:text-white text-center">
            Join our upcoming events and campaigns to raise awareness and
            support the cause{" "}
            <span>
              <LinkPreview
                url="https://www.sana.org.sg/events/"
                className="text-2x1 font-semibold text-black dark:text-white hover:underline"
              >
                here
              </LinkPreview>
              .
            </span>
          </h2>
        </section>

        <section id="find-out-more" className="my-12 text-center">
          <h2 className="text-3xl font-bold font-mono text-black dark:text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Find Out More About Anti-Drug Abuse
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-black dark:text-black ">
            {[
              {
                title: "Central Narcotics Bureau (CNB)",
                url: "https://www.cnb.gov.sg/",
                icon: "cnb-icon.png",
              },
              {
                title: "Singapore Anti-Narcotics Association (SANA)",
                url: "https://www.sana.org.sg/",
                icon: "sana-icon.png",
              },
              {
                title: "National Council Against Drug Abuse (NCADA)",
                url: "https://www.ncada.org.sg/",
                icon: "ncada-icon.png",
              },
              {
                title: "Ministry of Home Affairs – Keeping Singapore Drug-Free",
                url: "https://www.mha.gov.sg/what-we-do/keeping-singapore-drug-free",
                icon: "mha-icon.png",
              },
            ].map((org, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center"
              >
                <LinkPreview url={org.url} className="!block">
                  <Image
                    src={`/icon/${org.icon}`}
                    alt={`${org.title} Icon`}
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                  />
                  <p className="text-black dark:text-black font-bold hover:underline">
                    {org.title}
                  </p>
                </LinkPreview>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-neutral-700 text-white text-center py-8">
        <p className="mb-4 text-2xl font-mono">
          “If You Can Quit For A Day, You Can Quit For A Lifetime.”
        </p>
      </footer>
    </div>
  );
}
