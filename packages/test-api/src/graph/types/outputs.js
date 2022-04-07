// Libs
import { gql } from "apollo-server";

export const outputs = gql`
    type User {
        id: ID!
        email: String!
        firstName: String!
        lastName: String!
        role: UserRoleEnum!
        teams: [Team!]!
    }

    type Team {
        id: ID!
        name: String!
        leader: User
        members: [User!]!
        interns: [User!]! 
    }

    type UserResponse {
        error: String
        user: User
    }

    type TeamResponse {
        error: String
        team: Team
    }

    enum UserRoleEnum {
        SQUAD_LEADER
        SQUAD_MEMBER
        INTERN
    }
`
