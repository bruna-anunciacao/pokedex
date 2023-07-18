'use client'
import Image from 'next/image';
import './card.css';
import { FaStar } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { getemail } from '../../utilis/getuser';

interface IProps {
    id: number;
    nome: string;
    imageUrl: string;
    types: string[];
    isFavorite: boolean;
}

interface Favorite {
    id: number;
    num: number;
    userEmail: string;
  }

const typeColors:Record<string,string> = {
    grass: '#78C850',
    fire: '#F05030',
    bug: '#EE8130',
    dark: '#705848',
    dragon: '#7038F8', 
    electric: '#F8D030',
    fairy: '#EE8130',
    fighting: '#903028',
    flying: '#A890F0',
    ghost: '#705898',
    ground: '#E0C068',
    ice: '#98D8D8',
    normal: '#A8A878',
    poison: '#A040A0',
    psychic: '#F85888',
    rock: '#B8A038',
    steel: '#EB8B8D0',
    water: '#6890F8',
};

export default function Card(props: IProps & {updateFav: (id:number, isFavorite: boolean) => void}) {
    const {id, nome, imageUrl, types, updateFav } = props;
    const [color, setColor] = useState<string>('');
    const [cardColor, setCardColor] = useState<string>('');
    const [order, setOrder] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const fetchFavorites = async () => {
          const ema = getemail();
          const res = await fetch(`http://localhost:3000/api/favoritos/pegar/`, {
            method: 'POST',
            body: JSON.stringify({ email: ema }),
          });
          const favorites: Favorite[] = await res.json();

          favorites.forEach((favorite) => {
            const favoriteNum = favorite.num;
            if (id === favoriteNum) {
                setColor('#FFD700');
                setOrder(-1)
                setIsFavorite(true)
              }
          });
        };
    
        fetchFavorites();
      }, []);

    useEffect(() => {
        const firstType = types[0];

        if (firstType === 'grass'){
            setCardColor('#78C850');
        } else if (firstType === 'fire'){
            setCardColor('#F05030');
        }else if (firstType === 'bug'){
            setCardColor('#EE8130');
        }else if (firstType === 'dark'){
            setCardColor('#705848');
        }else if (firstType === 'dragon'){
            setCardColor('#7038F8');
        }else if (firstType === 'electric'){
            setCardColor('#F8D030');
        }else if (firstType === 'fairy'){
            setCardColor('#EE8130');
        }else if (firstType === 'fighting'){
            setCardColor('#903028');
        }else if (firstType === 'flying'){
            setCardColor('#A890F0');
        }else if (firstType === 'ghost'){
            setCardColor('#705898');
        }else if (firstType === 'ground'){
            setCardColor('#E0C068');
        }else if (firstType === 'ice'){
            setCardColor('#98D8D8');
        }else if (firstType === 'normal'){
            setCardColor('#A8A878');
        }else if (firstType === 'poison'){
            setCardColor('#A040A0');
        }else if (firstType === 'psychic'){
            setCardColor('#F85888');
        }else if (firstType === 'rock'){
            setCardColor('#B8A038');
        }else if (firstType === 'steel'){
            setCardColor('#EB8B8D0');
        }else if (firstType === 'water'){
            setCardColor('#6890F8');
        }

    },[types]);

    const apertar = () => {
        setColor('#FFD700');
        setOrder(-1)
        if (color=='#FFD700') {
            setColor('#1E293B')
            setOrder(0)
        }
        const isPokemonFav = !isFavorite;
        setIsFavorite(isPokemonFav);
        updateFav(id, isPokemonFav);
    };

    return (
        <>
        <section className={`card-padrao `} style={{order: order, background: `${cardColor}1A`}}>
            <div className='card-div'>
            <h2>{nome}</h2>
            {types.map((type, index) => (
                <p key={index} className={`card-type ${type}`} style={{background: typeColors[type]}}>
                {type}
                </p>
            ))}
            </div>
            <a onClick={apertar}><FaStar id="card-estrela" style={{ color: color}} /></a>
            <div>
                <Image className='card-img' src={imageUrl} alt={nome} width={120} height={120}/>
            </div>                
        </section>
        </>
    )
}