"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignInButton } from "@clerk/nextjs";
import { Sign } from "crypto";

// interface Message {
//   sender: string;
//   content: string;
// }

export default function Home() {
  // const [messages, setMessages] = useState<Message[]>([
  //   { sender: "Alice", content: "Hello, world!" },
  //   { sender: "Bob", content: "Hi, Alice!" },
  // ]);

  const messages = useQuery(api.functions.message.list);
  const createMessage = useMutation(api.functions.message.create);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setMessages([...messages, { sender: "Alice", content: input }]);
    createMessage({ sender: "Alice", content: input });
    setInput("");
  };

  return (
    <div>
      {messages?.map((message, index) => (
        <div key={index}>
          <strong>{message.sender}</strong>: {message.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
