import Image from "next/image";
import Link from "next/link";
import { PokemonType } from "../pages";

import styles from '../styles/Card.module.scss';

interface CardProps{
  pokemon: PokemonType;
}

export default function Card({ pokemon }: CardProps){
  return(
    <div className={styles.card}>
      <Image 
        src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
        width="120"
        height="120"
        alt={pokemon.name}
      />
      <p>#{pokemon.id}</p>
      <h3>{pokemon.name}</h3>
      <Link href={`/pokemon/${pokemon.id}`}>Detalhes</Link>
    </div>
  )
}