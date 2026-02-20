import Image from "next/image";

export default function Goblin() {
  return (
    <section className="hidden md:block relative w-full h-hero mt-16 bg-black flex">
      <div className="relative flex w-full h-full mx-auto">
        <Image src="/Goblin.png" alt="Goblin" fill className="object-contain" />
      </div>

      <Image
        src="/Goblintext.png"
        alt="Goblin Title"
        width={600}
        height={200}
        className="object-contain flex absolute top-1/2 left-1/2 translate-x-1 -translate-y-1/2"
      />
    </section>
  );
}
