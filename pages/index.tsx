import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MainNav from '../components/MainNav'
import Container from 'react-bootstrap/Container'
import { constants } from './util/constants'
import { UserProfile, useUser } from '@auth0/nextjs-auth0'

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    <>
      <Head>
        <title>{constants.appName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNav />

      <Container fluid>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to {constants.appName}
        </h1>

          <p className={styles.description}>
            Coming Soon!
        </p>
        </main>
      </Container>
      <footer className={styles.footer}>
        Built by MrSpwn
        © 2021 All Rights Reserved
      </footer>
    </>
  )
}
