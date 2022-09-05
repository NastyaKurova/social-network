import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import { Loader } from '../common/Loader/Loader'
import { getIsLoaded } from '../../State/selectors/userSelectors'

const UserPage: FC = () => {
  const isLoaded = useSelector(getIsLoaded)

  return (
    <>
      {!isLoaded ? <Loader /> : null}
      <Users />
    </>
  )
}
export default UserPage
