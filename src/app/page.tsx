import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { Businesses } from "@/components/Businesses/Busenesses";
import Container from "@/components/Layouts/Container";
export const metadata: Metadata = {
  title: "Trybae Solutions",
  description: "Trybae Admin Dashboard",
};

function Home() {
  return (
    <>
      <DefaultLayout>
        <>
          <Container>
            <Businesses />
          </Container>
        </>
      </DefaultLayout>
    </>
  );
}

export default Home