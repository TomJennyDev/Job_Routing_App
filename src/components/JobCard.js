import { Button, Chip, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
export default function JobCard({ job, index }) {
  const { description, title, id } = job;
  const location = useLocation();

  return (
    <Card
      sx={[
        { maxWidth: 345, "&:hover": { boxShadow: 5 } },
        (theme) =>
          theme.palette.mode === "dark" && {
            boxShadow: (theme) => `0 0 5px ${theme.palette.primary.main}`,
            "&:hover": {
              boxShadow: (theme) => `0 0 15px ${theme.palette.primary.main}`,
            },
          },
      ]}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="120"
        image={`https://picsum.photos/id/${index}/200/300`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            textOverflow: "ellipsis",
            height: 30,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textOverflow: "ellipsis",
            height: 50,
          }}
        >
          {description.length > 70
            ? `${description.slice(0, 70)}...`
            : description}
        </Typography>
        <Divider />
        <Box sx={{ height: 85 }}>
          {job.skills.slice(0, 4).map((skill, index) => (
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
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <Button
          size="small"
          variant="contained"
          component={Link}
          to={`/jobs/${id}`}
          state={{ backgroundLocation: location }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
