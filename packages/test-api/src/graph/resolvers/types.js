import { USER_ROLE_ENUM } from "../../models";

export const typeResolvers = {
    User: {
        id(parent, _args, _context) {
            return parent._id.toString();
        },
        teams(parent, _args, { dataSources }) {
            return dataSources.teams.findTeamsByUserId(parent._id);
        },
    },
    Team: {
        id(parent, _args, _context) {
            return parent._id.toString();
        },
        leader(parent, _args, { dataSources }) {
            return dataSources.users
                .findUsersByIds(parent.userIds)
                .then((users) => {
                    return users.find((user) => user.role === USER_ROLE_ENUM.SQUAD_LEADER)
                });
        },
        members(parent, _args, { dataSources }) {
            return dataSources.users
                .findUsersByIds(parent.userIds)
                .then((users) => users.filter((user) => user.role === USER_ROLE_ENUM.SQUAD_MEMBER));
        },
        interns(parent, _args, { dataSources }) {
            return dataSources.users
                .findUsersByIds(parent.userIds)
                .then((users) => users.filter((user) => user.role === USER_ROLE_ENUM.INTERN));
        },
    },
};
