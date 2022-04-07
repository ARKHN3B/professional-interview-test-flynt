// Libs
import React from "react";

// Components
import { Slider, SliderContent } from "../slider";
import { List, ListItem } from "@rmwc/list";
import { Icon } from "@rmwc/icon";
import { Tooltip } from "@rmwc/tooltip";
import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <Slider className="c-menu">
            <SliderContent>
                <List>
                    <ListItem>
                        <Tooltip content="Users" align="right">
                            <NavLink to="/users">
                                <Icon icon="person_search" />
                            </NavLink>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip content="Teams" align="right">
                            <NavLink to="/teams">
                                <Icon icon="groups" />
                            </NavLink>
                        </Tooltip>
                    </ListItem>
                </List>
            </SliderContent>
        </Slider>
    );
}
