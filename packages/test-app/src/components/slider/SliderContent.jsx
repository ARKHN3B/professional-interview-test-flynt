// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// Components
import { DrawerContent } from "@rmwc/drawer";

export function SliderContent({ children, className, padding, ...otherProps }) {
    return (
        <DrawerContent
            className={classnames("c-slider__content", { "c-slider__content--padding": padding }, className)}
            {...otherProps}
        >
            {children}
        </DrawerContent>
    );
}

SliderContent.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for content
     */
    className: PropTypes.string,
    /**
     * If content is padded
     */
    padding: PropTypes.bool,
};

SliderContent.defaultProps = {
    padding: false,
};
