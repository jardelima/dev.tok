import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "./Article";

export const ForYou = () => {
  const [page, setPage] = useState(1);
  const { data: featuredArticles } = useQuery({
    queryKey: ["articles", page],
    queryFn: async () => {
      const params = new URLSearchParams({
        per_page: "20",
        page: page.toString(),
      });
      return (await api.get("/articles?" + params)).data as Article[];
    },
  });
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles((prev) => [
      ...prev,
      ...(featuredArticles?.filter((x) => x.cover_image) ?? []),
    ]);
  }, [featuredArticles]);

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={() => setPage(page + 1)}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className="snap-y snap-mandatory snap-always !overflow-y-scroll !h-dvh"
      style={{
        height: "100vh",
      }}
    >
      {articles.map((article) => (
        <Article article={article} />
      ))}
    </InfiniteScroll>
  );
};
