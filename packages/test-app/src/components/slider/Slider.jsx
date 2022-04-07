// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { Drawer, DrawerTitle, DrawerSubtitle } from "@rmwc/drawer";

export const SliderTitle = DrawerTitle;
export const SliderSubtitle = DrawerSubtitle;

export function Slider({ children, className, ...otherProps }) {
    return (
        <Drawer className={classnames("c-slider", className)} {...otherProps}>
            {children}
        </Drawer>
    );
}

Slider.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for content
     */
    className: PropTypes.string,
};
