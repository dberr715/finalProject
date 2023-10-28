export default function AIResponse() {
  const API_KEY = "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";

  async function fetchData() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content:
              "I am going to give you some sports teams and I want you to help me pick my new favorite soccer team based on the history and type of teams that I give you.  The soccer team should be from the English Premier League, Bundesliga, La Liga, Seria A, or Ligue 1.   Also with the suggested team, please provide your reasoning as to why this soccer team was chosen based on the other sports teams or athletes provided.",
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
