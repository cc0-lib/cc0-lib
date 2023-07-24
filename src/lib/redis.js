"use server";

import { kv } from "@vercel/kv";

const addLike = async (slug, address) => {
  await kv.sadd(`liked:${address}`, slug);
};

const remLike = async (slug, address) => {
  await kv.srem(`liked:${address}`, slug);
};

const getLikeFromKV = async (address) => {
  return await kv.smembers(`liked:${address}`);
};

const addComment = async (id, comment) => {
  await kv.lpush(`comments:${id}`, comment);
};

export { addLike, remLike, getLikeFromKV, addComment };
