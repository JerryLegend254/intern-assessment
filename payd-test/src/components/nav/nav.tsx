import { Search2Icon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";
export default function Nav({
  openModal,
  search,
  setSearch,
}: {
  openModal: () => void;
  search: string;
  setSearch: (value: string) => void;
}) {
  const { user } = useAuth();
  return (
    <nav className="flex flex-col md:flex-row justify-between py-6 items-center px-8">
      <h1 className="uppercase tracking-widest font-bold text-2xl">
        JerryPosts
      </h1>
      <div className="flex flex-1  gap-6 items-center justify-center md:justify-end ml-6">
        <InputGroup className="max-w-[500px]">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search posts..."
            focusBorderColor={"red"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <ul className="gap-6 md:gap-12 items-center md:flex">
          <Button colorScheme="green" variant="solid" onClick={openModal}>
            New Post
          </Button>
          <div className="hidden  gap-6 items-center  md:flex justify-center">
            <p className="text-slate-700 font-bold hidden xl:block">
              {user?.name}
            </p>
            <div className="h-12 w-12 rounded-full bg-gray-500"></div>
          </div>
        </ul>
      </div>
    </nav>
  );
}
