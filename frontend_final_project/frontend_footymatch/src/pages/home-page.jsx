import { redirect, useLoaderData } from "react-router-dom";
import HomeText from "../components/HomeText";
import Navigation from "../components/navigation";


export async function loader() {
  try {
    const url = `http://localhost:8000/urldata/?user=${localStorage.getItem("user_id")}`;
    // const url = `${import.meta.env.VITE_API_URL}/urldata/`;
    const linkList = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((response) => response.json());
    if (!Array.isArray(linkList)) {
      throw Error("Not an array of links");
    }
    console.log(linkList.title);
    return { linkList };
  } catch (error) {
    return redirect("/login");
  }
}




export default function Home() {
  return (
    <>
      <HomeText />
    </>
  );
}
