import React from "react";
import FetchData from "../../../../sanity/FetchData";

export async function generateStaticParams() {
  const data = await FetchData();
  return data.map((item: any) => ({
    product: item.slug.current,
  }));
}

export default async function page({ params }: { params: any }) {
  //   console.log("params", params);
  const data = await FetchData();
  //   console.log("data", data);
  const filteredData = data.find(
    (item: any) =>
      // console.log("item", item)
      item.slug.current == params.product
  );
  //   console.log("params", filteredData);
  return (
    <div>
      <div>
        <h1>Title: {filteredData.title}</h1>
        <h1>description: {filteredData.description}</h1>
        <h1>category: {filteredData.category}</h1>
        <h1>price: {filteredData.price}</h1>
      </div>
    </div>
  );
}
