import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    timing: "Before departure",
    title: "Install the eSIM",
    text: "Use stable Wi-Fi, scan the QR code, and label the new line “Japan.” Do not delete it after installation.",
  },
  {
    number: "02",
    timing: "After landing",
    title: "Turn on the Japan line",
    text: "Select it for mobile data. Enable data roaming if your provider instructs you to do so.",
  },
  {
    number: "03",
    timing: "Final check",
    title: "Test the connection",
    text: "Switch off airport Wi-Fi and open a webpage or Maps. If it loads, your setup is complete.",
  },
];

export default function SetupSteps() {
  return (
    <section className="section setup-section" id="setup">
      <div className="container setup-grid">
        <div>
          <SectionHeading
            eyebrow="Arrival setup"
            title="From landing to online in three steps"
            description="The exact labels vary by phone, but the basic flow is the same."
          />
          <div className="setup-note">
            <span aria-hidden="true">!</span>
            <p>
              Keep your purchase email and QR code available offline. Some QR codes
              can only be used once.
            </p>
          </div>
        </div>


        <figure className="setup-illustration">
          <Image
            src="/images/setup/setup-guide-4-step-connection.png"
            alt="Illustration showing the four basic steps for setting up internet in Japan"
            width={1672}
            height={941}
            sizes="(max-width: 768px) 100vw, 900px"
            className="setup-illustration-image"
          />
        </figure>

        <div className="step-list">
          {steps.map((step) => (
            <article className="setup-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div>
                <p>{step.timing}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
