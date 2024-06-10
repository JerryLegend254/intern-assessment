import Nav from "./components/nav/nav";
import PostsContainer from "./components/posts/posts-container";
import { useDisclosure } from "@chakra-ui/react";
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <main className="h-screen flex flex-col bg-slate-50">
      <Nav openModal={onOpen} />
      <PostsContainer isOpen={isOpen} onClose={onClose} />
    </main>
  );
}

export default App;
