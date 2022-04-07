// Libs
import React from "react";
import { useQuery } from "@apollo/client";
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";

// Graph
import { GET_TEAMS } from "../../graph";

// Components
import { IconButton }                                                      from "@rmwc/icon-button";
import { List, SimpleListItem }                                            from "@rmwc/list";
import { Tooltip }                                                         from "@rmwc/tooltip";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";
import { QueryLoader }                                                     from "../../components/query-loader";
import { TeamCreate }                                                      from "../team-create";
import { TeamDetail }                                                      from "../team-detail";

export function TeamList() {
    const { data, refetch, ...state } = useQuery(GET_TEAMS);
    const history = useHistory();
    const location = useLocation();
    const { path, url } = useRouteMatch();

    return (
        <>
            <Slider>
                <SliderHeader>
                    <SliderTitle>Team list</SliderTitle>
                    <SliderActions>
                        <Tooltip content="New Team" align="bottom">
                            <Link to={`${url}/create`}>
                                <IconButton icon="group_add" label="New Team" />
                            </Link>
                        </Tooltip>
                    </SliderActions>
                </SliderHeader>
                <SliderContent>
                    <QueryLoader {...state}>
                        {() => (
                            <List twoLine>
                                {data.teams.map((team) => (
                                    <SimpleListItem
                                        key={team.id}
                                        activated={location.pathname.includes(team.id)}
                                        onClick={() => history.push(`${url}/${team.id}`)}
                                        graphic="group"
                                        text={team.name}
                                        secondaryText={`Leader: ${team.leader.firstName} ${team.leader.lastName}`}
                                        metaIcon="keyboard_arrow_right"
                                    />
                                ))}
                                {!data.teams?.length && (
                                    <SimpleListItem
                                        text="No teams found"
                                        secondaryText="Add one using the + icon"
                                        graphic="cloud_off"
                                    />
                                )}
                            </List>
                        )}
                    </QueryLoader>
                </SliderContent>
            </Slider>
            <Switch>
                <Route path={`${path}/create`}>
                    <TeamCreate refetch={refetch} />
                </Route>
                <Route path={`${path}/:teamId`}>
                    <TeamDetail refetch={refetch} />
                </Route>
            </Switch>
        </>
    );
}
