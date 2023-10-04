import { gql, useQuery } from "@apollo/client";
import React from "react";

export const UserList = () => {
  const GET_USERS = gql`
    query {
      users {
        name
        email
        address
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(loading, error, data);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong while fetching the data...</p>;
  }
  return (
    <div className="userlists">
      {data.users.map((user) => (
        <div className="useritem">
          <p>
            <span style={{ fontWeight: "bold" }}>Name:</span> {user.name}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span> {user.email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address:</span> {user.address}
          </p>
        </div>
      ))}
    </div>
  );
};
