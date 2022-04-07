// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Form as FormikForm } from "formik";

export function Form({ children, className, ...otherProps }) {
    const formClassName = classnames("c-form", className);

    return (
        <FormikForm className={formClassName} {...otherProps}>
            {children}
        </FormikForm>
    );
}

FormikForm.propTypes = {
    /**
     * Children for form
     */
    children: PropTypes.node,
    /**
     * Additional className for form
     */
    className: PropTypes.string,
};
