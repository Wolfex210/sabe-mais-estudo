import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from '@/lib/auth';
import { useAppState } from '@/lib/store';
import { isLanguageCode, translateLabel, type LanguageCode } from '@/lib/languages';
const Context = createContext({code:'pt' as LanguageCode,setCode:(_code:LanguageCode)=>{},t:(text:string)=>text});
export const useLanguage = () => useContext(Context);
export function LanguageProvider({children}:{children:ReactNode}) {
 const {user} = useAuth();
 const progress = useAppState();
 const [code,setCode] = useState<LanguageCode>('pt');
 useEffect(()=>{const saved=progress.language;setCode(isLanguageCode(saved)?saved:'pt');},[user?.id,progress.language]);
 return <Context.Provider value={{code,setCode,t:(text)=>translateLabel(text,code)}}>{children}</Context.Provider>;
}
