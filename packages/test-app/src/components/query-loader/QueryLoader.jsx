// Libs
import React from "react";
import PropTypes from "prop-types";

// Components
import { CircularProgress } from "@rmwc/circular-progress";

export function QueryLoader({ loading, error, children }) {
    if (loading) {
        return (
            <div>
                <CircularProgress /> Loading...
            </div>
        );
    }
    
    if (error) {
        return <p>An error occurred: {error?.toString()}</p>;
    }

    return typeof children === "function" ? children() : children;
}

QueryLoader.propTypes = {
    /**
     * If is loading
     */
    loading: PropTypes.bool.isRequired,
    /**
     * If has error
     */
    error: PropTypes.any,
};
