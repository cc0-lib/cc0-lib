import { notFound } from "next/navigation";

const NotFoundCatchAll = () => notFound();

export default NotFoundCatchAll;

// fix the not-found infinite reload issue
// https://github.com/vercel/next.js/discussions/40000#discussioncomment-6291368
