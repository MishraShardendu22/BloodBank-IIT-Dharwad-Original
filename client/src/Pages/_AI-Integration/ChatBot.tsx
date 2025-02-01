import { useState } from "react";
import axios from "axios";

const GO_BACK = import.meta.env.VITE_GO_BACK as string

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState(null);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      query: input,
    }

    try {
      const res = await axios.post(
        GO_BACK + "/chats",
        body,
      );
      // it should be some thing like res.data.answer
      // please console.log and re check 
      setResponseData(res.data);
    } catch (error) {
      console.log("There was an error !!", error);
    }
  };

  return (
    <div>
      <h1>Ask AI</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your query"
        />
        <button type="submit">Send</button>
      </form>
      {responseData && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
