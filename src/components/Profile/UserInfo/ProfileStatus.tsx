import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styles from './UserInfo.module.scss';
import cn from 'classnames';

type ProfileStatusPropsType = {
    status: string,
    isOwner: boolean,
    updateProfileStatus: (status: string) => void,
}

const ProfileStatus: FC<ProfileStatusPropsType> = ({status, isOwner, updateProfileStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [statusText, setStatusText] = useState<string>(status)
    const activateEditMode = () => {
        if (isOwner) setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateProfileStatus(statusText)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.target.value)
    }
    useEffect(() => {
        setStatusText(status)
    }, [status])


    return <div className={cn(styles.profileStatus,{[styles.profileStatusPointer]:isOwner})}>
        {editMode
            ?
            <div><input role="status-input" onBlur={deactivateEditMode} autoFocus={true}
                        onChange={changeStatus}
                        value={statusText} type="text"/>
            </div>
            : <div role="status"
                   onDoubleClick={activateEditMode}>{statusText ? statusText : 'empty status'}</div>}
    </div>
}

export default ProfileStatus;