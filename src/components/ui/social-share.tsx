"use client";

import { slugify } from "@/lib/utils";
import { Mail, Share, TwitterIcon } from "lucide-react";
import { Route } from "next";
import { EmailShareButton, TwitterShareButton } from "next-share";
import Link from "next/link";

type SocialShareProps = {
  data: Item;
  className?: string;
};

const SocialShare = ({ data, className }: SocialShareProps) => {
  return (
    <div
      className={`${className} group flex w-1/2 cursor-pointer flex-row gap-0`}
    >
      <div>
        <span className="group flex flex-row gap-1 hover:text-prim">
          <span>share</span>
          <Share className="h-4 w-4 self-center group-hover:stroke-prim" />
        </span>
      </div>
      <div className="mt-1 flex flex-col items-center gap-2 lowercase transition-all duration-100 ease-in-out sm:ml-4 sm:flex-row">
        <TwitterShareButton
          title={`Check this CC0 asset i found on @cc0lib! ${data.Title}`}
          blankTarget={true}
          url={`https://cc0-lib.wtf/${slugify(data.Title)}`}
        >
          <TwitterIcon className="h-4 w-4 self-center opacity-0 hover:stroke-prim hover:text-prim group-hover:opacity-100" />
        </TwitterShareButton>

        <WarpcastShare
          text={`${data.Title}`}
          embed={`https://cc0-lib.wtf/${slugify(data.Title)}`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group/button scale-75 opacity-0 group-hover:opacity-100"
          >
            <mask
              id="mask0_150_5"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="32"
              height="32"
            >
              <path d="M31.9901 0H0V31.9901H31.9901V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_150_5)" className="group">
              <path
                d="M24.0698 31.49H7.92028C3.82917 31.49 0.5 28.161 0.5 24.0698V7.9204C0.5 3.82919 3.82919 0.5 7.92028 0.5H24.0698C28.1609 0.5 31.4901 3.82919 31.4901 7.9204V24.0698C31.4901 28.161 28.161 31.49 24.0698 31.49Z"
                stroke="white"
                strokeWidth={2}
                className="group-hover/button:stroke-[#A779F3]"
              />
              <path
                d="M20.9907 9.62402C20.7641 9.62402 20.5659 9.77641 20.5076 9.99537L19.4126 14.1077L18.3139 9.99498C18.2555 9.77621 18.0573 9.62402 17.8309 9.62402H14.1891C13.9627 9.62402 13.7646 9.77607 13.7061 9.99472L12.5922 14.1553L11.4821 9.99511C11.4237 9.77627 11.2255 9.62402 10.999 9.62402H6.85107C6.69348 9.62402 6.54512 9.69832 6.45071 9.8245C6.35631 9.95069 6.32692 10.114 6.37141 10.2652L10.2257 23.363C10.2883 23.5758 10.4836 23.7219 10.7054 23.7219H14.2839C14.5079 23.7219 14.7045 23.5729 14.7652 23.3573L15.995 18.986L17.2248 23.3573C17.2855 23.5729 17.4821 23.7219 17.7061 23.7219H21.2923C21.5142 23.7219 21.7096 23.5756 21.7721 23.3627L25.6179 10.2649C25.6623 10.1137 25.6329 9.9505 25.5385 9.82438C25.444 9.69827 25.2957 9.62402 25.1382 9.62402H20.9907Z"
                stroke="white"
                // fill="white"
                strokeWidth={2}
                className="group-hover/button:stroke-[#A779F3]"
                // stroke-linejoin="round"
              />
            </g>
          </svg>
        </WarpcastShare>

        <EmailShareButton
          subject={`Check out this CC0 work: ${data.Title}`}
          body={`Hi there,\n\nI wanted to share this amazing CC0 piece of media called "${
            data.Title
          }". You can find it at: https://cc0-lib.wtf/${slugify(
            data.Title
          )}.\n\nEnjoy!\n`}
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

const WarpcastShare = ({ children, text, embed }) => {
  let warpCastURL = `https://warpcast.com/~/compose?text=${text}`;

  if (embed.length > 0) {
    warpCastURL += `&embeds%5B%5D=${embed}`;
  }

  return (
    <Link href={warpCastURL as Route} target="_blank" rel="noreferrer noopener">
      {children}
    </Link>
  );
};
