import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Nav from "./components/nav/nav";
import PostCard from "./components/posts/posts-card";
import { Post } from "./types";

const posts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque",
  },
];
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <main className="h-screen flex flex-col bg-slate-50">
      <Nav openModal={onOpen} />
      <section className="grid grid-cols-1 mx-auto lg:grid-cols-2 xl:grid-cols-3 mt-12 gap-4 px-10 md:px-40">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup className="max-w-[500px] flex flex-col gap-2">
                <Input type="text" placeholder="Title..." />
                <Textarea placeholder="Body..." />
              </InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                variant={"outline"}
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button variant="solid" colorScheme="green">
                Add Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </main>
  );
}

export default App;
