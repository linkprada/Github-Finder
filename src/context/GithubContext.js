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

    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text,
        });
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

        const { items } = await response.json();

        dispatch({
            type: "GET_USERS",
            payload: items,
        });
    };

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

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`);

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

    const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

    const setLoading = () => dispatch({ type: "SET_LOADING" });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                getUser,
                getRepos,
                clearUsers,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
