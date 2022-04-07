// Libs
import DataLoader from "dataloader";

// Model
import { userModel, teamModel } from "../models";

export function makeDataLoaders() {
    const userDataLoader = new DataLoader((userIds) => {
        return userModel
            .find({ _id: { $in: userIds } })
            .lean()
            .then((users) => users.map((user) => ({ ...user, _id: user._id.toString() })))
            .then((users) => {
                return userIds.map((userId) => users.find((user) => user._id === userId.toString()));
            });
    });
    const teamDataLoader = new DataLoader((teamIds) => {
        return teamModel
            .find({ _id: { $in: teamIds } })
            .lean()
            .then((teams) => teams.map((team) => ({ ...team, _id: team._id.toString() })))
            .then((teams) => {
                return teamIds.map((teamId) => teams.find((team) => team._id === teamId.toString()));
            });
    });

    return {
        user: userDataLoader,
        team: teamDataLoader,
    };
}
