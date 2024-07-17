import React from "react";
import "react-quill/dist/quill.snow.css";
import { motion as m } from "framer-motion";

const PreviewPost = ({ title, content }) => {
  return (
    <m.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="ql-snow">
        <div className="ql-editor min-h-full">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </m.div>
  );
};

export default PreviewPost;
