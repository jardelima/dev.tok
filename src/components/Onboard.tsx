import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useState } from "react";

type OnboardProps = {
  onFinish: () => void;
};

export const Onboard = ({ onFinish }: OnboardProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const params = new URLSearchParams({
        per_page: "50",
      });
      return (await api.get("/tags?" + params)).data as Tag[];
    },
  });

  const onTagClick = (tag: Tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="text-center flex flex-col h-screen items-center justify-center gap-5">
      <div>
        <h1 className="font-bold text-2xl">Welcome to Dev.tok!</h1>
        <p>In what topics are you interested in?</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {tags?.map((tag) => (
          <button
            className="btn"
            key={tag.id}
            style={{
              backgroundColor: selectedTags.find((x) => x.id === tag.id)
                ? tag.bg_color_hex ?? "blue"
                : undefined,
              color: selectedTags.find((x) => x.id === tag.id)
                ? tag.text_color_hex ?? "white"
                : undefined,
              borderColor: tag.bg_color_hex ?? undefined,
            }}
            onClick={() => onTagClick(tag)}
          >
            {tag.name}
          </button>
        ))}
      </div>
      <div>
        <button
          onClick={onFinish}
          className="btn mt-4"
          disabled={!selectedTags.length}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
