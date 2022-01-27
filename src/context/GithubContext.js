import { createContext, useEffect, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const GithubContext = createContext();

export const GithubContextProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: true,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`);

        const data = await response.json();

        dispatch({
            type: "GET_USERS",
            payload: data,
        });
    };

    return (
        <GithubContext.Provider value={{ users: state.users, loading: state.loading }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
