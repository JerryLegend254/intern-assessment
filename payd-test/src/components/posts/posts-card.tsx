import { Button, Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Post } from "../../types";
import useUsers from "../../hooks/use-users";
export default function PostCard({ post }: { post: Post }) {
  const { users } = useUsers();
  return (
    <Card className="max-w-[420px] max-h-[300px] flex">
      <CardBody className="flex  flex-1 flex-col justify-between gap-2">
        <p className="font-bold capitalize text-lg">
          {post.title.split("").splice(0, 30).join("")}...
        </p>
        <p className="">{post.body.split("").splice(0, 120).join("")}...</p>
        <p>By {users?.find((user) => user.id === post.userId)?.name}</p>
      </CardBody>
      <CardFooter className="flex gap-4 justify-end">
        <Button colorScheme="green">Edit</Button>
        <Button colorScheme="red">Delete</Button>
      </CardFooter>
    </Card>
  );
}
