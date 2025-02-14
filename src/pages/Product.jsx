import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="pict1.webp"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>Discover the Wonders of the World With Us</h2>
          <p>
            Planet Wander is your gateway to exploring the diverse beauty of our
            planet. Whether you arre an intrepid traveler, a nature enthusiast,
            or simply curious about the cultures that shape our world, Planet
            Wander brings the magic of discovery to your fingertips. With a
            user-friendly platform, stunning visuals, and curated information,
            we aim to inspire your next adventure while deepening your
            appreciation for the Earth's hidden gems.
          </p>
        </div>
      </section>
    </main>
  );
}
