import { createContext, useState } from "react";
import {englishLanguage} from '../constants';

export const LanguageContext = createContext();

export const LanguageProvider = ({
    children
}) => {
    const [language, setLanguage] = useState(englishLanguage);

    const setAppLanguage = (lang) => {
        setLanguage(lang);
    };    

    return (
        <LanguageContext.Provider value={{
            language,            
            setAppLanguage          
        }}>
            {children}
        </LanguageContext.Provider>
    );
}
