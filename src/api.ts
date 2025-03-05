import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://dev.to/api";

export const api = axios.create({
  baseURL: API_URL,
});

type UseArticles = {
  enabled: boolean;
  type: "featured" | "latest";
};

export const useArticles = ({ enabled, type }: UseArticles) => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);

  const url = type === "featured" ? "/articles" : "/articles/latest";
  const { data } = useQuery({
    queryKey: [`${type}Articles`, page],
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
      });
      return (await api.get(`${url}?${params}`)).data as Article[];
    },
  });

  useEffect(() => {
    setArticles((prev) => [
      ...prev,
      ...(data?.filter((x) => x.cover_image) ?? []),
    ]);
  }, [data]);

  return { articles, fetchMore: () => setPage((prev) => prev + 1) };
};
