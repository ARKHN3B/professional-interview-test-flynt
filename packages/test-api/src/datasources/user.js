import { Types } from "mongoose";

// Model
import { userModel, teamModel, USER_ROLE_ENUM } from "../models";

const USER_ROLE_COMPATIBILITY = {
    [USER_ROLE_ENUM.INTERN]: [USER_ROLE_ENUM.SQUAD_MEMBER],
    [USER_ROLE_ENUM.SQUAD_MEMBER]: [USER_ROLE_ENUM.INTERN, USER_ROLE_ENUM.SQUAD_LEADER],
    [USER_ROLE_ENUM.SQUAD_LEADER]: [USER_ROLE_ENUM.SQUAD_MEMBER],
};

export function userDatasource(dataLoaders) {
    return {
        initialize() {},

        /**
         * Find all users
         * @param {object} filter Filter object.
         */
        findUsers({ role, userId } = {}) {
            const filter = {};
            if (role) {
                filter.role = role;
            }
            if (userId) {
                filter._id = userId;
            }

            return userModel.find(filter).lean();
        },

        /**
         * Find a User by identifier.
         * @param {string} userId User own identifier.
         */
        findUserById(userId) {
            return dataLoaders.user.load(userId);
        },

        /**
         * Find a list of Users by identifiers.
         * @param {Array<string>} userIds List of User identifiers.
         */
        findUsersByIds(userIds) {
            return Promise.all(userIds.map((userId) => dataLoaders.user.load(userId)));
        },

        /**
         * Add a user.
         * @param {string} userId User own identifier.
         * @param {string} email User own email.
         * @param {string} firstName User own first name.
         * @param {string} lastName User own last name.
         * @param {string} role User own role.
         */
        upsertUser(userId, email, firstName, lastName, role) {
            if (userId && !Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid userId");
            }
            if (!email || !email.trim()) {
                throw new Error("Missing email");
            }
            if (!firstName || !firstName.trim()) {
                throw new Error("Missing firstName");
            }
            if (!lastName || !lastName.trim()) {
                throw new Error("Missing lastName");
            }
            if (!role || !role.trim()) {
                throw new Error("Missing role");
            }

            if (userId) {
                return dataLoaders.user.load(userId).then((user) => {
                    if (!user) {
                        throw new Error("Unknown user");
                    }

                    if (user.role !== role && !USER_ROLE_COMPATIBILITY[user.role].includes(role)) {
                        throw new Error("Invalid user promotion");
                    }

                    return teamModel.find({ userIds: userId }).then((teams) => {
                        if (teams?.length && user.role === USER_ROLE_ENUM.SQUAD_LEADER && role !== USER_ROLE_ENUM.SQUAD_LEADER) {
                            throw new Error("User is leader in a team cannot demote");
                        }
                        if (teams?.length && user.role === USER_ROLE_ENUM.SQUAD_MEMBER && role === USER_ROLE_ENUM.SQUAD_LEADER) {
                            throw new Error("User is member in a team cannot promote");
                        }

                        return userModel
                            .findByIdAndUpdate({ _id: userId }, { email, firstName, lastName, role }, { new: true })
                            .then((usr) => usr.toObject());
                    });
                });
            }

            if (role !== USER_ROLE_ENUM.INTERN) {
                throw new Error("User must start as an Intern");
            }

            return userModel.create({ email, firstName, lastName, role }).then((user) => user.toObject());
        },
    };
}
