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

const getViews = async (id: number) => {
  return await kv.get(`view:${id}`);
};

const getComments = async (id: number) => {
  return await kv.lrange(`comments:${id}`, 0, -1);
};

const addUploaded = async (id: number, address: string) => {
  await kv.sadd(`uploaded:${address}`, id);
};

const getUploaded = async (address: string) => {
  return await kv.smembers(`uploaded:${address}`);
};

export {
  addLike,
  remLike,
  getLikeFromKV,
  addComment,
  getViews,
  getComments,
  addUploaded,
  getUploaded,
};
