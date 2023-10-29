"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
const checkoutItems = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
};

function ViewCheckout() {
  const [checkout, setCheckout] = useState(checkoutItems);

  const deleteCheckout = (cartId) => {
    const filderCheckouts = checkout.filter(
      (element) => element.cartId !== cartId
    );
    console.log(filderCheckouts);
    setCheckout(filderCheckouts);
  };
  return (
    <div>
      ViewCheckout
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              ID
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Image Url
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            ></th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {checkout.length === 0 ? (
            <>
              <div className="p-10">
                {" "}
                <h1>Checkout is Empty</h1>
              </div>
            </>
          ) : (
            <>
              {checkout?.map((item, index) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.price}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.img}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <button onClick={() => deleteCheckout(item.cartId)}>
                      <AiOutlineDelete className="text-2xl text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCheckout;
