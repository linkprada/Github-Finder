import { useContext } from "react";
import UsersContext from "../../context/UsersContext";
import Spinner from "../layouts/Spinner";

function UsersResult() {
    const {users, loading} = useContext(UsersContext);

    if (loading) {
        return <Spinner></Spinner>
    }

    var usersList = users.map((user) => <h3 key={user.id}>{user.login}</h3>);
    
    return <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {usersList}
    </div>;
}

export default UsersResult;