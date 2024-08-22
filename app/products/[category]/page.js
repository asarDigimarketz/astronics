import Products from "@/Components/Products/Products";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <Products params={params} />
    </>
  );
};

export default page;
