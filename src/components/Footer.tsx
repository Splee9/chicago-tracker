import { data } from "../lib/data";
import { fmt1, formatDate } from "../lib/format";
import styles from "./Footer.module.css";

export function Footer() {
  const { meta } = data;
  return (
    <footer className={styles.footer}>
      <p>
        <b>{fmt1(meta.blockMilesToDate)}</b> miles into the build · <b>{meta.daysToRace}</b> days to{" "}
        {formatDate(meta.raceDate)}.
      </p>
      <p className={styles.stamp}>
        Last refreshed {formatDate(meta.lastUpdated)} · rebuilt automatically from a Strava + Garmin
        training log. Aggregate weekly figures only — no pace, GPS, heart rate, or health data.
      </p>
    </footer>
  );
}
