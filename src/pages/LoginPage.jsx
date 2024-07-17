import React from "react";
import UserAuthForm from "../components/UserAuthForm";
import { motion as m } from "framer-motion";

const LoginPage = () => {
  return (
    <m.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <UserAuthForm type={"login"} loginType={"user"} />
    </m.div>
  );
};

export default LoginPage;
