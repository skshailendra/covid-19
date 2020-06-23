import React ,{useState} from 'react';

export const ThemeContext = React.createContext({
  nightMode: null,
  thememode:'',
  toggleTheme: () => {}
});
const isNightTheme = ()=>{
  const time = new Date().getHours();
  return ( time > 20 || time < 7 ) ? true :  false;
};
const ThemeModeProvider = props => {
  const initThemeMode = isNightTheme() ? 'nightmode' : 'daymode';
  const [nightMode,setNightMode] = useState(isNightTheme());
  const [thememode,setThememode] = useState(initThemeMode);

  const toggleTheme = () => {
    const theme = nightMode ? 'daymode': 'nightmode'; 
    setNightMode(!nightMode);
    setThememode(theme);
  }

  return (
    <ThemeContext.Provider value = {{
      nightMode:nightMode,
      thememode:thememode,
      toggleTheme: toggleTheme
    }}>
      {props.children}
    </ThemeContext.Provider>
  )
};

export default ThemeModeProvider;