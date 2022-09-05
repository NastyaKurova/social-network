import {
  FileType,
  PostPhotosType,
  ProfileDataType,
  ResponseType,
} from '../types/types'
import { instance } from './api'

type ProfilePhotoResponseType = ResponseType<{ photos: PostPhotosType }>

export const profileApi = {
  getProfile(userId: number) {
    return instance
      .get<ProfileDataType>(`profile/${userId}`)
      .then(res => res.data)
  },
  getProfileStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then(res => res.data)
  },
  setProfileStatus(status: string) {
    return instance
      .put<ResponseType>(`profile/status/`, { status })
      .then(res => res.data)
  },
  setProfilePhoto(photo: FileType) {
    const formData = new FormData()
    formData.append('image', photo)
    return instance
      .put<ProfilePhotoResponseType>(`profile/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => res.data)
  },
  setProfile(data: ProfileDataType) {
    return instance.put<ResponseType>(`profile/`, data).then(res => res.data)
  },
}
