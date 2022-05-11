import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./Store/Globalstate";

function PrivateRoutes({ component: Component }, props) {
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(GlobalContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isLogin) {
      setLoading(false);
      return;
    }
    navigate("/");
  }, []);

  return <>{loading ? "Loading..." : <Component {...props} />} </>;
}

export default PrivateRoutes;