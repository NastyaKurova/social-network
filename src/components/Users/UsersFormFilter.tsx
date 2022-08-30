import {Field, Form, Formik} from "formik";
import React, {FC, useEffect, useState} from "react";
import {UsersFilterType} from "../../types/types";

type UsersFormFilterPropsType = {
    filter: UsersFilterType
    findUsers: (values: UsersFilterType) => void
}
export const UsersFormFilter: FC<UsersFormFilterPropsType> = ({findUsers, filter}) => {
    useEffect(() => {
        setFilterValue({...filter})
    }, [filter.friend, filter.term])

    const [filterValue, setFilterValue] = useState<UsersFilterType>({term: '', friend: 'All'})
    const onSubmitForm = () => {
        findUsers(filterValue)
    }
    const onSelectFriend = (e) => {
        setFilterValue({...filterValue, friend: e.target.value})
    }
    const onChangeTerm = (e) => {
        setFilterValue({...filterValue, term: e.target.value})
    }

    return <>
        <Formik
            initialValues={{
                term: '',
                friend: 'All',
            }}
            onSubmit={onSubmitForm}
        >
            <Form>
                <Field name="friend" as="select" value={filterValue.friend} onChange={onSelectFriend}>
                    <option value="All">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <Field
                    id="term"
                    name="term"
                    type="text"
                    placeholder="user name"
                    value={filterValue.term}
                    onChange={onChangeTerm}
                />
                <button type="submit">Find</button>
            </Form>
        </Formik>
    </>
}