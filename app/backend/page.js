'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BackendPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState({ title: "", content: "" });
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('auth=true');

    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const fetchPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      };
      fetchPosts();
    }
  }, [router]);

  // Edit post functionality
  const handleEdit = (post) => {
    setIsEditing(true);
    setEditPost(post);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { ...editPost };

    const res = await fetch(`/api/posts/${editPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      setPosts(posts.map((post) => (post.id === editPost.id ? updatedPost : post)));
      setIsEditing(false);
      setEditPost({ title: "", content: "" });
    } else {
      alert("Failed to update the post");
    }
  };

  // Delete post functionality
  const handleDelete = async (postId) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post.id !== postId));
    } else {
      alert("Failed to delete the post");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isEditing && (
        <div>
          <h3>Edit Post</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editPost.title}
              onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
            />
            <textarea
              value={editPost.content}
              onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => {
          document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          router.push('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
