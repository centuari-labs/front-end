import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const UnderConstruction = () => {
  return (
    <div className="fixed inset-0 h-screen z-[998] bg-white/30 dark:bg-black/30 backdrop-blur-md">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-4xl md:text-7xl uppercase font-bold">
            Under Construction 🚧
          </h1>
          <p className="text-muted-foreground dark:text-muted-dark text-2xl mt-3">
            Magic is going to happen 😋...
          </p>
          <Link href={"/"}>
            <Button variant={"colorful"} className="mt-5" size={"lg"}>
              Back to Home
            </Button>
          </Link>
        </div>
        {/* <Image
          src={"under-construction.png"}
          alt="under-construction"
          width={550}
          height={550}
          className="hidden md:block"
        /> */}
      </div>
    </div>
  );
};

export default UnderConstruction;
