import { useSession } from "next-auth/react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { PhotographIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const InputBox = () => {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    const payload = {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timeStamp: serverTimestamp(),
    };

    addDoc(collection(db, "posts"), payload)
      .then((docO) => {
        if (imageToPost) {
          const storageRef = ref(storage, `posts/${docO.id}`);
          const uploadTask = uploadString(
            storageRef,
            imageToPost,
            "data_url"
          ).then((re) => {
            getDownloadURL(re.ref).then((URL) => {
              setDoc(
                doc(db, "posts", docO.id),
                { postImage: URL },
                { merge: true }
              )
                .then((res) => {
                  console.log("Storage updated");
                })
                .catch((err) => {
                  console.log("Storage err:", err);
                });
            });
          });

          removeImage();
        }
      })
      .catch((err) => {
        console.log("catch doc err: ", err);
      });

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
    filePickerRef.current.value = null;
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 ">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1" onSubmit={sendPost}>
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none hover:bg-gray-200"
            type="text"
            ref={inputRef}
            placeholder={`Whats on your mind, ${
              session.user.name.split(" ")[0]
            }?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-evenly p-3 border-t">
          <div className="inputIcon">
            <VideoCameraIcon className="h-7 text-red-500" />
            <p className="text-xs sm: text-sm xl:text-base">Live Video</p>
          </div>
          <div
            onClick={() => filePickerRef.current.click()}
            className="inputIcon"
          >
            <PhotographIcon className="h-7 text-green-400" />
            <p className="text-xs sm: text-sm xl:text-base">Photo/Video</p>
            <input
              hidden
              type="file"
              onChange={(e) => addImageToPost(e)}
              ref={filePickerRef}
            />
          </div>

          <div className="inputIcon">
            <EmojiHappyIcon className="h-7 text-yellow-300" />
            <p className="text-xs sm: text-sm xl:text-base">Feeling/Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
