import React, { useEffect, useState } from "react";
////////ACTUAL DATA FROM OPENAI//////////

// export default function AIResponse() {
//   const key = import.meta.env.VITE_OPENAI_API_KEY;
//   console.log(key);
//   async function fetchData() {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${key}`,
//         // Authorization: `Bearer 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`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-4",
//         messages: [
//           {
//             role: "user",
//             content:
//               "I am going to give you some sports teams and I want you to help me pick my new favorite soccer team based on the history and type of teams that I give you.  The soccer team should be from the English Premier League, Bundesliga, La Liga, Seria A, or Ligue 1.   Also with the suggested team, please provide your reasoning as to why this soccer team was chosen based on the other sports teams or athletes provided.",
//           },
//           {
//             role: "user",
//             content: "alabama football, new york yankees!",
//           },
//         ],
//       }),
//     });

//     const data = await response.json();
//     console.log("ChatResponse: ", data.choices[0].message.content);
//     return data.choices[0].message.content;
//   }

//   fetchData();
// }

///////JSON call to limit api requests/////////

function AIResponse() {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Use the correct relative path to the JSON file
        const response = await fetch("../samplechatresponse.json");
        const data = await response.json();
        const content = data.choices[0].message.content;
        setContent(content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h3>{content}</h3>
    </div>
  );
}

export default AIResponse;
