const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();
    return items;
};

export const getUserAndRepos = async (login) => {
    const params = new URLSearchParams({
        sort: "created",
        per_page: 10,
    });

    const [userData, reposData] = await Promise.all([
        fetch(`${GITHUB_URL}/users/${login}`),
        fetch(`${GITHUB_URL}/users/${login}/repos?${params}`),
    ]);

    const user = await userData.json();
    const repos = await reposData.json();
    return { user, repos };
};
