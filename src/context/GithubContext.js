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

    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`);

        if (response.status === "404") {
            window.location = "/notfound";
        } else {
            const data = await response.json();

            dispatch({
                type: "GET_USER",
                payload: data,
            });
        }
    };

    const getRepos = async (login) => {
        setLoading();

        const params = new URLSearchParams({
            sort: "created",
            per_page: 10,
        });

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);

        if (response.status === "404") {
            window.location = "/notfound";
        } else {
            const data = await response.json();

            dispatch({
                type: "GET_REPOS",
                payload: data,
            });
        }
    };

    const setLoading = () => dispatch({ type: "SET_LOADING" });

    return (
        <GithubContext.Provider
            value={{
                ...state,
                dispatch,
                getUser,
                getRepos,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
