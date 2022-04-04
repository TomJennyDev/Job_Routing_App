import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import jobApi from "../app/JobApi";
import useStore from "../hooks/useStore";
import JobCard from "./JobCard";
function MainContent() {
  const limit = 6;
  const totalPage = 10;
  const [page, setPage] = useState(1);
  const { jobList, getJobList } = useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const params = {
          _limit: limit,
          _page: page,
        };
        const jobList = await jobApi.getJobList(params);

        await getJobList(jobList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={{ pt: 5 }}
      >
        {jobList
          .filter((job) =>
            job.title.toLowerCase().includes(filter.toLowerCase())
          )
          ?.map((job, index) => (
            <Grid item key={job.id}>
              <JobCard job={job} index={index} />
            </Grid>
          ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", m: 3, width: 1 }}>
        <Pagination
          color="primary"
          count={totalPage}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </>
  );
}

export default MainContent;
