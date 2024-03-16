import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import EmergencyList from "../components/EmergencyList";
import ChatBox from "../components/ChatBox";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <EmergencyList />
    </Layout>
  );
}
