import { getAllRawItems } from "@/lib/utils";
import SubmissionListPage from "./submission-list";

type Props = {};
const SubmissionsPage = async (props: Props) => {
  const rawData: Item[] = await getAllRawItems();

  return (
    <>
      <SubmissionListPage rawData={rawData} />
    </>
  );
};
export default SubmissionsPage;
