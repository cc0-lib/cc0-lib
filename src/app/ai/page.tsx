import Container from "@/components/ui/container";
import AISearchPage from "./search";
import { Suspense } from "react";

const AIPage = () => {
  return (
    <Container>
      <div className="flex w-full flex-col items-center gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <AISearchPage />
        </Suspense>
      </div>
    </Container>
  );
};
export default AIPage;
