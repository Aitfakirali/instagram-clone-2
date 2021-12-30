import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartFilledIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import { useInView } from "react-intersection-observer";

const option = {
  threshold: 0.5,
  triggerOnce: true,
};
function Post({ id, username, userImg, image, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { ref, inView, entry } = useInView(option);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes, session?.user?.uid]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session.user.username,
      });
    }
  };

  const sentComment = async (e) => {
    e.preventDefault();
    const sendingComment = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: sendingComment,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className={`bg-white my-7 border rounded-sm`}>
      {/* header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 hover:underline cursor-pointer font-semibold">
          {username}
        </p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>
      {/* image */}
      <img
        ref={ref}
        src={image}
        className={`transition-opacity duration-200 ${
          inView ? "opacity-100" : "opacity-0"
        } object-cover w-full`}
        alt=""
      />

      {/* buttons */}
      {session && (
        <div className="flex justify-between items-center px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartFilledIcon
                onClick={likePost}
                className="btn fill-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45 translate-x-4 origin-top" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* Likes */}
      <div className="flex justify-between items-center px-4 pt-4">
        <p className="font-semibold">
          {likes.length} {likes.length <= 1 ? "like" : "likes"}
        </p>
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-semibold inline-block mr-2">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="rounded-full h-10 w-10"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-semibold mr-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-8" />
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Add a comment...."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sentComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
