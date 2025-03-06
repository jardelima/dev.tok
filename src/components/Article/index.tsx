import { SocialButtons } from "./SocialButtons";
import { Image } from "./Image";
import { ContentPreview } from "./ContentPreview";

type ArticleProps = {
  article: Article;
  onCommentsClick?: () => void;
};

export const Article = ({ article, onCommentsClick }: ArticleProps) => {
  return (
    <div className="h-dyn-screen snap-center flex flex-col justify-end items-center relative max-w-[500px] mx-auto">
      <Image article={article} />
      <div className="from-black/50 to-transparent bg-gradient-to-t p-3 pb-8 max-w-screen">
        <div className="w-[calc(100%-0.75rem)] max-w-screen grid grid-cols-[90%_10%] gap-3 box-">
          <ContentPreview article={article} />
          <SocialButtons article={article} onCommentsClick={onCommentsClick} />
        </div>
      </div>
    </div>
  );
};
