import React, { FC, useEffect } from 'react'
import styles from './Profile.module.scss'
import { UserInfo } from './UserInfo/UserInfo'
import { MyPosts } from '../../components/MyPosts/MyPosts'
import { ProfileDataType } from '../../types/types'
import {
  getAuthUserId,
  getProfile,
  getProfileStatus,
} from '../../State/selectors/profileSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import {
  requestProfile,
  requestProfileStatus,
  saveProfile,
  saveProfilePhoto,
  updateProfileStatus,
} from '../../State/reducers/profileReducer'

type ProfilePropsType = {
  profile: ProfileDataType
  status: string
  isOwner: boolean
  updateProfileStatus: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfile: (data: ProfileDataType) => void
}
const ProfilePage: FC<ProfilePropsType> = () => {
  const profile = useSelector(getProfile)
  const status = useSelector(getProfileStatus)
  const authUserId = useSelector(getAuthUserId)
  const { userId } = useParams()
  const isOwner = !userId
  const dispatch = useDispatch<any>()

  const updateCurrentProfileStatus = (status: string) => {
    dispatch(updateProfileStatus(status))
  }
  const saveCurrentProfilePhoto = (photo: File) => {
    dispatch(saveProfilePhoto(photo))
  }
  const saveCurrentProfile = (data: ProfileDataType) => {
    dispatch(saveProfile(data))
  }

  useEffect(() => {
    let currentUserId = Number(userId)
    if (!userId) currentUserId = authUserId

    dispatch(requestProfile(currentUserId))
    dispatch(requestProfileStatus(currentUserId))
  }, [userId, authUserId, dispatch])

  if (!authUserId) return <Navigate to={'/login'} />
  return (
    <div className={styles.profile}>
      <UserInfo
        profile={profile}
        status={status}
        updateProfileStatus={updateCurrentProfileStatus}
        isOwner={isOwner}
        savePhoto={saveCurrentProfilePhoto}
        saveProfile={saveCurrentProfile}
      />
      <MyPosts />
    </div>
  )
}

export default ProfilePage
