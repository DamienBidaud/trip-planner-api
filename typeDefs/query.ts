import { gql } from "apollo-server";

export default gql`
  type Query {
    validateAuth(token: String!): String
    activity(activityID: ID!): Activity!
    locations: [Location!]!
    author(token: String!): Author
    trip(tripId: ID!): Trip
  }
`;
