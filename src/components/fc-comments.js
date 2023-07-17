import { getRepliesFromFC } from "@/lib/utils";

const FCComments = async ({ slug }) => {
  const data = await getRepliesFromFC(slug);

  return (
    <>
      {data && data.length >= 1 && (
        <div className="flex max-w-sm flex-col gap-2 overflow-hidden">
          <span className="font-rubik text-lg text-[#A779F3]">fc comments</span>
          <div className="max-h-16 overflow-scroll">
            {data.map((comment) => {
              return (
                <div
                  key={comment}
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
