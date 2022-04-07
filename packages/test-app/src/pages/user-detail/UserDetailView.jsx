// Libs
import React from "react";
import { useHistory } from "react-router-dom";

// Graph
import { USER_ROLE_LABEL } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { List, SimpleListItem } from "@rmwc/list";
import { Tooltip } from "@rmwc/tooltip";
import { Typography } from "@rmwc/typography";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";

export function UserDetailView({ user, goToEdit }) {
    const history = useHistory();

    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <SliderTitle>User detail</SliderTitle>
                    <SliderActions>
                        <Tooltip content="Edit" align="bottom">
                            <IconButton icon="edit" label="Edit User" onClick={goToEdit} />
                        </Tooltip>
                    </SliderActions>
                </SliderHeader>

                <SliderContent padding>
                    <Typography use="subtitle1">Information</Typography>
                    <List twoLine nonInteractive>
                        <SimpleListItem text="First name" secondaryText={user.firstName} ripple={false} />
                        <SimpleListItem text="Last name" secondaryText={user.lastName} ripple={false} />
                        <SimpleListItem text="Email" secondaryText={user.email} ripple={false} />
                        <SimpleListItem text="Role" secondaryText={USER_ROLE_LABEL[user.role]} ripple={false} />
                    </List>

                    <Typography use="subtitle1">Teams</Typography>
                    <List twoLine>
                        {user.teams.map((team) => (
                            <SimpleListItem
                                key={team.id}
                                text={team.name}
                                secondaryText={USER_ROLE_LABEL[user.role]}
                                metaIcon="launch"
                                onClick={() => history.push(`/teams/${team.id}`)}
                            />
                        ))}
                    </List>
                    <List twoLine nonInteractive>
                        {!user.teams?.length && <SimpleListItem text="" secondaryText="In no team" ripple={false} />}
                    </List>
                </SliderContent>
            </Slider>
        </>
    );
}
