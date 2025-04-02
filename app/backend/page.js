// app/backend/page.js
'use client'; 
import { useEffect, useState } from "react";

export default function BackendPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
