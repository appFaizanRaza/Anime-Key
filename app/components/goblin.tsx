import Image from "next/image";

export default function Goblin() {
  return (
    <section className="relative w-full h-hero mt-16 bg-black flex">
      <div className="relative w-full h-full mx-auto">
        <Image src="/Goblin.png" alt="Goblin" fill className="object-contain" />
      </div>

      <Image
        src="/Goblintext.png"
        alt="Goblin Title"
        width={600}
        height={200}
        className="object-contain"
      />
    </section>
  );
}
