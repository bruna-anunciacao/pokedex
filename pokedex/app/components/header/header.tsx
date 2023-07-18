import Image from "next/image";
import './header.css';
import Logo from './../../figures/Vector.svg'
import Lupa from './../../figures/Button.svg'

export default function Header() {
    return (
        <>
        <div className="header">
            <Image id="img-logo" src={Logo} alt="logomarca pokedex" />
            <div className="header-text">            
                <div className="header-text-input">
                    <input 
                        type="string"
                        placeholder="Pesquisar pokémon"
                        required
                        // value={nome_pokemon}
                        // onChange={(e) => setBread(parseInt(e.target.value))} estilo modal.tsx da A7
                    />
                    <a><Image id="img-lupa" src={Lupa} alt="Lupa" /></a>
                </div>                
                <h1>Pokédex</h1>
            </div>
        </div>
        </>
    )
}