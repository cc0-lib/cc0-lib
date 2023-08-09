import UploadModule from "./upload";
import GridCard from "@/components/dashboard/uploader/grid-card";

type Props = {};
const UploaderPage = (props: Props) => {
  return (
    <>
      <GridCard
        title="uploader"
        subtitle="upload expenses are funded by the cc0-lib fund pool with the support of Nouns DAO (prop 343)"
      >
        <div className="flex h-fit w-full flex-col items-center justify-center gap-8 p-8 text-zinc-700">
          <UploadModule />
        </div>
      </GridCard>
      <GridCard title="back" link="/dashboard"></GridCard>
    </>
  );
};
export default UploaderPage;
