// Libs
import { gql } from "apollo-server";

export const inputs = gql`
    input UsersFilterInput {
        role: UserRoleEnum
        userId: ID
    }

    input TeamsFilterInput {
        teamId: ID
    }
`;
