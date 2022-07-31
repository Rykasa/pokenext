import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Card from '../components/Card';
import styles from '../styles/Home.module.scss';

export type PokemonType = {
  id: number;
  name: string;
  url: string;
}

export interface APIResult {
  results: PokemonType[];
}

export async function getStaticProps(){
  const maxPokemons = 251;
  const api = 'https://pokeapi.co/api/v2/pokemon/';

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data: APIResult = await res.json();

  data.results.forEach((item, index) =>{
    item.id = index + 1;  
  });

  return { 
    props: {
      pokemons: data.results,
    },
  } 
}

export default function Home({ pokemons }: InferGetStaticPropsType<typeof getStaticProps>){
  return (
    <>
      <div className={styles.title_container}>
        <h1>Poke<span>Next</span></h1>
        <Image 
          src="/images/pokeball.png"
          width="50"
          height="50"
          alt="PokeNext"
        />
      </div>
      <div className={styles.pokemon_container}>
        {pokemons.map((pokemon) =>{
          return (
            <Card key={pokemon.id} pokemon={pokemon} />
          )
        })}
      </div>
    </>
  )
}
