import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../StateManagement/Reducers/statsReducer";
import styles from "./stats.module.scss";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

function Stats() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.stats.getStats);

  useEffect(() => {
    dispatch(getStats());
  }, []);

  const renderCustomBarLabel = (props) => {
    console.log({ props });
    const { payload, x, y, width, height, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-6}
      >{`value: ${value}`}</text>
    );
  };

  const data = [
    { name: "Gas", kwh: stats.gas },
    { name: "Electricity (Day)", kwh: stats.electricityDay },
    { name: "Electricity (Night)", kwh: stats.electricityNight },
  ];

  return (
    <div className={styles.main}>
      <h2>Daily Usage Average</h2>

      <div className={styles.chart}>
        <BarChart width={600} height={500} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar
            dataKey="kwh"
            barSize={50}
            fill="#006e33"
            label={renderCustomBarLabel}
          />
        </BarChart>
      </div>
    </div>
  );
}

export default Stats;
