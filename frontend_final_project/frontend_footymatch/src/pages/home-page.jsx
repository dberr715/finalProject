import { redirect, useLoaderData } from "react-router-dom";
import HomeText from "../components/HomeText";
import UserList from "../components/UserList";
// import AIResponse from "../components/AIResponse";
import {FootballData} from "../components/FootballData";

export async function loader() {
  try {
    const url = `http://localhost:8000/user/?user=${localStorage.getItem(
      "username"
    )}`;
    // const url = `${import.meta.env.VITE_API_URL}/user/`;
    const userList = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((response) => response.json());
    if (!Array.isArray(userList)) {
      throw Error("Not an array of links");
    }
    console.log("UserList", userList);
    // console.log(userList.username);
    return { userList };
  } catch (error) {
    return redirect("/login");
  }
}

export default function Home() {
  const { userList } = useLoaderData();

  return (
    <>
      <HomeText />
      <FootballData/>
      {/* <AIResponse/> */}
      <UserList userList={userList} />
    </>
  );
}
