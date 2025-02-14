'use client'
import  { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();

  useEffect(() => {

    router.push("/home");
  }, [router]);


  return null;
}

export default Home;
