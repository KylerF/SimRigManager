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

export const GET_ALL_DRIVERS = gql`
  query allDrivers {
    drivers {
      id
      name
      nickname
      trackTime
      profilePic
    }
  }
`

export const SELECT_DRIVER = gql`
  mutation setActiveDriver($driverId: Int!) {
    setActiveDriver(driverId: $driverId) {
      id
      name
      nickname
      trackTime
      profilePic
    }
  }
`
