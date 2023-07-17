import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layouts/AdminLayout'
import withMainLayout from '@/hocs/withUserLayout';

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <></>
  )
}

export default withMainLayout(Home);
