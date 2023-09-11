"use client";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

export default function CartItems() {
  const [products, setProducts] = useState<any>(null);
  console.log("🚀 ~ file: CartItems.tsx:7 ~ CartItems ~ products:", products)
  const [state, setState] = useState(false);
  const { isSignedIn, userId } = useAuth();
  //   console.log("user_id", uid);
  useEffect(() => {
    fetch(`http://localhost:3000/api/cart?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [isSignedIn, state]);

  async function deleteProduct(product_title: any) {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({
        user_id: userId,
        product_title: product_title,
      }),
    });
    setState(!state);
    // console.log('working')
  }

  async function handleIncrement(
    user_id: any,
    product_quantity: any,
    product_title: any
  ) {
    try {
      await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          user_id: user_id,
          product_quantity: product_quantity,
          product_title: product_title,
        }),
      });
      setState(!state);
    } catch (error) {
      console.log("error", error);
    }
    console.log("testing");
  }
  async function handleDecrement(
    user_id: any,
    product_quantity: any,
    product_title: any
  ) {
    try {
      await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          user_id: user_id,
          product_quantity: product_quantity,
          product_title: product_title,
        }),
      });
      setState(!state);
    } catch (error) {
      console.log("error", error);
    }
    console.log("testing");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>
      {isSignedIn ? (
        <div className="grid gap-14">
          {products?.map((item: any, index: number) => (
            <div className="flex" key={index}>
              <img
                src={item.image_url}
                alt=""
                className="w-56 h-56"
                width={500}
                height={500}
              />
              <div className="ml-10">
                <h1 className="text-4xl font-bold">{item.product_title}</h1>
                <h1 className="text-2xl font-medium">{item.product_price}</h1>
                <div className="flex border w-fit mt-5">
                  <button
                    onClick={() =>
                      handleDecrement(
                        item.user_id,
                        item.product_quantity - 1,
                        item.product_title
                      )
                    }
                    className={`px-3 py-1 text-center hover:bg-gray-200`}
                  >
                    -
                  </button>
                  <div className="px-3 py-1 text-center">
                    {item.product_quantity}
                  </div>
                  <button
                    onClick={() =>
                      handleIncrement(
                        item.user_id,
                        item.product_quantity + 1,
                        item.product_title
                      )
                    }
                    className={`px-3 py-1 text-center hover:bg-gray-200`}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => deleteProduct(item.product_title)}
                  className="bg-black text-white py-1 px-5 rounded-md mt-10 font-semibold"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Please Login First</h1>
        </div>
      )}
    </div>
  );
}
