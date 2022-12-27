import { useState } from "react";
import styles from "./readings.module.scss";
import moment from "moment/moment";

function Readings(props) {
  const now = moment().format("YYYY-MM-DD");

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {};

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.h2}>Meter Readings</h2>

      <div className={styles.formDiv}>
        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>Date</label>
            <input
              type="date"
              className={styles.input}
              onChange={handleChange}
              name="date"
              required
              defaultValue={now}
            />
          </span>
        </span>

        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>Gas Meter Reading (kWh)</label>
            <input
              type="number"
              className={styles.input}
              onChange={handleChange}
              name="gas"
              required
            />
          </span>
        </span>
      </div>

      <div className={styles.formDiv}>
        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>
              Electricity Meter Reading - Day (kWh)
            </label>
            <input
              type="number"
              className={styles.input}
              onChange={handleChange}
              name="electricityDay"
              required
            />
          </span>
        </span>

        <span className={styles.formDiv2}>
          <span className={styles.inputDiv}>
            <label className={styles.label}>
              Electricity Meter Reading - Night (kWh)
            </label>
            <input
              type="number"
              className={styles.input}
              onChange={handleChange}
              name="electricityNight"
              required
            />
          </span>
        </span>
      </div>

      <button className={styles.submit}>Submit</button>
    </form>
  );
}

export default Readings;
