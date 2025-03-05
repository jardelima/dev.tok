import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";

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
    setArticles((prev) => [...prev, ...(featuredArticles ?? [])]);
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
    >
      {articles.map((article) => (
        <div
          key={article.id}
          className="h-screen flex flex-col justify-end items-center relative max-w-[500px] mx-auto"
        >
          <div className="h-full w-full absolute pointer-events-none">
            <div
              className="h-full w-full absolute blur-md brightness-50 -z-20"
              style={{
                backgroundImage: `url(${article.cover_image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
            <img
              className="h-full w-full absolute object-contain -z-10"
              src={article.cover_image}
              alt={article.title}
            />
          </div>
          <div className="from-black/50 to-transparent bg-gradient-to-t p-3">
            <div className="bg-black/25 p-3 rounded-lg">
              <h2 className="font-bold text-2xl mb-4">{article.title}</h2>
              <hr className="mb-4" />
              <p className="mb-4">{article.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="rounded-full h-8 w-8"
                    src={article.user.profile_image_90}
                    alt={article.user.name}
                  />
                  <span>{article.user.name}</span>
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-outline">Read More</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};
