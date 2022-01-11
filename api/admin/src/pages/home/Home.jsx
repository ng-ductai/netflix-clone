import Chart from "../../components/chart/Chart";
import "./index.scss";
import Widget from "../../components/widget/Widget";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Featured from "../../components/featured/Featured";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzdkNGQ0MmFjNmJkMjNjNGM0MzFkMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDUzMTU0NiwiZXhwIjoxNjQwOTYzNTQ2fQ.W4fUxNAK517rjqGpzJcCzw1UzUBdGbPcbctZfunLeKM",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <Featured/>
      
      <div className="home__widgets">
        <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
        <Widget />
      </div>
    </div>
  );
}
