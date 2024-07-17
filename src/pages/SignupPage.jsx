import React from "react";
import UserAuthForm from "../components/UserAuthForm";
import { motion as m } from "framer-motion";

const SignupPage = () => {
  return (
    <m.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      <UserAuthForm type={"signup"} loginType={null} />
    </m.div>
  );
};

export default SignupPage;
