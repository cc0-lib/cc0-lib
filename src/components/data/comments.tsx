import { kv } from "@vercel/kv";

type CommentsProps = {
  id: number;
};

const Comments = async ({ id }: CommentsProps) => {
  const comments: string[] = await kv.lrange(`comments:${id}`, 0, -1);

  return (
    <>
      {comments && comments.length >= 1 && (
        <div className="flex max-w-sm flex-col gap-2 overflow-hidden">
          <span className="font-rubik text-lg text-prim">comments</span>
          <div className="max-h-16 overflow-scroll">
            {comments.map((comment) => {
              return (
                <div
                  key={comment}
                  className="flex flex-col gap-1 text-sm text-zinc-400 "
                >
                  {comment}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Comments;
