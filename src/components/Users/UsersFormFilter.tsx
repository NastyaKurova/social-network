import {Field, Form, Formik} from "formik";
import React, {FC} from "react";
import {UsersFilterType} from "../../types/types";
import styles from "./Users.module.scss";

type UsersFormFilterPropsType = {
    filter: UsersFilterType
    findUsers: (values: UsersFilterType) => void
}
export const UsersFormFilter: FC<UsersFormFilterPropsType> = React.memo(({findUsers, filter}) => {

    return <div className={styles.filter}>
        <Formik
            initialValues={{
                term: filter.term,
                friend: filter.friend,
            }}
            onSubmit={findUsers}
            enableReinitialize={true}
        >
            <Form>
                <Field name="friend" as="select">
                    <option value="All">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <Field
                    id="term"
                    name="term"
                    type="text"
                    placeholder="user name"

                />
                <button type="submit">Find</button>
            </Form>
        </Formik>
    </div>
})