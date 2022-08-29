import React, {ChangeEvent} from 'react';
// @ts-ignore
import styles from './UserInfo.module.scss';

type ProfileStatusPropsType = {
    status: string,
    updateProfileStatus: (status: string) => void,
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateProfileStatus(this.state.status)
    }
    changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.target.value})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return <div className={styles.profileStatus}>
            {}
            {this.state.editMode
                ?
                <div><input onBlur={this.deactivateEditMode} autoFocus={true} onChange={this.changeStatus}
                            value={this.state.status} type="text"/>
                </div>
                : <div
                    onDoubleClick={this.activateEditMode}>{this.props.status ? this.props.status : 'empty status'}</div>}


        </div>
    }
}

export default ProfileStatus;