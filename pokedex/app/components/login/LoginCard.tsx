import styles from './logincard.module.css'
import Image from 'next/image'
import Logo from './../../figures/Vector.svg'

type Props ={
    title: string,
    children:JSX.Element
}

export default function Logincard({title,children}:Props) {
    return(
        <>
            <section className={styles.card}> 
                    <Image src={Logo} alt=''></Image>
                    <h4 className={styles.title}>{title}</h4>
                {children}
            </section>
        </>
        )
}