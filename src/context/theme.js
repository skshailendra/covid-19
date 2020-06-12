import React ,{useState} from 'react';

export const ThemeContext = React.createContext({
    nightMode: null,
    thememode:'',
    toggleTheme: () =>{}
});

const ThemeModeProvider = props =>{
    const [nightMode,setNightMode] = useState(false);
    const [thememode,setThememode] = useState('daymode');
    const toggleTheme = ()=>{
        const theme = nightMode ? 'daymode': 'nightmode'; 
        setNightMode(!nightMode);
        setThememode(theme);
    }
    return (
        <ThemeContext.Provider value={{
            nightMode:nightMode,
            thememode:thememode,
            toggleTheme: toggleTheme
        }}>
{props.children}
        </ThemeContext.Provider>
    )
};

export default ThemeModeProvider;