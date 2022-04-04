import { createContext, useReducer } from "react";

const initialState = {
  job: {},
  jobList: [],
  loading: false,
};

const SET_JOBLIST = "SET_JOBLIST";
const SET_JOB = "SET_JOB";
const SET_LOADING = "SET_LOADING";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOBLIST:
      return {
        ...state,
        jobList: action.payload,
      };
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};

const StoreContext = createContext({ ...initialState });

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getJobList = async (data) => {
    dispatch({ type: SET_JOBLIST, payload: data });
  };

  const getJob = async (data) => {
    dispatch({ type: SET_JOB, payload: data });
  };

  const setLoading = async () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <StoreContext.Provider value={{ ...state, getJobList, getJob, setLoading }}>
      {children}
    </StoreContext.Provider>
  );
}
export { StoreContext, StoreProvider };
