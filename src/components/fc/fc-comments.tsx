import { getRepliesFromFC } from "@/lib/utils";

type FCCommentsProps = {
  slug: string;
};

const FCComments = async ({ slug }: FCCommentsProps) => {
  const comments = await getRepliesFromFC(slug);

  return (
    <>
      {comments && comments.length >= 1 && (
        <div className="flex max-w-sm flex-col gap-2 overflow-hidden">
          <span className="font-rubik text-lg text-[#A779F3]">fc comments</span>
          <div className="max-h-16 overflow-scroll">
            {comments.map((comment, index) => {
              return (
                <div
                  key={`comment-${index}`}
                  className="flex flex-col gap-1 text-sm text-zinc-400 "
                >
                  {comment.username}: {comment.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default FCComments;
