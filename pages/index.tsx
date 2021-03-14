import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bayou Bowl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Bayou Bowl Tournament Homepage!
        </h1>

        <p className={styles.description}>
          Coming Soon!
        </p>

        <div className={styles.grid}>
          <img src="/bayou-bowl.jpg"></img>
        </div>
      </main>

      <footer className={styles.footer}>
          Built by MrSPwn
          © 2021 All Rights Reserved
      </footer>
    </div>
  )
}
