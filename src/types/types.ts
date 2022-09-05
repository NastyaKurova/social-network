export type PostDataItemType = { text: string; likes: number; time: string }

export interface PostDataType extends PostDataItemType {
  id: number
}

export type FileType = File
export type PostPhotosType = { small: string; large: string }
export type ContactsProfileType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type ProfileDataType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  aboutMe: string
  photos: PostPhotosType
  contacts: ContactsProfileType
}
export type UsersType = {
  followed: boolean
  id: number
  name: string
  photos: PostPhotosType
  status: string
  uniqueUrlName?: string
}
export type UsersFilterType = {
  term: string
  friend: string | boolean
}
export type CurrentUserType = {
  login: string | null
  id: number | null
  email: string | null
}
export type ResponseType<T = {}, RC = ResultCodesEnum> = {
  data: T
  fieldsErrors: Array<string>
  messages: Array<string>
  resultCode: RC
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesCaptureEnum {
  CaptureIsRequired = 10,
}

export type DialogsDataType = { id: number; name: string }
export type MessagesDataType = { id: number; text: string }
export type ChatMessageType = {
  id?: string
  message: string
  photo: string
  userId: number
  userName: string
}
export type ChatStatusType = 'ready' | 'pending' | 'error'
export type MessageSubscriberType = (messages: ChatMessageType[]) => void
export type StatusSubscriberType = (status: ChatStatusType) => void
