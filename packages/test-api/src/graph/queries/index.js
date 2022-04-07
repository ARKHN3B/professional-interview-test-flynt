import { gql } from "apollo-server";

export const queries = gql`
    type Query {
        users(filter: UsersFilterInput): [User!]!
        teams(filter: TeamsFilterInput): [Team!]!
    }
`;
