import { gql } from "apollo-angular";

export const GET_AVAILABILITY = gql`
  query availability {
    apiActive
  }
`;
