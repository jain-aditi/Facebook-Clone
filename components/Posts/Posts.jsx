import { collection, orderBy, query } from 'firebase/firestore';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import { db } from '../../firebaseConfig';
import Post from './Post';

const   Posts = () => {
    const [realtimePosts, loading, error] = useCollection(
        query(collection(db,"posts"),orderBy("timeStamp","desc"))
    );
  return (
    <div>
        {realtimePosts?.docs.map((post)=>{
            return <Post
            key={post.id}
            name={post.data().name}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timeStamp}
            image={post.data().image}
            postImage={post.data().postImage}
            />
        })}
    </div>
  )
}

export default Posts