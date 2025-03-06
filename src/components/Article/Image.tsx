type ImageProps = {
  article: Article;
};

export const Image = ({ article }: ImageProps) => {
  return (
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
        className="h-full w-full max-w-screen absolute -top-20 object-contain -z-10"
        src={article.cover_image}
        alt={article.title}
      />
    </div>
  );
};
