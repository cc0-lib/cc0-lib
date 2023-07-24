import { kv } from "@vercel/kv";
import { Eye } from "lucide-react";

const PageViews = async ({ id }) => {
  const pageView = await kv.incr(`view:${id}`);
  return (
    <>
      {pageView && (
        <span className="flex flex-row gap-2 text-sm text-zinc-400">
          <Eye className="h-4 w-4 self-center" />
          <span className="self-center">{pageView}</span>
        </span>
      )}
    </>
  );
};
export default PageViews;
