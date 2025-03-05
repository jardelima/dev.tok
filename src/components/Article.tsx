import { ChatCircleDots, Heart } from "@phosphor-icons/react";

type ArticleProps = {
  article: Article;
  onCommentsClick?: () => void;
};

export const Article = ({ article, onCommentsClick }: ArticleProps) => {
  return (
    <div className="h-dyn-screen snap-center flex flex-col justify-end items-center relative max-w-[500px] mx-auto">
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
          className="h-full w-full absolute -top-20 object-contain -z-10"
          src={article.cover_image}
          alt={article.title}
        />
      </div>
      <div className="from-black/50 to-transparent bg-gradient-to-t p-3 pb-6">
        <div className="w-[calc(100%-0.75rem)] grid grid-cols-[90%_10%] gap-3 box-">
          <div className="bg-black/25 p-3 rounded-lg">
            <h2 className="font-bold text-2xl mb-2">{article.title}</h2>
            <div className="flex flex-wrap mb-2">
              {article.tag_list.map((tag) => (
                <span
                  key={tag}
                  className="border-gray-100 border text-gray-100 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <hr className="mb-4" />
            <p className="mb-4">{article.description}</p>
            <div className="flex items-center justify-between">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-outline">Read More</button>
              </a>
              <p className="opacity-50">
                {article.reading_time_minutes} min read &middot;{" "}
                {new Date(article.published_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <a
              href={`https://dev.to/${article.user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10"
            >
              {article.organization && (
                <img
                  className="absolute rounded-full w-full max-w-10 border-2 -z-10 -top-5"
                  src={article.organization.profile_image_90}
                  alt={article.organization.name}
                />
              )}
              <img
                className="rounded-full w-full max-w-10 border-2"
                src={article.user.profile_image_90}
                alt={article.user.name}
              />
            </a>
            <div className="flex flex-col text-center gap-1 w-10 justify-center">
              <Heart className="text-gray-100 w-10 h-10" weight="fill" />
              <p className="text-gray-100 text-sm">
                {article.public_reactions_count}
              </p>
            </div>
            <div className="flex flex-col text-center gap-1 w-10">
              <button onClick={onCommentsClick}>
                <ChatCircleDots
                  className="text-gray-100 w-10 h-10"
                  weight="fill"
                />
              </button>
              <p className="text-gray-100 text-sm">{article.comments_count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
