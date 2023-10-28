import "../index.css";
export default function UserList({ userList }) {
  const src_url = import.meta.env.VITE_API_URL;
  return (
    <>
      {linkList.map((link, id) => {
        return (
          <li key={id}>
            <div
             
            
            >
              {link.username}
            </div>
          </li>
        );
      })}
    </>
  );
}
