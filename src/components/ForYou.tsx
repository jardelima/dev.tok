import { PropsWithChildren, useRef, useState } from "react";
import { useArticles } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "./Article";
import { Spinner } from "@phosphor-icons/react";
import { Comments, CommentsHandler } from "./Comments";
import { useTranslation } from "react-i18next";

const tabs = ["popular", "for_you", "latest"] as const;
export type Tab = (typeof tabs)[number];

export const ForYou = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<Tab>("for_you");
  const commentsHandler = useRef<CommentsHandler>(null);

  const popular = useArticles({
    type: "popular",
    enabled: selectedTab === "popular",
  });
  const latest = useArticles({
    type: "latest",
    enabled: selectedTab === "latest",
  });
  const forYou = useArticles({
    type: "popular",
    enabled: selectedTab === "for_you",
    tags: localStorage.getItem("preferences") ?? "",
  });

  return (
    <div className="flex flex-col items-center">
      <div role="tablist" className="tabs tabs-border fixed top-4 z-40">
        {tabs.map((tab) => (
          <a
            role="tab"
            className={`tab w-28 ${selectedTab === tab ? "tab-active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {t(`tabs.${tab}`)}
          </a>
        ))}
      </div>
      <ScrollView
        items={popular.articles}
        fetchMore={popular.fetchMore}
        visible={selectedTab === "popular"}
      >
        {popular.articles.map((article) => (
          <Article
            article={article}
            onCommentsClick={() => {
              commentsHandler.current?.open(article.id);
            }}
          />
        ))}
      </ScrollView>
      <ScrollView
        items={forYou.articles}
        fetchMore={forYou.fetchMore}
        visible={selectedTab === "for_you"}
      >
        {forYou.articles.map((article) => (
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
        visible={selectedTab === "latest"}
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
}: PropsWithChildren<ScrollViewProps>) => {
  const { t } = useTranslation();
  return (
    <InfiniteScroll
      dataLength={items.length}
      key="popularScroll"
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
          <b>{t("forYou.articlesFinished")}</b>
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
};
