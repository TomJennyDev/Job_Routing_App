import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
  boxShadow: (theme) =>
    theme.palette.mode === "dark" ? `0 0 6px ${theme.palette.primary.main}` : 2,
};

const schema = yup.object({
  username: yup.string().required().trim(),
  password: yup.string().required(),
});
export default function LoginModal() {
  const defaultValues = {
    username: "",
    password: "",
    remember: true,
  };
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
  const { handleSubmit } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data.username, () => {
      navigate(-1);
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar sx={{ mx: "auto", my: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{
                textAlign: "center",
                letterSpacing: "5px",
                fontWeight: "bold",
                textShadow: (theme) => `0 0 1px black`,
              }}
            >
              LOGIN
            </Typography>
          </Box>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 4 }}>
              <FTextField name="username" label="Username" />
              <FTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FCheckbox name="remember" label="Remember me" />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
