import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="inherit" sx={{ mx: "auto" }} />
    </Box>
  );
};

export default Loader;
