import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AnonymousNav from './components/AnonymousNav'
import Container from 'react-bootstrap/Container'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bayou Bowl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnonymousNav />

      <Container fluid>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to the Bayou Bowl Tournament Homepage!
        </h1>

          <p className={styles.description}>
            Coming Soon!
        </p>

          <div className={styles.grid}>
            <Image
              src="/img/bayou-bowl.jpg"
              alt="Bayou Bowl main graphic"
              height={1000}
              width={1000}
              layout="intrinsic"
            />
          </div>
        </main>
      </Container>

      <footer className={styles.footer}>
        Built by MrSpwn
        © 2021 All Rights Reserved
      </footer>
    </>
  )
}
