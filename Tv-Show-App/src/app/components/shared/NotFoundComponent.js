import { Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundComponent = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "30vh",
        justifyContent: "center",
      }}
    >
      <Alert severity="info">
        The page that you are requesting dosn't exist,{" "}
        <Link to={"/search-page/tvs"} style={{ textDecoration: "underline" }}>
          Go back to search page
        </Link>
      </Alert>
    </Box>
  );
};
