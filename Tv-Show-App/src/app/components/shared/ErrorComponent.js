import { Alert, Box } from "@mui/material";

export const ErrorComponent = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "30vh",
        justifyContent: "center",
      }}
    >
      <Alert severity="error">
        Something Went Wrong ! please try again later...
      </Alert>
    </Box>
  );
};
