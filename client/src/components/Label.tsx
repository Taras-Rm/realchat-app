interface LabelProps {
  text: string;
  color: "red" | "green";
}

function Label({ text, color }: LabelProps) {
  return (
    <div
      className={"py-1 px-2 text-xs rounded-full border-solid border-[1px]"}
      style={{ color, borderColor: color }}
    >
      {text}
    </div>
  );
}

export default Label;
