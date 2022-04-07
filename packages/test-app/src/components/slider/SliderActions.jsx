// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function SliderActions({ children, className, ...otherProps }) {
    const headerClassName = classnames("c-slider__actions", className);
    return (
        <div {...otherProps} className={headerClassName}>
            {children}
        </div>
    );
}

SliderActions.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for actions
     */
    className: PropTypes.string,
};
