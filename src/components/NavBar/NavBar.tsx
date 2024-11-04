import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { FormControl, FormControlLabel, Radio, RadioGroup, useColorScheme } from '@mui/material';


const NavBar = () => {

  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 5, boxShadow: 10 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              color="inherit"
              to="/"
              variant="h5"
              component={NavLink}
              sx={{ flexGrow: 1, textDecoration: "none", fontSize: "18px" }}
            >
              Calorie tracker
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-theme-toggle"
                name="theme-toggle"
                row
                value={mode}
                onChange={(event) =>
                  setMode(event.target.value as 'system' | 'light' | 'dark')
                }
              >
                <FormControlLabel  value="system" control={<Radio />} label="System" />
                <FormControlLabel value="light" control={<Radio  sx={{
                  '&.Mui-checked': {
                    color: "white",
                  },
                }} />} label="Light" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              </RadioGroup>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
