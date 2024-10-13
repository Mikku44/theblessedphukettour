
import { cookies } from 'next/headers'
import LangSwitch from './langSwitch'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { useTranslations } from 'next-intl';


export default function Navbar(){
    const t = useTranslations();


    return <div className="w-full flex justify-between sticky top-0 py-5 px-10  text-white z-10 bg-black/50 ">
        <div>LOGO</div>

        <ul className='lg:grid md:hidden hidden grid-cols-4 gap-12 justify-center items-center justify-items-center duration-150 '>
            <Link href="/" >
                <li >{t('Home')}</li>
            </Link>
            <Link href="/car">
                <li>{t('Car')}</li>
            </Link>
            <Link href="/tour">
                <li>{t('Tour')}</li>
            </Link>
            <Link href="/add-on">
                <li>{t('AddOns')}</li>
            
            </Link>
        </ul>
        <div className="w-10"></div>
        <div className="lg:grid md:hidden hidden grid-flow-col gap-2 absolute right-5 top-3">
            <LangSwitch />
            <Link href="/register"><Button variant="light" className='text-white'>Sign Up </Button></Link>
            <Link href="/login"><Button className='bg-[--primary] text-white'>Sign In</Button></Link>
        </div>
    </div>
}