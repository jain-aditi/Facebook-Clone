import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";
import { db } from "../firebaseConfig";

export default function Home({posts}) {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <div className="h-screen bg-gray-100 overflow-hidden">
          <Head>
            <title>Facebook</title>
          </Head>

          <Header session={session} />

          <main className="flex">
            <Sidebar />
            <Feed posts={posts}/>
            <Widgets />
          </main>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const posts = await getDocs(
    query(collection(db, "posts"), orderBy("timeStamp", "desc"))
  );
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timeStamp: null,
  }));
  return {
    props: { posts: docs }, // will be passed to the page component as props
  };
}
