import { gql } from "apollo-server";

export default gql`
  type Activity {
    id: ID!
    title: String!
    locations: [Location!]!
    price: Float
    startDate: String
    endDate: String
    type: String
    description: String
  }

  type Location {
    id: ID!
    country: String!
    city: String!
    longitude: String
    latitude: String
    type: LocationType!
    googleUrl: String
  }

  type Trip {
    id: ID!
    title: String!
    activities: [Activity!]!
    participants: [String!]!
  }

  type Author {
    id: ID!
    email: String!
    username: String!
    password: String!
    trips: [Trip!]!
    role: Role!
  }

  type AuthPayload {
    token: String!
    author: Author!
  }

  enum Role {
    ADMIN
    USER
  }

  enum LocationType {
    ORIGIN
    DESTINATION
    UNIQUE
  }
`;
