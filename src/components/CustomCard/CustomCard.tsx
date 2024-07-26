import { Container, Row } from "react-bootstrap";
import classes from "./CustomCard.module.css";

interface CustomCardProps {
  title?: JSX.Element | string;
  content: JSX.Element | string;
  footer?: JSX.Element | string;
}

export default function CustomCard({
  title,
  content,
  footer,
}: CustomCardProps): JSX.Element {
  return (
    <Container className={classes.container + " center"}>
      {title && (
        <Row>
          <h3 className={classes.title}>{title}</h3>
        </Row>
      )}

      <Row>{content}</Row>

      {footer && <Row className={classes.footer}>{footer}</Row>}
    </Container>
  );
}
