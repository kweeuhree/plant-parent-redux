import type { ChangeEventHandler } from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  type: string;
  onChange: ChangeEventHandler;
  value?: string;
  required?: boolean;
};

export const LabeledInput = ({
  label,
  id,
  name,
  type,
  onChange,
  value,
  required = true,
}: Props) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
};
