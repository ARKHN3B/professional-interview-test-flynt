// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { DrawerHeader } from "@rmwc/drawer";

export function SliderHeader({ children, className, ...otherProps }) {
    const headerClassName = classnames("c-slider__header", className);
    return (
        <DrawerHeader {...otherProps} className={headerClassName}>
            {children}
        </DrawerHeader>
    );
}

SliderHeader.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for header
     */
    className: PropTypes.string,
};
