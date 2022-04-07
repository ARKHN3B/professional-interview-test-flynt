// Libs
import React, { useMemo, useState }  from "react";
import { useFormik, FormikProvider } from "formik";
import { useMutation, useQuery }     from "@apollo/client";
import { useHistory, useRouteMatch }    from "react-router-dom";
import { compact, concat, reduce } from "lodash";

// Graph
import { GET_USERS, CREATE_TEAM } from "../../graph";

// Components
import { IconButton }                                                      from "@rmwc/icon-button";
import { CircularProgress }                                                from "@rmwc/circular-progress";
import { Snackbar, SnackbarAction }                                        from "@rmwc/snackbar";
import { Tooltip }                                                         from "@rmwc/tooltip";
import { Field, Form }                                           from "../../components/form";
import { Slider, SliderHeader, SliderTitle, SliderContent, SliderActions } from "../../components/slider";

// Styles
import "./TeamCreate.css";

const initialValues = {
    name: "",
    leader: "",
    members: [],
    interns: [],
};

export function TeamCreate({ refetch }) {
    const [error, setError]                                        = useState(undefined);
    const [success, setSuccess]                                    = useState(undefined);
    const history                                                  = useHistory();
    const { url }                                                  = useRouteMatch();
    const { data: { users } = {} } = useQuery(GET_USERS);

    const formik = useFormik({
        initialValues,
        onSubmit: ({ name, leader, members, interns }) => {
            const userIds = compact(concat(leader, members, interns));
            createTeam({
                variables: { name, userIds }
            })
        }
    });

    const [createTeam] = useMutation(CREATE_TEAM, {
        onCompleted: (data) => {
            if (data?.createTeam.error) {
                setError(data?.createTeam.error);
            }
            else {
                refetch();
                setSuccess("Successfully created");
                formik.resetForm({
                    values: initialValues
                });
                history.push(`${url}/../${data.createTeam.team.id}`);
            }
            formik.setSubmitting(false);
        },
        onError    : () => {
            setError("An error ocurred during save");
            formik.setSubmitting(false);
        }
    });

    // Build
    const memoizedUserOptions = useMemo(() => {
        return reduce(users, (acc, user) => {
            const group    = acc[user.role] || []; // Get or initiate group
            const option   = { label: user.firstName + " " + user.lastName, value: user.id };
            acc[user.role] = [...group, option];
            return acc;
        }, {});
    }, [users]);

    return (
        <>
            <Slider className="c-slider--2x">
                <SliderHeader>
                    <SliderTitle>New Team</SliderTitle>
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
                        <Form className="team-create__form">
                            <Field name="name" label="Team name" type="text" required />
                            <Field name="leader" label="Leader" type="text"
                                   options={memoizedUserOptions?.SQUAD_LEADER || []} required />
                            <Field name="members" label="Members" multiple
                                   options={memoizedUserOptions?.SQUAD_MEMBER || []} />
                            <Field name="interns" label="Interns" multiple
                                   options={memoizedUserOptions?.INTERN || []} />
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
