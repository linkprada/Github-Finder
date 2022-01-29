import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const GithubContext = createContext();

export const GithubContextProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    return (
        <GithubContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
