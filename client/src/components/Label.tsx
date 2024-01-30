import React from "react";

interface LabelProps {
  text: string;
  color: "red" | "green";
}

function Label({ text, color }: LabelProps) {
  return (
    <div
      className={`p-1 text-xs rounded-full text-[${color}] border-solid border-[1px] border-[${color}]`}
    >
      {text}
    </div>
  );
}

export default Label;
