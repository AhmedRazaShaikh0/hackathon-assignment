import React from "react";
import FetchData from "../../../../sanity/FetchData";
import ProductDetails from "@/components/ProductDetails";

export async function generateStaticParams() {
  const data = await FetchData();
  return data.map((item: any) => ({
    product: item.slug.current,
  }));
}

export default async function page({ params }: { params: any }) {
  const data = await FetchData();
  const filteredData = data.find(
    (item: any) => item.slug.current == params.product
  );

  return <ProductDetails filteredData={filteredData} />;
}
