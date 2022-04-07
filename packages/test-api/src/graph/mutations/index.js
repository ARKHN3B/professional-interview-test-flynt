import { gql } from "apollo-server";

export const mutations = gql`
    type Mutation {
        # User
        addUser(email: String!, firstName: String!, lastName: String!, role: UserRoleEnum!): UserResponse!
        updateUser(
            userId: ID!
            email: String!
            firstName: String!
            lastName: String!
            role: UserRoleEnum!
        ): UserResponse!
        # Team
        createTeam(name: String!, userIds: [ID!]!): TeamResponse
    }
`;
