"use client";
import React, { useState } from "react";
import { urlForImage } from "../../sanity/lib/image";
import { useAuth } from "@clerk/nextjs";

export default function ProductDetails({
  filteredData,
}: {
  filteredData: any;
}) {
  const { userId } = useAuth();
  // console.log(userId);
  const [quantity, setQuantity] = useState(1);

  // console.log("filteredData", filteredData);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }
  function handleDecrement() {
    setQuantity(quantity - 1);
  }

  async function handleAddToCart() {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          product_id: filteredData._id,
          product_title: filteredData.title,
          product_price: filteredData.price * quantity,
          product_quantity: quantity,
          image_url: urlForImage(filteredData.image).url(),
        }),
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="">
                <h1 className="text-3xl font-bold text-gray-900">
                  {filteredData.title}
                </h1>
                <p className="text-2xl font-medium text-gray-900">
                  Rs {filteredData.price}
                </p>
              </div>
            </div>

            <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div>
                <img
                  key={filteredData._id}
                  src={urlForImage(filteredData.image).url()}
                  alt={filteredData.title}
                  width={300}
                  height={300}
                />
              </div>
            </div>

            <div className="mt-5 lg:col-span-6">
              <div className="flex border w-fit mt-5">
                <button
                  onClick={() => handleDecrement()}
                  disabled={quantity === 1}
                  className={`px-3 py-1 text-center hover:bg-gray-200`}
                >
                  -
                </button>
                <div className="px-3 py-1 text-center">{quantity}</div>
                <button
                  onClick={() => handleIncrement()}
                  className={`px-3 py-1 text-center hover:bg-gray-200`}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={handleAddToCart}
                  className={`w-full overflow-hidden group text-center border border-black py-3 mt-5 text-lg font-bold flex items-center`}
                >
                  <p className="flex-grow">Add to Cart</p>
                </button>
                <button className="w-full text-center text-white bg-black py-3 text-lg font-bold mt-3">
                  Buy it now
                </button>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500" />
                {filteredData.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
