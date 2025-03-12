import styles from "./Testimonial.module.css";
import PageNav from "../components/PageNav";

export default function Testimonial() {
  return (
    <main className={styles.testimonial}>
      <PageNav />
      <section>
        <div>
          <h2>
          what did you just say ?        
          </h2>
          <p>
          <i>🥷 “Like a true wanderer of both code and the world, I seek hidden paths and secret destinations. PlanetWander is my ultimate scroll of discovery, mapping out every unseen corner of the Earth. No bugs, just adventures!” </i>– <strong>Ryu, Digital Nomad & Code Ninja  </strong>
          </p>
          <br />
          <p>
          <i>💨 “Some travel to escape, others travel to conquer. With PlanetWander, every step is a mission, every pin a victory.”</i> – <strong>Kaze, Shadow Explorer </strong> 
          </p>
          <br />
          <p>
          <i>🌒 “The world is a vast dojo, and I am but a student of its mysteries. This app helps me track my training grounds, from mountain peaks to neon cityscapes.” </i> – <strong>Sora, Modern-Day Ronin</strong>
          </p>
        </div>
        <img
          src="City.webp"
          alt="illustration of a large city on top of clouds"
        />
      </section>
    </main>
  );
}
