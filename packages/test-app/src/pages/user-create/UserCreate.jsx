// Libs
import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory, useRouteMatch } from "react-router-dom";

// Graph
import { USER_ROLE, USER_ROLE_LABEL, ADD_USER } from "../../graph";

// Components
import { IconButton } from "@rmwc/icon-button";
import { CircularProgress } from "@rmwc/circular-progress";
import { Snackbar, SnackbarAction } from "@rmwc/snackbar";
import { Tooltip } from "@rmwc/tooltip";
import { Field, FieldRow, Form } from "../../components/form";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    role: USER_ROLE.INTERN,
};

export function UserCreate({ refetch }) {
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const history = useHistory();
    const { url } = useRouteMatch();

    const formik = useFormik({
        initialValues,
        onSubmit: (value) => {
            addUser({
                variables: value,
            });
        },
    });

    const [addUser] = useMutation(ADD_USER, {
        onCompleted: (data) => {
            if (data?.addUser.error) {
                setError(data?.addUser.error);
            } else {
                refetch();
                setSuccess("Successfully created");
                formik.resetForm({
                    values: initialValues,
                });
                history.push(`${url}/../${data.addUser.user.id}`);
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
                    <SliderTitle>New User</SliderTitle>
                    <SliderActions>
                        <SliderActions>
                            <Tooltip content="Save User" align="bottom">
                                <IconButton
                                    disabled={formik.isSubmitting}
                                    icon={formik.isSubmitting ? <CircularProgress /> : "save"}
                                    label="Save User"
                                    onClick={formik.handleSubmit}
                                />
                            </Tooltip>
                        </SliderActions>
                    </SliderActions>
                </SliderHeader>
                <SliderContent>
                    <FormikProvider value={formik}>
                        <Form>
                            <FieldRow>
                                <Field name="firstName" label="First name" type="text" />
                                <Field name="lastName" label="Last name" type="text" />
                            </FieldRow>
                            <Field name="email" label="Email" type="email" />
                            <Field name="role" label="Role" type="text" options={USER_ROLE_LABEL} />
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
