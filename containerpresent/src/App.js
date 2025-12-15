import React, { useState, useEffect } from 'react';

// Presenter Component 1
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
// Presenter Component 2
const CardPresenter = ({ title, content }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);
// Presentation Component 3
const TableComponent = ({ posts }) => (
  <table border="1" cellPadding="5">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
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
  // return <PostListPresenter posts={posts} loading={loading} error={error} />;
// return <CardPresenter title="Post List" content={posts.map(post => post.title).join(', ')} />;
return <TableComponent posts={posts} />;
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