import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPosts } from "../../functions/posts";
import { Post } from "../../types";
import PostCard from "./posts-card";

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  Textarea,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import ReactPaginate from "react-paginate";

export default function PostsContainer({
  isOpen,
  onClose,
  search,
}: {
  isOpen: boolean;
  onClose: () => void;
  search: string;
}) {
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong!!",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      onClose();
      toast({
        title: "Post created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      // Update the cache with the new post
      queryClient.setQueryData(["posts"], (oldData: Post[] | undefined) => {
        if (oldData) {
          return [...oldData, newPost];
        }
        return [newPost];
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (deletedPostId) => {
      toast({
        title: "Post deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      // Update the cache to remove the deleted post
      queryClient.setQueryData(["posts"], (oldData: Post[] | undefined) => {
        if (oldData) {
          return oldData.filter((post) => post.id !== deletedPostId);
        }
        return [];
      });
    },
  });

  const { user } = useAuth();
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 6,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    if (posts) {
      setPagination((prevState) => ({
        ...prevState,
        data: posts,
        pageCount: Math.ceil(
          posts.filter((post: Post) => post.title.includes(search)).length /
            prevState.numberPerPage,
        ),
        currentData: posts
          .filter((post: Post) => post.title.includes(search))
          .slice(prevState.offset, prevState.offset + prevState.numberPerPage),
      }));
    }
  }, [posts, pagination.numberPerPage, pagination.offset, search]);

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination((prevState) => ({
      ...prevState,
      offset,
      currentData: prevState.data
        .filter((post: Post) => post.title.includes(search))
        .slice(offset, offset + prevState.numberPerPage),
    }));
  };

  function handleSubmit() {
    if (!title || !body)
      return toast({
        description: "Please fill all the fields",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    createMutation.mutate({
      title,
      body,
      userId: user?.id || 1,
      id: Math.random(),
    });
    setTitle("");
    setBody("");
  }

  function handleDelete(postId: number) {
    deleteMutation.mutate(postId);
  }

  return (
    <section className="grid grid-cols-1 mx-auto lg:grid-cols-2 xl:grid-cols-3 mt-12 gap-4 px-10 md:px-40">
      {pagination.currentData &&
        pagination.currentData.map((post: Post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={
          "flex flex-row gap-4 justify-center mx-auto py-6 items-center w-full"
        }
        activeClassName={"bg-green-500 text-white px-4 py-2 rounded-lg"}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <InputGroup className="max-w-[500px] flex flex-col gap-2">
                <Input
                  type="text"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Body..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </InputGroup>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  variant={"outline"}
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={handleSubmit}
                >
                  Add Post
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        />
      )}
    </section>
  );
}
