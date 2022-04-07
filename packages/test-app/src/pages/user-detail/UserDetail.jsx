// Libs
import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";

// Graph
import { GET_USER } from "../../graph";

// Components
import { QueryLoader } from "../../components/query-loader";
import { UserDetailView } from "./UserDetailView";
import { UserDetailEdit } from "./UserDetailEdit";

export function UserDetail({ refetch: refetchProp }) {
    const { userId } = useParams();
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const goToEdit = useCallback(() => history.push(`${url}/edit`), [url, history]);
    const goToView = useCallback(() => history.push(`${url}`), [url, history]);

    const { data, refetch, ...state } = useQuery(GET_USER, {
        variables: { userId },
    });

    const user = data?.users[0];

    return (
        <QueryLoader {...state}>
            <Switch>
                <Route path={`${path}/edit`}>
                    <UserDetailEdit
                        user={user}
                        goToView={goToView}
                        refetch={() => {
                            refetchProp();
                            refetch();
                        }}
                    />
                </Route>
                <Route>
                    <UserDetailView user={user} goToEdit={goToEdit} />
                </Route>
            </Switch>
        </QueryLoader>
    );
}
