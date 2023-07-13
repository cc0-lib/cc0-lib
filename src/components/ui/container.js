import Footer from "./footer";
import Header from "./header";

const Container = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Container;
