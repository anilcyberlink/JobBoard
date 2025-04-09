'use client'; 
import { useState } from "react";

export default function FrontendPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both the title and content.");
      return;
    }

    const newPost = { title, content, authorId: 1 }; // Use a hardcoded author ID or get it dynamically

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      alert("Post added successfully");
      setTitle("");
      setContent("");
    } else {
      alert("Failed to add post");
    }
  };

  return (
    <div>
      <h2>Add a Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
