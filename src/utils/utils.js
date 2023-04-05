export const isUserAdmin = (user) => {
    if (user.email === 'admin@abv.bg') {
        return true;
    }

    return false;
};

export const parseQueryAll = (queryAll, query, searchBy, page) => {
    query = queryAll.split('?')[0];

    searchBy = queryAll.split('?')[1].split('=')[1];

    if (queryAll.split('?')[2]) {
        page = Number(queryAll.split('?')[2].split('=')[1]);
    }

    return {
        query,
        searchBy,
        page
    };
};
