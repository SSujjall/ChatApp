/* eslint-disable react/prop-types */
export const ConnectedUsers = ({ users }) => {
  return (
    <div className="user-list">
      <h4>Connected Users</h4>
      {users.map((i, index) => (
        <h6 key={index}>{i}</h6>
      ))}
    </div>
  );
};
