import { useRef, useState } from "react";
import { Comments, CommentsHandler } from "./Comments";
import { Tab, Tabs } from "./Tabs";
import { Content } from "./Content";

export const Feed = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>("for_you");
  const commentsHandler = useRef<CommentsHandler>(null);

  return (
    <div className="flex flex-col items-center">
      <Tabs onSelectTab={setSelectedTab} selectedTab={selectedTab} />
      <Content
        contentTab="popular"
        selectedTab={selectedTab}
        commentsHandler={commentsHandler}
      />
      <Content
        contentTab="for_you"
        selectedTab={selectedTab}
        commentsHandler={commentsHandler}
      />
      <Content
        contentTab="latest"
        selectedTab={selectedTab}
        commentsHandler={commentsHandler}
      />
      <Comments ref={commentsHandler} />
    </div>
  );
};
