import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from '@/lib/auth';
import { isLanguageCode, translateLabel, type LanguageCode } from '@/lib/languages';
const Context = createContext({code:'pt' as LanguageCode,setCode:(_code:LanguageCode)=>{},t:(text:string)=>text});
export const useLanguage = () => useContext(Context);
export function LanguageProvider({children}:{children:ReactNode}) {
 const {user} = useAuth();
 const [code,setCode] = useState<LanguageCode>('pt');
 useEffect(()=>{const saved=user?.user_metadata?.['language'];setCode(isLanguageCode(saved)?saved:'pt');},[user?.id,user?.user_metadata?.['language']]);
 return <Context.Provider value={{code,setCode,t:(text)=>translateLabel(text,code)}}>{children}</Context.Provider>;
}
