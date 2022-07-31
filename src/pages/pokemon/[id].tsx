import { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { APIResult } from "..";

import styles from '../../styles/Pokemon.module.scss';

type PokemonElementType = {
  type: {
    name: string;
  }
}

type PokemonType = {
  id: number;
  name: string;
  url: string;
  types: PokemonElementType[];
  height: number;
  weight: number;
}

type PageProps = {
  pokemon: PokemonType;
}

export const getStaticPaths = async() => {
  const maxPokemons = 251;
  const api = 'https://pokeapi.co/api/v2/pokemon/';

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data: APIResult = await res.json();

  const paths = data.results.map((pokemon, index) =>{
    return{
      params: { id: (index + 1).toString() },
    }
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>>{
  const id = context.params?.id;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    props: {
      pokemon: data
    }
  }
}

export default function Pokemon({ pokemon }: InferGetStaticPropsType<typeof getStaticProps>){
  return (
    <div className={styles.pokemon_container}>
      <h1>{pokemon.name}</h1>
      <Image 
        src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      <div>
        <h3>Número:</h3>
        <p>#{pokemon.id}</p>
      </div>
      <div>
        <h3>Tipo:</h3>
        <div className={styles.types_container}>
          {pokemon.types.map((item, index) =>(
            <span 
              key={index}
              className={`${styles.type} ${styles['type_' + item.type.name]}`}
            >{item.type.name}</span>
          ))}
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  )
}