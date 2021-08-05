import React, { FC } from "react";
import HomeHeader from "@/components/Header";
import HomeContent from "./IndexContent";

const Home: FC = () => {
  return (
    <div className="home">
      <HomeHeader />
      <HomeContent />
    </div>
  );
};
export default Home;
