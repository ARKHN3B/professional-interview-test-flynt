/* eslint-disable no-underscore-dangle */
// Libs
import { Types } from "mongoose";

// Model
import { teamModel, userModel } from "../models";
import { map }                  from "lodash";

export function teamDatasource(dataLoaders) {
    return {
        initialize() {},

        /**
         * Find all teams.
         */
        findTeams({ teamId } = {}) {
            const filter = {};
            if (teamId) {
                filter._id = teamId;
            }

            return teamModel.find(filter).lean();
        },

        /**
         * Find all teams for a given user.
         * @param {string} userId User own identifier.
         */
        findTeamsByUserId(userId) {
            return teamModel.find({ userIds: new Types.ObjectId(userId) }).lean();
        },

        /**
         * Add new team
         * @param {string} name
         * @param {Array<string>} userIds
         * @return {Promise<void>}
         */
        async insertTeam(name, userIds) {
            const teamExist = await teamModel.findOne({ name });
            if (teamExist) {
                throw new Error("The name of this team is already taken");
            }
            const _userIds  = map(userIds, Types.ObjectId);
            // Check if has only one lead assigned to the team
            const [{count}] = await userModel.aggregate([
                {
                    $match: {
                        _id: {
                            $in: _userIds
                        }
                    }
                },
                { $group: { _id: "$role", count: { $count: {} } } },
                {
                    $match: {
                        _id: "SQUAD_LEADER"
                    }
                }
            ]);
            if (count > 1) {
                throw new Error("The can have ONLY one lead member");
            }
            const team = new teamModel({name, userIds})
            return team.save();
        }
    };
}
