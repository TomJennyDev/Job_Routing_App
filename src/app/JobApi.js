import apiService from "./apiService";

const jobApi = {
  getJobList(params) {
    const url = "/jobs";
    return apiService.get(url, { params });
  },
  getJob(id) {
    const url = `/jobs?id=${id}`;
    return apiService.get(url);
  },
};

export default jobApi;
