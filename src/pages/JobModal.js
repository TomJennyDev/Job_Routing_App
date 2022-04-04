import { Chip, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jobApi from "../app/JobApi";
import LoadingScreen from "../components/LoadingScreen";
import useStore from "../hooks/useStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function JobModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(from, { replace: true });
  };

  const { id } = useParams();
  const { job, getJob, setLoading, loading } = useStore();

  useEffect(() => {
    const getJobData = async () => {
      try {
        setLoading();
        const data = await jobApi.getJob(id);
        await getJob(data[0]);
        setLoading();
      } catch (error) {
        console.log(error);
      }
    };
    getJobData();
  }, [id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ m: 2 }}
            >
              {job?.title}
            </Typography>
            <Divider />
            <Box sx={{ m: 2 }}>
              {job?.skills?.slice(0, 6).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    mr: 1,
                    my: 1,
                    "&:hover": {
                      boxShadow: (theme) =>
                        `0 0 10px ${theme.palette.primary.main}`,
                      cursor: "pointer",
                      backgroundColor: "primary.main",
                      color: "common.white",
                    },
                  }}
                />
              ))}
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textOverflow: "ellipsis",
                height: 50,
                m: 2,
              }}
            >
              {job?.description?.length > 100
                ? `${job?.description?.slice(0, 100)}...`
                : job?.description}
            </Typography>

            <Divider />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                height: 50,
                m: 2,
                textAlign: "center",
              }}
            >
              City: {job?.city}
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
}
