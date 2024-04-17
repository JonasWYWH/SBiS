import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>SBiS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="SBiS" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <a href="/places/">Places</a>
      </main>

      <Footer />
    </div>
  )
}
