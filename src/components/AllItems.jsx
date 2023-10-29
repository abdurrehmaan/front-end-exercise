"use client";
import {
  useGetItemsQuery,
  useDeleteItemMutation,
} from "@/redux/features/ItemsApi";
import Link from "next/link";
import { useState, useEffect } from "react";

//icon
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";

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

export default function AllItems() {
  const [id, setItemId] = useState();
  const [cart, setCart] = useState(checkoutItems);

  const { data: getAllItem, isLoading } = useGetItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handelItem = async (item) => {
    if (cart.length === 0) {
      const cartData = {
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        cartId: 1,
      };
      setCart([...cart, cartData]);
      setItemId(item.id);
    } else {
      const lastIndex = cart[cart.length - 1];
      console.log("lastIndex", lastIndex);
      const cartData = {
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        cartId: lastIndex.cartId + 1,
      };
      setCart([...cart, cartData]);
      setItemId(item.id);
    }
  };
  function handelDeleteItem(id) {
    deleteItem(id);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="flex justify-between">
          <h1>All Items</h1>
          <Link
            href={"/checkout"}
            className=" border p-2 border-red-500 cursor-pointer"
          >
            <h1>
              CheckoutITem <strong>{cart.length}</strong>
            </h1>
          </Link>
        </div>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {isLoading ? (
              <div>loading...</div>
            ) : (
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
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getAllItem?.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.id}
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-4">
                        <Link href={`additem/${item.id}`}>
                          <h1 className="text-lg">
                            <AiTwotoneEdit className="font-bold text-2xl" />
                          </h1>
                        </Link>
                        <button onClick={() => handelDeleteItem(item.id)}>
                          <AiOutlineDelete className="text-2xl text-red-500" />
                        </button>
                        <button
                          type="button"
                          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => handelItem(item)}
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
