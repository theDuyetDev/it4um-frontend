import React, { useRef, useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import storage from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const TextEditor = ({ initialValue, onChange }) => {
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState(initialValue);

  useEffect(() => {
    setEditorContent(initialValue);
  }, [initialValue]);

  const handleUploadImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", downloadURL);
          }
        );
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleUploadImage,
      },
    },
  };

  const handleChange = (content) => {
    setEditorContent(content);
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      value={editorContent}
      onChange={handleChange}
    />
  );
};

export default TextEditor;
