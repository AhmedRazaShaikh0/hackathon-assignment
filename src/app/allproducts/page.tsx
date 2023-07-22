import React from "react";
import FetchData from "../../../sanity/FetchData";
import { urlForImage } from "../../../sanity/lib/image";

export default async function page() {
  const data = await FetchData();
  console.log("data", data[0].image.asset._ref);
  return (
    <div className="flex gap-5">
      {data.map((product: any) => (
        <div className="w-[200px]">
          <img src={urlForImage(product.image).url()} alt="" />
          <h1>{product.title}</h1>
          <h1>{product.description}</h1>
          <h1>{product.category}</h1>
          <h1>{product.price}</h1>
        </div>
      ))}
    </div>
  );
}
