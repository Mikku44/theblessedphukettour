
import LangSwitch from './langSwitch'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { useTranslations } from 'next-intl';
import { getSession } from '../../ultilities/lib';


export default function Navbar(){
    const t = useTranslations();

    const session = getSession();
    return <div className="w-full flex justify-between sticky top-0 py-5 px-10  text-white z-10 bg-black/50 ">
        <div>LOGO

            {JSON.stringify(session)}
        </div>



        <ul className='lg:grid md:hidden hidden grid-cols-5 gap-5 justify-center items-center justify-items-center duration-150 '>
            <Link className=' w-full text-center duration-150' href="/" >
                <li  className="hover:border-[--primary] border-b-2 border-transparent">{t('Home')}</li>
            </Link>
            <Link className=' w-full text-center duration-150' href="/categories">
                <li className="hover:border-[--primary] border-b-2 border-transparent">{t('Explore Categories')}</li>
            </Link>
            <Link className=' w-full text-center duration-150' href="/car">
                <li className="hover:border-[--primary] border-b-2 border-transparent">{t('Car')}</li>
            </Link>
            <Link className=' w-full text-center duration-150' href="/tour">
                <li className="hover:border-[--primary] border-b-2 border-transparent">{t('Tour')}</li>
            </Link>
            <Link className=' w-full text-center duration-150' href="/add-on">
                <li className="hover:border-[--primary] border-b-2 border-transparent">{t('AddOns')}</li>
            
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