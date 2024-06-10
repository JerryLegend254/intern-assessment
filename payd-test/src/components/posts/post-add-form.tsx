import { Input, InputGroup, Textarea } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
export default function PostAddForm({
  title,
  setTitle,
  body,
  setBody,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
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
    </>
  );
}
