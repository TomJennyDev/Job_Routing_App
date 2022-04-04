import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import useChangeTheme from "../hooks/useTheme";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#f50057" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(FTextField)(({ theme }) => ({
  "& input": { color: "white" },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = {
    filter: "",
  };
  const theme = useTheme();
  const colorMode = useChangeTheme();
  const state = useAuth();
  const navigate = useNavigate();
  let location = useLocation();

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    if (data.filter) {
      setSearchParams({ filter: data.filter });
      reset();
    } else {
      setSearchParams({});
    }
  };

  const { isAuthenticated, user, logout } = state;

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ maxWidth: "lg", mx: "auto", width: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: (theme) => {
                return theme.palette.mode === "dark" && "primary.main";
              },
              fontWeight: "600",
              fontSize: "1.4rem",
              letterSpacing: "3px",
              textShadow: (theme) => `0 0 15px ${theme.palette.primary.main}`,
            }}
          >
            CODERSHOOL
          </Typography>

          <Search>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                name="filter"
              />
            </FormProvider>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mr: 5 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    onChange={colorMode.toggleColorMode}
                  />
                }
                label={theme.palette.mode}
              />
            </FormGroup>
          </Box>
          <Box sx={{ display: { md: "flex" } }}>
            {!isAuthenticated ? (
              <Tooltip
                title="Login"
                component={Link}
                to="/login"
                state={{ backgroundLocation: location }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
              </Tooltip>
            ) : (
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" sx={{ mr: 3 }}>
                  <Tooltip title={user?.username}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://picsum.photos/id/1005/200/300"
                    />
                  </Tooltip>
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="logout"
                  aria-haspopup="true"
                  onClick={handleLogout}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
