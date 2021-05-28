import { useState } from "react";
import {useHistory} from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Select");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSumbit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    console.log(blog);
    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("New blog added");
      setIsPending(false);
    });
    //history.go(-1) //goes one step back
    history.push('/'); 
  };
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSumbit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Select">--Select--</option>
          <option value="Anonymus">Anonoymus</option>
          <option value="Saad">Saad</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Adding a new Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
