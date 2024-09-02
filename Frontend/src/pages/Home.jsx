// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const HomePage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Retrieve the token from localStorage (or wherever you store it)
//         const token = localStorage.getItem("token"); // Adjust the key as needed

//         const response = await axios.get(
//           "http://localhost:5000/api/v1/posts/all-posts",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//             },
//           }
//         );

//         setPosts(response.data.data.Post);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <p>Loading posts...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>All Posts</h1>
//       {posts.length > 0 ? (
//         <ul>
//           {posts.map((post) => (
//             <li key={post._id}>
//               <h2>{post.title}</h2>
//               <p>{post.description}</p>
//               {post.post_img && (
//                 <img src={post.post_img.url} alt={post.title} />
//               )}
//               {post.video && <video src={post.video.url} controls />}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No posts available.</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;
