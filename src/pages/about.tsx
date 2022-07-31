import Image from "next/image";

import styles from '../styles/About.module.scss';

export default function About(){
  return(
    <div className={styles.about}>
      <h1>Sobre o projeto</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas libero cum explicabo, vel officiis quia distinctio ipsam doloremque quo vero adipisci aperiam corrupti labore minima odit perspiciatis a facilis.</p>
      <Image 
        src="/images/charizard.png"
        width="300"
        height="300"
        alt="Charizard"
      />
    </div>
  )
}