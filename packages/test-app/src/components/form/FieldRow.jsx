// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export function FieldRow({ children, className, ...otherProps }) {
    const rowClassName = classnames("c-field-row", className);

    return (
        <div className={rowClassName} {...otherProps}>
            {children}
        </div>
    );
}

FieldRow.propTypes = {
    /**
     * Children to display
     */
    children: PropTypes.node,
    /**
     * Additional className for row
     */
    className: PropTypes.string,
};
