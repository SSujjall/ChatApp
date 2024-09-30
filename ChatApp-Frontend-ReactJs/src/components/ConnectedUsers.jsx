/* eslint-disable react/prop-types */
export const ConnectedUsers = ({ users }) => {
  return (
    <div className="w-full h-full max-h-[300px] overflow-auto">
      <h4 className="text-center text-xl font-bold border-b-2 border-slate-300 rounded-lg">Connected Users</h4>
      {users.map((i, index) => (
        <p className="text-lg font-medium" key={index}>&#8226; {i}</p>
      ))}
    </div>
  );
};
