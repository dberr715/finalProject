import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

export default function LeagueTables() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://widgets.api-sports.io/2.0.3/widgets.js";
    script.onload = () => {
      setLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>League Tables</title>
        <script
          src="https://widgets.api-sports.io/football/1.1.8/widget.js"
          crossorigin="anonymous"
          async
        ></script>
      </Helmet>

      {loaded ? (
        <div
          id="wg-api-football-livescore"
          data-host="api-football-v1.p.rapidapi.com"
          data-refresh="60"
          data-key="Your-Api-Key-Here"
          data-theme="import.meta.env.VITE_FOOTBALL_API_KEY"
          data-show-errors="false"
          class="api_football_loader"
        ></div>
      ) : (
        // Loading state or fallback
        <div>Loading...</div>
      )}
    </>
  );
}
