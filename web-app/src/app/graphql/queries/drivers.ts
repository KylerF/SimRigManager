import { gql } from 'apollo-angular'

export const GET_ACTIVE_DRIVER = gql`
  subscription activeDriver {
    activeDriver {
      id
      name
      nickname
      trackTime
      profilePic
    }
  }
`
