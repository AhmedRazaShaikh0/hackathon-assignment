import { cookies } from "next/headers";
import React from "react";

export default async function page() {
  const setCookies = cookies();
  const uid = setCookies.get("user_id")?.value;
//   console.log("user_id", uid);
  const res = await fetch(`http://localhost:3000/api/cart?user_id=${uid}`);
  const data = await res.json();
  console.log("data", data);
  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="flex gap-14">
        {data.map((item: any) => (
          <div>
            <h1>{item.product_title}</h1>
            <h1>{item.product_price}</h1>
            <h1>{item.product_quantity}</h1>
            <img src={item.image_url} alt="" className="w-40 h-40" width={300} height={300} />
          </div>
        ))}
      </div>
    </div>
  );
}
