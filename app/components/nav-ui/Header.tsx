"use client";

import Link from "next/link";
import React from "react";
import Pinned from "./Pinned";
import SortBrowse from "../browse-ui/SortBrowse";

const Header = () => {
  return (
    <div className="border-b-[0.8px] sm:px-1 lg:px-1 xl:px-8 2xl:px-8 ">
      <div className="flex flex-row  py-2 justify-between">
        <div className="flex flex-row gap-4   ">
          <SortBrowse />
          <div className="md:flex flex-row gap-4 hidden  ">
            <Link
              href={`/components/fallback-ui`}
              className="text-sm font-bold p-3 rounded-xl  hover:bg-stone-100 transition ease-in-out duration-150"
            >
              Monthly deals
            </Link>
            <Link
              href={`/components/browse-ui/giftcards`}
              className="text-sm font-bold p-3 rounded-xl  hover:bg-stone-100 transition ease-in-out duration-150"
            >
              Tier cards
            </Link>
            <Link
              href={`/components/fallback-ui`}
              className="text-sm font-bold p-3 rounded-xl hover:bg-stone-100 transition ease-in-out duration-150"
            >
              Top rated
            </Link>
            <Link
              href={`/components/fallback-ui`}
              className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
            >
              New arrivals
            </Link>
            <Link
              href={`/components/fallback-ui`}
              className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
            >
              Pre orders
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Pinned />
          <Link
            href={`/components/fallback-ui`}
            className="text-sm font-bold p-3 rounded-xl   hover:bg-stone-100 transition ease-in-out duration-150"
          >
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
