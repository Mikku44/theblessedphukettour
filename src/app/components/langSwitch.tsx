'use client'

import { Button } from "@nextui-org/button";
import setCookie from "../../ultilities/setCookie";
import Image from "next/image";

export default function LangSwitch() {
  

    const changeLanguage = (Locale: string) => {

        setCookie('locale', Locale, 30);
        window.location.reload();
    };
    return <div className="flex gap-2">
        <Button variant="light" isIconOnly onClick={e => changeLanguage('ar')}><Image className="w-[32px]" width={64} height={64} src="/icons/uae.png" alt={"Arabic flag"}/></Button>
        <Button variant="light" isIconOnly onClick={e => changeLanguage('en')}><Image className="w-[32px]" width={64} height={64} src="/icons/uk.png" alt={"English flag"}/></Button>
        
    </div>
}