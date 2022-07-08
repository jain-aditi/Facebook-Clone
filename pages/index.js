import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";
import { db } from "../firebaseConfig";

export default function Home() {
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
            <Feed />
            <Widgets />
          </main>
        </div>
      )}
    </>
  );
}


