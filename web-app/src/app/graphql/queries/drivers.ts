import { gql } from 'apollo-angular'

export const SUBSCRIBE_TO_ACTIVE_DRIVER = gql`
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

export const GET_ACTIVE_DRIVER = gql`
  query activeDriver {
    activeDriver {
      id
      name
      nickname
      trackTime
      profilePic
    }
  }
`
