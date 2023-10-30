import React, { useEffect, useState } from "react";
////////ACTUAL DATA FROM OPENAI//////////

export default function AIResponse() {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  console.log(key);
  async function fetchData() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        // Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content:
              "In the next prompt, I will give 1+ non-soccer sports teams, and I want you to make a recommendation of a soccer team that I should follow. Tell 1 team name that fits all the input teams I entered and 2 sentences why this would be a good team to follow. After I give you teams, let the first response line be just the team name in bold. Limit your choices to teams in the EPL, La Liga, Bundesliga, Ligue1, or Serie A ",
          },
          {
            role: "user",
            content: "alabama football, new york yankees!",
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("ChatResponse: ", data.choices[0].message.content);
    return data.choices[0].message.content;
  }

  fetchData();
}

///////JSON call to limit api requests/////////

// function AIResponse() {
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {

//         const response = await fetch("../samplechatresponse.json");
//         const data = await response.json();
//         const content = data.choices[0].message.content;
//         setContent(content);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h3>{content}</h3>
//     </div>
//   );
// }

// export default AIResponse;
