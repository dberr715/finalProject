import "../index.css";

export async function loader() {
  const url = "https://api-football-v1.p.rapidapi.com/teams/team/5";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d54cf95289msh3f3b06b9b758e1fp1c038cjsn2412a9cf1752",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };


try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

}
export default function FootballData() {}