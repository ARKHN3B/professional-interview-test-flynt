export const queryResolvers = {
    users: (_parent, { filter }, { dataSources }) => dataSources.users.findUsers(filter),
    teams: (_parent, { filter }, { dataSources }) => dataSources.teams.findTeams(filter),
};
