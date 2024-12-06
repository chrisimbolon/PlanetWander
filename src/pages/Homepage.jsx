import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You explore the world.
          <br />
          We capture your adventures.
        </h1>
        <h2>
          Explore a world map that traces your steps to every city you have
          visited. <br />
          Relive your amazing adventures and share your journey with friends as
          you wander the globe
        </h2>
        <Link to="/login" className="cta">
          Start Tracking Now
        </Link>
      </section>
    </main>
  );
}
