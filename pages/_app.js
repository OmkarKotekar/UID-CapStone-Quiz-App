import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState({value: null})
  const [key, setkey] = useState()
  const router = useRouter();

  
  const logout = ()=> {
    localStorage.removeItem('token')
    setUser({value:null})
    setkey(Math.random())
  }

  useEffect(()=>{

    const token = localStorage.getItem('token')
    if(token){
      setUser({value:token})
      setkey(Math.random())
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {key && <Navbar logout={logout} user={user} key={key} />}
      {!key && <Navbar user={user} key={key} />}
      <div className='min-h-[77.5vh]'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>)
}
