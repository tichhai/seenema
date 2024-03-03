import { useEffect } from "react";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import { useParams } from "react-router-dom";

function HomeTemplate({ Component, ...restProps }) {
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <Header {...restProps} />
      <Component {...restProps} id={id} />
      <hr className="mt-5" />
      <Footer />
    </>
  );
}

export default HomeTemplate;
