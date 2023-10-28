import "../index.css";
export default function UserList({ userList }) {
  return (
    <>
      {userList.map((link, id) => {
        return (
          <li key={id}>
            <div>{link.username}</div>
          </li>
        );
      })}
    </>
  );
}
