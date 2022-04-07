function responsify(promise, success) {
    try {
        return promise()
            .then(success)
            .catch((err) => {
                console.error(err);
                return { error: err.message };
            });
    }
    catch (err) {
        console.error(err);
        return Promise.resolve({ error: err.message });
    }
}

export const mutationResolvers = {
    addUser(_parent, { email, firstName, lastName, role }, { dataSources }) {
        return responsify(
            () => dataSources.users.upsertUser(undefined, email, firstName, lastName, role),
            (user) => ({ user })
        );
    },
    updateUser(_parent, { userId, email, firstName, lastName, role }, { dataSources }) {
        return responsify(
            () => dataSources.users.upsertUser(userId, email, firstName, lastName, role),
            (user) => ({ user })
        );
    },
    createTeam(_parent, { name, userIds }, { dataSources }) {
        return responsify(
            () => dataSources.teams.insertTeam(name, userIds),
            team => ({ team })
        );
    }
};
