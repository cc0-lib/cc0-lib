import Cursor from "../cursor";
import Footer from "./footer";
import Header from "./header";

const Container = ({ children }) => {
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
