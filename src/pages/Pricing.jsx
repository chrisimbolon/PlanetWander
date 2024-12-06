// Uses the same styles as Product
import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Transparent pricing
            <br />
            only $5/month
          </h2>
          <p>
            Enjoy unlimited access to all features, free updates, and dedicated
            support to help you wander the planet with ease.At its heart, Planet
            Wander is more than just a travel platform — it's a community of
            like-minded adventurers. Share your stories, exchange tips, and
            celebrate the joy of exploring new horizons. Whether you are a solo
            traveler or someone seeking a family-friendly getaway, Planet Wander
            connects you with a network of travelers who share your curiosity
            and love for the world. Let’s wander, discover, and grow together!
          </p>
        </div>
        <img src="City2.png" alt="illustration of a large on top of cloud" />
      </section>
    </main>
  );
}
