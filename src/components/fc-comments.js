import { getRepliesFromFC } from "@/lib/utils";

const FCComments = async ({ slug }) => {
  const data = await getRepliesFromFC(slug);

  return (
    <>
      {data && data.length >= 1 && (
        <div className="flex flex-col gap-2">
          <span className="font-rubik text-lg text-prim">fc comments</span>
          {data.map((comment) => {
            return (
              <div
                key={comment}
                className="flex flex-col gap-1 text-sm text-zinc-400"
              >
                {comment.username}: {comment.text}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default FCComments;
