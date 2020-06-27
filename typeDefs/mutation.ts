import { gql } from "apollo-server";

export default gql`
  type Mutation {
    signup(email: String!, password: String!, username: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
