"use client";

import { slugify } from "@/lib/utils";
import { Mail, Share, TwitterIcon } from "lucide-react";
import { EmailShareButton, TwitterShareButton } from "next-share";

const SocialShare = ({ data, className }) => {
  return (
    <div
      className={`${className} group flex w-1/2 cursor-pointer flex-row gap-4`}
    >
      <span className="group flex flex-row gap-1 text-lg hover:text-prim">
        <span>share</span>
        <Share className="h-4 w-4 self-center group-hover:stroke-prim" />
      </span>
      <div className="flex flex-row items-center gap-2 lowercase transition-all duration-100 ease-in-out">
        <TwitterShareButton
          title={`Check out this CC0 work. ${data.Title}`}
          blankTarget={true}
          hashtags={data.Tags}
          url={`https://cc0-lib.wtf/${slugify(data.Title)}`}
        >
          <TwitterIcon className="h-4 w-4 self-center opacity-0 hover:stroke-prim hover:text-prim group-hover:opacity-100" />
        </TwitterShareButton>
        <EmailShareButton
          subject={data.Title}
          body={`Check out this CC0 piece of media: ${data.Title}`}
          url={`https://cc0-lib.wtf/${slugify(data.Title)}`}
          blankTarget={true}
        >
          <Mail className="h-4 w-4 self-center opacity-0 hover:stroke-prim hover:text-prim group-hover:opacity-100" />
        </EmailShareButton>
      </div>
    </div>
  );
};
export default SocialShare;
