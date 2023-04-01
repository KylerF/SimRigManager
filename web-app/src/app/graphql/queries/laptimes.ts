import { gql } from 'apollo-angular';

export const GET_LAPTIMES = gql`
  query lapTimes($where: LaptimeFilter, $order: LaptimeOrder, $skip: Int, $limit: Int) {
    laptimes(where: $where, order: $order, skip: $skip, limit: $limit) {
      driver {
        id
        name
        profilePic
      }
      car
      trackName
      trackConfig
      time
      setAt
    }
  }
`;

export const SUBSCRIBE_TO_LAPTIMES = gql`
  subscription lapTimes {
    driver {
      id
      name
      profilePic
    }
    car
    trackName
    trackConfig
    time
    setAt
  }
`;
