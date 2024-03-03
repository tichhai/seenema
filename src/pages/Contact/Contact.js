import React from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";

export default function Contact(props) {
  return (
    <CustomCard
      effectColor="#C780FF"
      color="#14AEFF"
      blur={10}
      borderRadius={0}
    >
      <h1>Hello</h1>
      <p>This is an example</p>
    </CustomCard>
  );
}
