// Libs
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useField } from "formik";

// Components
import { Chip, ChipSet } from "@rmwc/chip";
import { Select } from "@rmwc/select";
import { TextField } from "@rmwc/textfield";

export function Field({ className, label, multiple, options: optionsProp, ...props }) {
    const [field, meta] = useField(props);

    const fieldClassName = classnames("c-field", className);

    const fieldProps = {
        className: fieldClassName,
        label,
        ...field,
        ...props,
        invalid: meta.touched && meta.error,
        helpText: meta.touched && meta.error,
    };

    if (multiple) {
        const { value = [] } = field;
        const options = optionsProp.filter((opt) => !value?.includes(opt.value));


        const handleChange = (event) => {
            event.target.name = field.name;
            event.target.value = [...value, event.target.value];
            field.onChange(event);
        };

        return (
            <>
                <Select {...fieldProps} enhanced onChange={handleChange} options={options} value="" />
                {/* TODO: refactor style quickfix */}
                <ChipSet style={{ display: value.length ? "flex" : "none" }}>
                    {value?.map((val) => {
                        const chipLabel = optionsProp.find((opt) => opt.value === val)?.label;
                        const handleRemove = () => {
                            field.onChange({ target: { name: field.name, value: value.filter((v) => v !== val) } });
                        };

                        return (
                            <Chip key={val} onTrailingIconInteraction={handleRemove} trailingIcon="close">
                                {chipLabel}
                            </Chip>
                        );
                    })}
                </ChipSet>
            </>
        );
    }

    if (optionsProp) {
        const handleChange = (event) => {
            event.target.name = field.name;
            field.onChange(event);
        };

        return <Select {...fieldProps} enhanced onChange={handleChange} options={optionsProp} />;
    }

    return <TextField {...fieldProps} />;
}

Field.propTypes = {
    /**
     * Additional className
     */
    className: PropTypes.string,
    /**
     * Label for field
     */
    label: PropTypes.string,
    /**
     * If multiple values
     */
    multiple: PropTypes.bool,
    /**
     * Options for select field
     */
    options: PropTypes.any,
};

Field.defaultProps = {
    multiple: false,
};
