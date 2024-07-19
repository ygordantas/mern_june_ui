import { Form } from "react-bootstrap";

interface FormInputProps {
  title: string;
  type: "text" | "email" | "password" | "date";
  required?: boolean;
  id?: string;
  value?: string | number | Date;
  placeholder?: string;
  errorMessage?: string;
  min?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  title,
  type,
  required,
  id,
  value,
  placeholder,
  errorMessage,
  min,
  onChange,
  onBlur = () => {},
}: FormInputProps): JSX.Element {
  id = id ? id : title;
  value = value instanceof Date ? value.toISOString().split("T")[0] : value;

  return (
    <>
      <Form.Label htmlFor={id}>{title}</Form.Label>
      <Form.Control
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
      />
      <Form.Control.Feedback type="invalid">
        {required && !errorMessage ? "Required field" : errorMessage}
      </Form.Control.Feedback>
    </>
  );
}
