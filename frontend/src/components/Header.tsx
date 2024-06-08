import { Button } from "@chakra-ui/react";
import React from "react"
import { Link } from "react-router-dom";
import { logout } from "../models/auth";

const Header: React.FC = () => {
  return (
    <>
        <h1 className="text-xl font-bold">My Website</h1>
        <Link to="/">root</Link>
        <Link to="/auth">auth</Link>
        <Button onClick={() => logout()}>logout</Button>
    </>
  );
}

export { Header };
