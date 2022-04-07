import { gql } from "@apollo/client";

const NAME_FRAGMENT = gql`
    fragment NameParts on User {
        firstName
        lastName
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            id
            email
            ...NameParts
            role
        }
    }
    ${NAME_FRAGMENT}
`;

export const GET_USER = gql`
    query users($userId: ID!) {
        users(filter: { userId: $userId }) {
            id
            email
            ...NameParts
            role
            teams {
                id
                name
            }
        }
    }
    ${NAME_FRAGMENT}
`;

export const GET_TEAMS = gql`
    query teams {
        teams {
            id
            name
            leader {
                id
                ...NameParts
            }
            members {
                id
                ...NameParts
            }
            interns {
                id
                ...NameParts
            }
        }
    }
    ${NAME_FRAGMENT}
`;

export const GET_TEAM = gql`
    query teams($teamId: ID!) {
        teams(filter: {teamId: $teamId}) {
            id
            name
            leader {
                id
                email
                ...NameParts
            }
            members {
                id
                email
                ...NameParts
            }
            interns {
                id
                email
                ...NameParts
            }
        }
    }
    ${NAME_FRAGMENT}
`;
