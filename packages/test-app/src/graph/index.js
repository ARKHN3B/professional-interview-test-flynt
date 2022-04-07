export * from "./mutations";
export * from "./queries";

export const USER_ROLE = {
    SQUAD_LEADER: "SQUAD_LEADER",
    SQUAD_MEMBER: "SQUAD_MEMBER",
    INTERN: "INTERN",
};

export const USER_ROLE_LABEL = {
    [USER_ROLE.SQUAD_LEADER]: "Squad Leader",
    [USER_ROLE.SQUAD_MEMBER]: "Squad Member",
    [USER_ROLE.INTERN]: "Intern",
};
