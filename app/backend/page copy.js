'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BackendPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <p>Loading...</p>;

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
      <button onClick={() => {
        document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        router.push('/login');
      }}>Logout</button>
    </div>
  );
}
