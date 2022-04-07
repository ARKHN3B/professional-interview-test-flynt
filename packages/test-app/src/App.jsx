// Libs
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// Components
import { Icon } from "@rmwc/icon";
import { Typography } from "@rmwc/typography";
import { Header, Menu } from "./components/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TeamList } from "./pages/team-list";
import { UserList } from "./pages/user-list";

const client = new ApolloClient({
    uri: "http://localhost:4242",
    cache: new InMemoryCache(),
});

export function App() {
    return (
        <div className="app">
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <div className="sliders-container">
                        <Menu />
                        <Switch>
                            <Route path="/users">
                                <UserList />
                            </Route>
                            <Route path="/teams">
                                <TeamList />
                            </Route>
                            <Route path="/" exact>
                                <div style={{ margin: "0 20px" }}>
                                    <Typography use="body1" tag="p">
                                        Welcome to THC's own implementation of the technical test.
                                    </Typography>
                                    <Typography use="body1" tag="p" style={{ display: "flex", alignItems: "center" }}>
                                        <Icon icon="west" />
                                        &nbsp;Start by going somewhere using the menu.
                                    </Typography>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        </div>
    );
}
