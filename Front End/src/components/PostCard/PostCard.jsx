import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns"; // For displaying time ago
import { getAllComments, addComment } from "../../api/comment.js";
import { toggle_like, all_likes, like_check } from "../../api/like.api.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addBookmark } from "../../api/bookmark.api.js";
export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  // Format the createdAt date to "time ago"
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });
  // Fallback image if post_img is not provided
  const Postimg = post?.post_img?.url ? post.post_img.url : null;
  // * handle comments section
  // State to manage comment visibility and comment data
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]); // Store comments data
  const [Newcomment, setNewcomment] = useState("");
  const fetchComments = async () => {
    const response = await getAllComments(post._id);
    setComments(response.data);
  };
  useEffect(() => {
    // Fetch comments when showing comments section
    fetchComments();
    total_likes();
    handleLikeUI();
  }, []); // Only fetch comments when showComments changes to true
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const handleNewcomment = async (e) => {
    setNewcomment(e.target.value);
  };
  const handleNewCommentSubmit = async (e) => {
    const response = await addComment(Newcomment, post._id);
    // console.log("respoence", response);
    // when we add post then i am fetching comments again
    fetchComments();
  };
  // * handle like click
  const [TotalLikes, setTotalLikes] = useState(0);
  const [IsLike, setIsLike] = useState(false);
  const handleLike = async () => {
    const userlike = await toggle_like(post._id);
    const hasLiked = userlike.data; // Get whether the user has liked the post or not

    setIsLike(hasLiked); // here we set false or true ,  if the user like the post or not ... main point is  make ui batter if user like the post and  we user reload the page then post has like and color is also turned ON .

    setTotalLikes((pre) => (IsLike ? pre - 1 : pre + 1));
  };

  const total_likes = async () => {
    const allLikes = await all_likes(post._id);
    setTotalLikes(allLikes?.data?.[0]?.totalLikes || 0);
  };
  //* handle bookmark
  const [IsBookMark, setIsBookMark] = useState(false);
  const handleBookmark = async () => {
    // first we toggle bookmark and check is this post is already bookmarked or not
    const toggle_Bookmark = await addBookmark(post._id);
    const hasBookMarked = toggle_Bookmark.data; // Get whether the user has bookmarked the post or not
    setIsBookMark(hasBookMarked);
  };
  // * handleLikeUI use to check user like   and bookmark posts and then set these post icon color ON / OFF
  const handleLikeUI = async () => {
    // check user likes
    const userlike = await like_check(post._id);
    const hasLiked = userlike.data; // Get whether the user has liked the post or not
    console.log("hasLiked", hasLiked);

    setIsLike(hasLiked); // here we set false or true ,  if the user like the post or not ... main point is  make ui batter if user like the post and  we user reload the page then post has like and color is also turned ON .
    // check user bookmark
    // const toggle_Bookmark = await addBookmark(post._id);
    // const hasBookMarked = toggle_Bookmark.data; // Get whether the user has bookmarked the post or not
    // setIsBookMark(hasBookMarked);
  };
  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-700 rounded-lg p-4 text-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Link to={`/profile/${post.owner}`}>
            <img
              src={post.user[0].avatar.url}
              alt="User Profile"
              className="w-14 h-14 rounded-full mr-4"
            />
          </Link>
          <div>
            <span className="block text-xl font-bold">
              {post.user[0].user_name}
            </span>
            <span className="block text-md text-gray-400">{timeAgo}</span>
          </div>
        </div>
        <div className="text-2xl">...</div>
      </div>
      <div className="mb-4">
        {/* Post Content */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-lg text-gray-300 mb-4">{post.description}</p>
          {Postimg && (
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={Postimg}
                alt="Post"
                className="w-full h-auto max-h-64 object-cover"
              />
            </div>
          )}
        </div>
      </div>
      {/* Post Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {/* like button  */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2
              ${IsLike ? `text-purple-500` : ` text-[#e1e1e2]`}
              `}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{TotalLikes}</span>
          </button>
          <button
            className="flex items-center space-x-2 text-[#a88cd5]"
            onClick={toggleComments}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
            {/* Display number of comments dynamically */}
            <span> {comments.length}</span>
          </button>
          {/* Bookmae button */}
          <button
            onClick={handleBookmark}
            className={`group relative inline-flex items-center gap-x-1 outline-none  transition ease-in-out  duration-300
              ${IsBookMark ? `text-purple-500` : ` text-[#e1e1e2]`}
              `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-8 w-5 text-[#e6e5e8] group-hover:text-[#ae7aff] transition-all duration-300 ease-in-out group-focus:text-[#ae7aff]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              ></path>
            </svg>
            {/* <!-- Optional Tooltip --> */}
            <span class="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              Bookmark
            </span>
          </button>
        </div>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-2">
              <img
                src={comment.user.avatar.url}
                alt={comment.user.user_name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <span className="font-bold ">{comment.user.user_name} : </span>{" "}
                <span className="text-gray-300 pl-1">{comment.content}</span>
              </div>
            </div>
          ))}
          {/* Comment Input and Send Button */}
          <div className="mt-4">
            <textarea
              className="w-full p-2 mb-2 rounded-lg bg-gray-800 text-white"
              rows="3"
              // value={"newComment"}
              onChange={handleNewcomment}
              placeholder="Add a comment..."
            ></textarea>
            <button
              onClick={handleNewCommentSubmit}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
              // onClick={handleCommentSubmit}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PostCard;
