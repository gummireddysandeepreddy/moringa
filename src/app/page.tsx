import Image from "next/image";
import MoringaAnimation from "./moringa-animation";
import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <div className="h-full w-full">
      <h1
          className="animate-fade-up text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl h-full flex items-center justify-center"
          style={{
            animationDelay: "0.25s",
            animationFillMode: "forwards",
          }}
        >
          <Balancer>
            <span className="text-secondary">Pa</span>
            <span><Image src="/logo.svg" alt="Moringa" width={65} height={65} className="inline" /></span>
            <span className="text-primary">fully</span>
          </Balancer>
      </h1>
      <MoringaAnimation />
    </div>
  );
}
