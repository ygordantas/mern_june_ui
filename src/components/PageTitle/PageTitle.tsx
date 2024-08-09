import { Row } from "react-bootstrap";

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <Row className="title mt-5 mb-5">
      <h1>{title}</h1>
    </Row>
  );
}
