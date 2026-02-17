interface ReadMoreProps {
  text: string;
  onOpen: () => void;
}

export default function ReadMore({ text, onOpen }: ReadMoreProps) {
  return (
    <div className="hidden md:block">
      <p className="text-[20px] text-white my-4 line-clamp-4">
        {text}
      </p>

      <span
        onClick={onOpen}
        className="text-text-green cursor-pointer"
      >
        Read More
      </span>
    </div>
  );
}
