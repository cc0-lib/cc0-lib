"use server";

import { kv } from "@vercel/kv";

const addLike = async (slug: string, address: string) => {
  await kv.sadd(`liked:${address}`, slug);
};

const remLike = async (slug: string, address: string) => {
  await kv.srem(`liked:${address}`, slug);
};

const getLikeFromKV = async (address: string) => {
  return await kv.smembers(`liked:${address}`);
};

const addComment = async (id: number, comment: string) => {
  await kv.lpush(`comments:${id}`, comment);
};

export { addLike, remLike, getLikeFromKV, addComment };
