"use client";

import React from "react";
import Image from "next/image";
import {
  Panel,
  BackgroundImage,
  Overlay,
  Content,
  Title,
  TitleSecondary,
  Text,
  FeatureList,
  FeatureItem,
} from "./elements";

export function LoginImagePanel() {
  const handleGoToHomepage = () => {
    window.location.href = "https://kmaris.netlify.app/";
  };

  return (
    <Panel>
      <BackgroundImage src="/Herologo.webp" alt="Background" fill />
      <Overlay />
      <Content>
        <Image
          src="/whitelogo.png"
          alt="KMARIS LLC"
          width={180}
          height={100}
          priority
          style={{ cursor: "pointer", objectFit: "contain" }}
          onClick={handleGoToHomepage}
        />
        <TitleSecondary>Welcome to KMARIS LLC</TitleSecondary>
        <Text>Your trusted partner for professional immigration services</Text>
        <FeatureList>
          <FeatureItem>Expert immigration consultations</FeatureItem>
          <FeatureItem>Visa and green card applications</FeatureItem>
          <FeatureItem>Document preparation assistance</FeatureItem>
          <FeatureItem>Case status tracking</FeatureItem>
        </FeatureList>
      </Content>
    </Panel>
  );
}
