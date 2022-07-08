import { collection, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConfig";
import Post from "./Post";

const Posts = ({ posts }) => {
  const [realtimePosts] = useCollection(
    query(collection(db, "posts"), orderBy("timeStamp", "desc"))
  );
  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timeStamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timeStamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
    </div>
  );
};

export default Posts;
