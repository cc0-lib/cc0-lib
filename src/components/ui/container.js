import Cursor from "../cursor";
import Footer from "./footer";
import Header from "./header";

const Container = ({ children }) => {
  const randomString = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <>
      <Header />
      <Cursor name={randomString()} />
      {children}
      <Footer />
    </>
  );
};
export default Container;
