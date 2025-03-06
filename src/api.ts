import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://dev.to/api";

export const api = axios.create({
  baseURL: API_URL,
});

type UseArticles = {
  enabled: boolean;
  type: "popular" | "latest";
  tags?: string;
};

export const useArticles = ({ enabled, type, tags = "" }: UseArticles) => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);

  const url = type === "popular" ? "/articles" : "/articles/latest";
  const { data, refetch } = useQuery({
    queryKey: [`${type}Articles`, page, tags],
    enabled,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
      });
      if (tags) {
        const tagArray = tags.split(",");
        const randomTag = tagArray[Math.floor(Math.random() * tagArray.length)];
        params.set("tag", randomTag);
        params.set("tags", tags);
      }
      return (await api.get(`${url}?${params}`)).data as Article[];
    },
  });

  useEffect(() => {
    setArticles((prev) => [
      ...prev,
      ...(data?.filter((x) => x.cover_image) ?? []),
    ]);
  }, [data]);

  return { articles, fetchMore: () => setPage((prev) => prev + 1), refetch };
};
