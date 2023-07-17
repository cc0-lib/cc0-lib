import { kv } from "@vercel/kv";

const Comments = async ({ id }) => {
  const comments = await kv.lrange(`comments:${id}`, 0, 2);

  return (
    <>
      {comments && comments.length >= 1 && (
        <div className="flex flex-col gap-2">
          <span className="font-rubik text-lg text-prim">comments</span>
          {comments.map((comment) => {
            return (
              <div
                key={comment}
                className="flex flex-col gap-1 text-sm text-zinc-400"
              >
                {comment}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Comments;
