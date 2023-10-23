import RiveLoading from "@/components/anim/rive-loading";
import Container from "@/components/ui/container";

const LoadingPage = () => {
  return (
    <Container>
      <div className="w-full max-w-md">
        <RiveLoading />
      </div>
    </Container>
  );
};
export default LoadingPage;
