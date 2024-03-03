import { useEffect } from "react";
import { USER_LOGIN } from "../../util/settings/config";
import { useParams, useNavigate } from "react-router-dom";

function CheckoutTemplate({ Component, ...restProps }) {
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    navigate("/login");
    return;
  }

  return (
    <>
      <Component {...restProps} id={id} />
    </>
  );
}

export default CheckoutTemplate;
