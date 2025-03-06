import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tab } from "./Tabs";
import { useArticles } from "../../shared/api";
import { Spinner } from "@phosphor-icons/react";
import { Article } from "../Article";
import { CommentsHandler } from "./Comments";
import { RefObject } from "react";

type ContentProps = {
  /**
   * What tab this content relates to.
   */
  contentTab: Tab;
  selectedTab: Tab;
  commentsHandler: RefObject<CommentsHandler | null>;
};

export const Content = ({
  selectedTab,
  contentTab,
  commentsHandler,
}: ContentProps) => {
  const { t } = useTranslation();

  const { articles, fetchMore } = useArticles({
    type: contentTab === "latest" ? "latest" : "popular",
    enabled: selectedTab === contentTab,
    tags:
      selectedTab === "for_you"
        ? localStorage.getItem("preferences") ?? ""
        : "",
  });

  return (
    <InfiniteScroll
      dataLength={articles.length}
      key="popularScroll"
      next={fetchMore}
      hasMore={true}
      loader={
        !articles.length ? (
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
        selectedTab === contentTab ? "" : "hidden"
      } for-you snap-y snap-mandatory snap-always !overflow-y-scroll !h-dvh`}
      height="100vh"
    >
      {articles.map((article) => (
        <Article
          article={article}
          onCommentsClick={() => commentsHandler.current?.open(article.id)}
        />
      ))}
    </InfiniteScroll>
  );
};
