import { PropsWithChildren, useRef, useState } from "react";
import { useArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "./Article";
import { Spinner } from "@phosphor-icons/react";
import { Comments, CommentsHandler } from "./Comments";

const tabs = ["featured", "latest"] as const;
type Tab = (typeof tabs)[number];

export const ForYou = () => {
  const [tab, setTab] = useState<Tab>("featured");
  const commentsHandler = useRef<CommentsHandler>(null);

  const featured = useArticles({
    type: "featured",
    enabled: tab === "featured",
  });
  const latest = useArticles({
    type: "latest",
    enabled: tab === "latest",
  });

  return (
    <div className="flex flex-col items-center">
      <div role="tablist" className="tabs tabs-border fixed top-4 z-40">
        {tabs.map((t) => (
          <a
            role="tab"
            className={`tab ${tab === t ? "tab-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "featured" ? "Featured" : "Latest"}
          </a>
        ))}
      </div>
      <ScrollView
        items={featured.articles}
        fetchMore={featured.fetchMore}
        visible={tab === "featured"}
      >
        {featured.articles.map((article) => (
          <Article
            article={article}
            onCommentsClick={() => {
              commentsHandler.current?.open(article.id);
            }}
          />
        ))}
      </ScrollView>
      <ScrollView
        items={latest.articles}
        fetchMore={latest.fetchMore}
        visible={tab === "latest"}
      >
        {latest.articles.map((article) => (
          <Article
            article={article}
            onCommentsClick={() => {
              commentsHandler.current?.open(article.id);
            }}
          />
        ))}
      </ScrollView>
      <Comments ref={commentsHandler} />
    </div>
  );
};

type ScrollViewProps = {
  items: Article[];
  visible: boolean;
  fetchMore: () => void;
};

const ScrollView = ({
  items,
  fetchMore,
  visible,
  children,
}: PropsWithChildren<ScrollViewProps>) => (
  <InfiniteScroll
    dataLength={items.length}
    key="featuredScroll"
    next={fetchMore}
    hasMore={true}
    loader={
      !items.length ? (
        <Spinner
          className="text-gray-100 w-20 h-20 animate-spin fixed top-1/2 left-1/2 -translate-1/2 bg-black/25 p-2 rounded-full"
          weight="bold"
        />
      ) : null
    }
    endMessage={
      <p className="text-center py-3">
        <b>Yay! You have seen it all</b>
      </p>
    }
    className={`${
      visible ? "" : "hidden"
    } for-you snap-y snap-mandatory snap-always !overflow-y-scroll !h-dvh`}
    height="100vh"
  >
    {children}
  </InfiniteScroll>
);
