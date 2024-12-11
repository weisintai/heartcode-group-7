import Snorlax from "@/app/assets/Snorlax.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-800 font-sans">
      <header className="bg-neutral-600 text-white text-center py-8">
        <h1 className="text-5xl font-mono font-bold mb-2">
          CHOOSE LIFE, NOT DRUGS
        </h1>
        <p className=" font-mono font-normal mb-4">
          Join Us In The Fight Against Drug Abuse And Help Create A Healthier,
          Drug-Free Future.
        </p>
        <Link
          href="#learn-more"
          className="bg-neutral-500 text-white px-6 py-2 rounded-md inline-block hover:bg-neutral-700 transition-colors"
        >
          Learn More
        </Link>
      </header>

      <main className="container mx-auto px-4">
        <section id="say-no-to-drugs" className="my-12 text-center">
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Why Say No to Drugs?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-bold font-mono text-black mb-2">
                  {reason.title}
                </h3>
                <p>{reason.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="statistics" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Statistics and Facts
          </h2>
          <p className="text-lg mb-2 text-white">
            Did you know? Over <strong>200 million</strong> people worldwide use
            drugs at least once a year.
          </p>
          <p className="text-lg text-white">
            In Singapore, the number of drug abusers arrested in 2023{" "}
            <strong>increased by 10%</strong> from 2022.
          </p>
        </section>

        <section id="stories" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Personal Stories
          </h2>
          <p className="mb-4 text-white">
            Read inspiring stories of individuals like Jeremy who have overcome
            addiction.
          </p>
          <Link
            href="https://www.getsmartaboutdrugs.gov/consequences/true-stories/true-story-jeremy-b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Snorlax} alt="" height={100} width={100} />
          </Link>
        </section>

        <section id="prevention-articles" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Drug Prevention Articles
          </h2>
          <ul className="space-y-2">
            {[
              {
                title:
                  "Preventing Drug Misuse and Addiction: The Best Strategy",
                url: "https://nida.nih.gov/publications/drugs-brains-behavior-science-addiction/preventing-drug-misuse-addiction-best-strategy",
              },
              {
                title: "New Approaches to Combat Youth Substance Misuse",
                url: "https://www.apa.org/monitor/2024/03/new-approaches-youth-substance-misuse",
              },
              {
                title: "Prevention Research by NIDA",
                url: "https://nida.nih.gov/research-topics/prevention",
              },
            ].map((article, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md">
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="support" className="my-12">
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Support and Help
          </h2>
          <p className="mb-4 text-white">
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
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutra;-500 pb-2 mb-6">
            Events and Campaigns
          </h2>
          <h2 className="text-1x1 font-normal text-white">
            Join our upcoming events and campaigns to raise awareness and
            support the cause{" "}
          </h2>
          <Link
            href="https://www.sana.org.sg/events/"
            className="text-2x1 font-semibold text-white hover:underline"
          >
            here
          </Link>
          .
        </section>

        <section id="find-out-more" className="my-12 text-center">
          <h2 className="text-3xl font-bold font-mono text-white border-b-2 border-neutral-500 pb-2 mb-6">
            Find Out More About Anti-Drug Abuse
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Center for Substance Abuse Prevention (CSAP)",
                url: "https://www.samhsa.gov/prevention",
                icon: "csap-icon.png",
              },
              {
                title: "Community Anti-Drug Coalitions of America (CADCA)",
                url: "https://www.cadca.org/",
                icon: "cadca-icon.png",
              },
            ].map((org, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <Link
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src={`/${org.icon}`}
                    alt={`${org.title} Icon`}
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                  />
                  <p className="text-black font-bold hover:underline">
                    {org.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-neutral-700 text-white text-center py-8">
        <p className="mb-4">
          Contact us: info@antidrugcampaign.org | Follow us on social media
        </p>
        <form className="flex justify-center items-center">
          <label htmlFor="email" className="sr-only">
            Subscribe to our newsletter:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-md text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-neutral-500 text-white px-4 py-2 rounded-r-md hover:bg-neutral-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </footer>
    </div>
  );
}
