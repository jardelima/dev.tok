import { PropsWithChildren, useState } from "react";
import { useArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "./Article";

const tabs = ["featured", "latest"] as const;
type Tab = (typeof tabs)[number];

export const ForYou = () => {
  const [tab, setTab] = useState<Tab>("featured");

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
      <div role="tablist" className="tabs tabs-border fixed top-4 z-50">
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
          <Article article={article} />
        ))}
      </ScrollView>
      <ScrollView
        items={latest.articles}
        fetchMore={latest.fetchMore}
        visible={tab === "latest"}
      >
        {latest.articles.map((article) => (
          <Article article={article} />
        ))}
      </ScrollView>
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
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: "center" }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
    className={`${
      visible ? "" : "hidden"
    } snap-y snap-mandatory snap-always !overflow-y-scroll !h-dvh`}
    height="100vh"
  >
    {children}
  </InfiniteScroll>
);
