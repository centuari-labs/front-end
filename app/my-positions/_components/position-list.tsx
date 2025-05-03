"use client";

import React from "react";

import { Accordion } from "@/components/ui/accordion";
import { VaultPositionList } from "./vault/list";
import { LendPositionList } from "./lend/list";
import { BorrowPositionList } from "./borrow/list";

const PositionList = () => {
  return (
    <Accordion type="multiple" className="w-full space-y-4">
      <VaultPositionList />
      <BorrowPositionList />
      <LendPositionList />
    </Accordion>
  );
};

export default PositionList;
