import { useState } from "react";
import Nav from "./components/nav/nav";
import PostsContainer from "./components/posts/posts-container";
import { useDisclosure } from "@chakra-ui/react";
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  return (
    <main className="h-screen flex flex-col bg-slate-50">
      <Nav openModal={onOpen} search={search} setSearch={setSearch} />
      <PostsContainer isOpen={isOpen} onClose={onClose} search={search} />
    </main>
  );
}

export default App;
