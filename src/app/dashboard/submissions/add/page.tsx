import GridCard from "@/components/dashboard/uploader/grid-card";
import AddSubmission from "./add";

type Props = {};
const AddSubmissionPage = (props: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <GridCard
        title="Add Submission"
        subtitle="Add a new submission to the database"
      >
        <div className="w-full gap-4 px-16 py-8 font-jetbrains">
          <AddSubmission />
        </div>
      </GridCard>
      <GridCard
        title="back"
        link="/dashboard/submissions?draft=true"
      ></GridCard>
    </div>
  );
};
export default AddSubmissionPage;
