import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import classes from "./ImageUpload.module.css";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  onImageDelete: (index: number) => void;
  labelText?: string;
}

export default function ImageUpload({
  onChange,
  onImageDelete,
  labelText = "Select Images",
}: ImageUploadProps): JSX.Element {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const filesArray = [...files];
    setIsLoading(true);
    setPreviewUrls(filesArray.map((file) => URL.createObjectURL(file)));
    onChange(filesArray);
  };

  const onDeleteClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setPreviewUrls((prev) => {
      const newPreviewUrls = [...prev];
      newPreviewUrls.splice(index, 1);
      return newPreviewUrls;
    });
    onImageDelete(index);
  };

  return (
    <div>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control
          onChange={onChangeHandler}
          type="file"
          multiple
          accept=".jpg,.png,.jpeg"
        />
      </Form.Group>

      <ul className={classes.preview_list}>
        {previewUrls.map((url, i, arr) => (
          <li key={i}>
            <img
              src={url}
              alt="Preview image"
              onLoad={() => {
                if (i === arr.length - 1) {
                  setIsLoading(false);
                }
              }}
            />
            {!isLoading && (
              <Button
                onClick={(e) => onDeleteClickHandler(e, i)}
                type="button"
                variant="danger"
                size="sm"
              >
                <MdDelete size={20} />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
