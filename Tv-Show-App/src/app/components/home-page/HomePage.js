import { useEffect, React } from "react";

// redux mapping
import { useDispatch } from "react-redux";

// material ui components
import { Container } from "@mui/material";
import { checkServer } from "../../slices/auth.slice";

export const HomePage = (props) => {
  // set up dispatch
  const dispatch = useDispatch();

  // hook to fetch movie shows
  useEffect(() => {
    dispatch(checkServer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Container fixed>Hello To discovery App</Container>;
};

HomePage.prototype = {};
