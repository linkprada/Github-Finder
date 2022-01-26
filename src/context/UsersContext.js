import { createContext, useEffect, useState } from "react";

const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);

        const data = await response.json();

        setUsers(data);
        setLoading(false);
    };

    return <UsersContext.Provider value={{ users, loading }}>{children}</UsersContext.Provider>;
};

export default UsersContext;
