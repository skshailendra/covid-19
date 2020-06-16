import React ,{useState} from 'react';

export const ThemeContext = React.createContext({
  nightMode: null,
  thememode:'',
  toggleTheme: () => {}
});

const ThemeModeProvider = props => {
  const initNightMode = localStorage.getItem('nightmode') === 'true';
  const initThemeMode = initNightMode ? 'nightmode' : 'daymode';
  const [nightMode,setNightMode] = useState(initNightMode);
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