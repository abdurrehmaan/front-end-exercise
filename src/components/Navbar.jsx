"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex justify-center mt-20 gap-5">
      <Link href={"/allitems"} className="bg-gray-200 py-3 px-4 rounded">
        AllItems
      </Link>
      <Link href={"/additem"} className="bg-gray-200 py-3 px-4 rounded">
        AddItems
      </Link>
      <Link href={"/checkout"} className="bg-gray-200 py-3 px-4 rounded">
        Checkout
      </Link>
    </div>
  );
}

export default Navbar;
