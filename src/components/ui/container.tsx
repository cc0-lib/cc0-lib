import Cursor from "../cursor";
import Footer from "./footer";
import Header from "./header";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Header />
      <Cursor name="random" optional={false} />
      {children}
      <Footer />
    </>
  );
};
export default Container;
