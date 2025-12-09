import React, { useState, useEffect } from 'react';

// Presenter Component
const PostListPresenter = ({ posts, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// Container Component
const PostListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
setTimeout(() => {
  setPosts([
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' },
    { id: 3, title: 'Third Post' },
  ]);
  setLoading(false);
}, 1500);
  }, []);
// composant de presentation
  return <PostListPresenter posts={posts} loading={loading} error={error} />;
}

// Main App Component
const App = () => {
  return (
    <div>
      <h1>Post List</h1>
      <PostListContainer />
    </div>
  );
}

export default App;