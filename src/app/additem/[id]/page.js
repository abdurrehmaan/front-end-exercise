import UpdateItem from "@/components/UpdateItem";
import React from "react";

function UpdateItemPage({ params }) {
  const { id } = params;
  return (
    <div>
      <UpdateItem id={id} />
    </div>
  );
}

export default UpdateItemPage;
