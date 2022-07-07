import { useSession } from "next-auth/react";
import React from "react";
import StoryCard from "./StoryCard";



const Stories = () => {
    const {data:session} = useSession();
    const stories = [
        {
          name: "Aditi Jain",
          src: "https://links.papareact.com/zof",
          profile: session.user.image,
        },
        {
          name: "Elon Musk",
          src: "https://links.papareact.com/4zn",
          profile: "https://links.papareact.com/kxk",
        },
        {
          name: "Jeff Bezoz",
          src: "https://links.papareact.com/k2j",
          profile: "data:image/jpeg;base64,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",
        },
        {
          name: "Mark Zuckerberg",
          src: "https://links.papareact.com/xql",
          profile: "https://links.papareact.com/snf",
        },
        {
          name: "Bill Gates",
          src: "https://links.papareact.com/4u4",
          profile: "https://links.papareact.com/zvy",
        },
      ];
  return <div className="flex justify-center space-x-3 mx-auto">
    {stories.map((story)=>{
        return <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile}/>
    })}
  </div>;
};

export default Stories;
