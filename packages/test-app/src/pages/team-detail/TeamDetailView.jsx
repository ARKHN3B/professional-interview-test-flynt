// Libs
import React from "react";
import { useHistory } from "react-router-dom";

// Graph
import { USER_ROLE_LABEL } from "../../graph";

// Components
import { IconButton }                                                      from "@rmwc/icon-button";
import { List, SimpleListItem }                                            from "@rmwc/list";
import { Tooltip }                                                         from "@rmwc/tooltip";
import { Typography }                                                      from "@rmwc/typography";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";
import { capitalize, map }                                                 from "lodash";

export function TeamDetailView({ team, goToEdit }) {
    const history = useHistory();
    console.log(team)

    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <SliderTitle>Team detail</SliderTitle>
                    <SliderActions>
                        <Tooltip content="Edit" align="bottom">
                            <IconButton icon="edit" label="Edit User" onClick={goToEdit} />
                        </Tooltip>
                    </SliderActions>
                </SliderHeader>

                <SliderContent padding>
                    <Typography use="subtitle1">Information</Typography>
                    <List twoLine nonInteractive>
                        <SimpleListItem text="Team" secondaryText={team?.name} ripple={false} />
                    </List>

                    <Typography use="subtitle1">Persons</Typography>
                    <List twoLine>
                        <Typography use="subtitle2">Leader</Typography>
                        <SimpleListItem
                            graphic="person"
                            text={`${capitalize(team.leader.firstName)} ${capitalize(team.leader.lastName[0])}.`}
                            secondaryText={team.leader.email}
                            metaIcon="open_in_new"
                            onClick={() => history.push(`/users/${team.leader.id}`)}
                        />
                        <Typography use="subtitle2">Members</Typography>
                        {map(team?.members, (member) => {
                            return (
                                <SimpleListItem
                                    key={member.id}
                                    graphic="person"
                                    text={`${capitalize(member.firstName)} ${capitalize(member.lastName[0])}.`}
                                    secondaryText={member.email}
                                    metaIcon="launch"
                                    onClick={() => history.push(`/users/${member.id}`)}
                                />
                            )
                        })}
                        <Typography use="subtitle2">Interns</Typography>
                        {map(team?.interns, (intern) => {
                            return (
                                <SimpleListItem
                                    key={intern.id}
                                    graphic="person"
                                    text={`${capitalize(intern.firstName)} ${capitalize(intern.lastName[0])}.`}
                                    secondaryText={intern.email}
                                    metaIcon="launch"
                                    onClick={() => history.push(`/users/${intern.id}`)}
                                />
                            )
                        })}
                    </List>
                </SliderContent>
            </Slider>
        </>
    );
}
