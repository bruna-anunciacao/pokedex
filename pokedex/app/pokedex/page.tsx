import styles from './page.module.css'
import Header from '../components/header/header'
import List from '../components/list/list'

export default function Home() {
  return (
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&family=Open+Sans&family=Overpass:wght@500&family=Poppins:ital,wght@0,400;0,500;1,700&display=swap" rel="stylesheet"/>
      </head>
      <main className={styles.main}>
        <div className={styles.div}>
          <Header />
          <List />
          <footer className={styles.footer}>Com 💛 Info Jr UFBA 2022</footer>
        </div>        
      </main>
    </html>
  )
}