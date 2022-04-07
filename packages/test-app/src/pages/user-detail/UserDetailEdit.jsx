// Libs
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik, FormikProvider } from "formik";

// Graph
import { UPDATE_USER, USER_ROLE_LABEL } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { Snackbar, SnackbarAction } from "@rmwc/snackbar";
import { Tooltip } from "@rmwc/tooltip";
import { Field, FieldRow, Form } from "../../components/form";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";

export function UserDetailEdit({ user, goToView, refetch }) {
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);

    const formik = useFormik({
        initialValues: user,
        onSubmit: ({ id, ...value }) => updateUser({ variables: { userId: id, ...value } }),
    });

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            if (data?.updateUser.error) {
                setError(data?.updateUser.error);
            } else {
                setSuccess("Successfully edited");
                refetch();
                goToView();
            }
            formik.setSubmitting(false);
        },
        onError: () => {
            setError("An error ocurred during save");
            formik.setSubmitting(false);
        },
    });

    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <SliderTitle>Edit User</SliderTitle>
                    <SliderActions>
                        <Tooltip content="Cancel" align="bottom">
                            <IconButton icon="undo" label="Cancel" onClick={goToView} />
                        </Tooltip>
                        <Tooltip content="Save" align="bottom">
                            <IconButton icon="save" label="Save User" onClick={formik.handleSubmit} />
                        </Tooltip>
                    </SliderActions>
                </SliderHeader>

                <SliderContent>
                    <FormikProvider value={formik}>
                        <Form>
                            <FieldRow>
                                <Field name="firstName" label="First name" type="text" />
                                <Field name="lastName" label="Last name" type="text" />
                            </FieldRow>
                            <Field name="email" label="email" type="email" />
                            <Field enhanced name="role" label="Role" type="text" options={USER_ROLE_LABEL} />
                        </Form>
                    </FormikProvider>
                </SliderContent>
            </Slider>
            <Snackbar
                open={Boolean(error) || Boolean(success)}
                onClose={() => (error ? setError(undefined) : setSuccess(undefined))}
                message={error ?? success}
                dismissesOnAction
                icon={error ? "error" : "check"}
                action={<SnackbarAction label="Dismiss" />}
            />
        </>
    );
}
