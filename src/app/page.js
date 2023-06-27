import FrontPage from "@/components/FrontPage";
import getAllItems from "@/lib/getAllItems";

export default async function Home() {
  const data = await getAllItems();

  return (
    <>
      <FrontPage initialData={data} />
    </>
  );
}
