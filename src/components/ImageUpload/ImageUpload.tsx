import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";
import classes from "./ImageUpload.module.css";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
}

export default function ImageUpload({ onChange }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const fileArray = Array.from(files);

    setIsLoading(true);
    setPreviews(fileArray.map((file) => URL.createObjectURL(file)));
    onChange(fileArray);
  };

  return (
    <div>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Product Images</Form.Label>
        <Form.Control
          onChange={onChangeHandler}
          type="file"
          multiple
          accept=".jpg,.png,.jpeg"
        />
      </Form.Group>

      <ul className={classes.preview_list}>
        {previews.map((url, i, arr) => (
          <li key={i}>
            <img
              src={url}
              alt="Preview"
              onLoad={() => {
                if (i === arr.length - 1) setIsLoading(false);
              }}
            />
            {!isLoading && (
              <Button
                variant="danger"
                onClick={(e) => {
                  e.preventDefault();
                  setPreviews((prev) => prev.filter((_, index) => index !== i));
                }}
              >
                <TiDeleteOutline size={26}/>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
