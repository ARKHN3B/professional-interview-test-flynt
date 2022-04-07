// Libs
import React from "react";
import { useQuery } from "@apollo/client";
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";

// Graph
import { GET_USERS, USER_ROLE_LABEL } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { List, SimpleListItem } from "@rmwc/list";
import { Tooltip } from "@rmwc/tooltip";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";
import { QueryLoader } from "../../components/query-loader";
import { UserCreate } from "../user-create";
import { UserDetail } from "../user-detail";

export function UserList() {
    const { data, refetch, ...state } = useQuery(GET_USERS);
    const history = useHistory();
    const location = useLocation();
    const { path, url } = useRouteMatch();

    return (
        <>
            <Slider>
                <SliderHeader>
                    <SliderTitle>User list</SliderTitle>
                    <SliderActions>
                        <Tooltip content="New User" align="bottom">
                            <Link to={`${url}/create`}>
                                <IconButton icon="person_add" label="New User" />
                            </Link>
                        </Tooltip>
                    </SliderActions>
                </SliderHeader>
                <SliderContent>
                    <QueryLoader {...state}>
                        {() => (
                            <List twoLine>
                                {data.users.map((user) => (
                                    <SimpleListItem
                                        key={user.id}
                                        activated={location.pathname.includes(user.id)}
                                        onClick={() => history.push(`${url}/${user.id}`)}
                                        graphic="person"
                                        text={`${user.firstName} ${user.lastName} (${USER_ROLE_LABEL[user.role]})`}
                                        secondaryText={user.email}
                                        metaIcon="keyboard_arrow_right"
                                    />
                                ))}
                                {!data.users?.length && (
                                    <SimpleListItem
                                        text="No users found"
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
                    <UserCreate refetch={refetch} />
                </Route>
                <Route path={`${path}/:userId`}>
                    <UserDetail refetch={refetch} />
                </Route>
            </Switch>
        </>
    );
}
