const config = {
  service: 'FICT Advisor',
  logo: '/assets/logo.png',
  faculty: 'ФІОТ',
  source: 'https://github.com/fictadvisor',
  botId: '5665898174',
  contacts: {
    bot: 'sOleksandrTestBot',
    feedbackBot: 'fict_robot',
    scHead: 'gazinaft',
    scChannel: 'fict_time',
    sovaChannel: 'analyticsFICT',
    sovaChannelName: 'ФІОТ СОВА ім. Віри Петрівни',
  },
  roles: {
    user: 'Користувач',
    admin: 'Адміністратор',
  },
  menu: [
    { text: 'Головна', href: '/' },
    { text: 'Викладачі', href: '/teachers' },
    { text: 'Предмети', href: '/subjects' },
    { text: 'Супергерої', href: '/superheroes' },
    { text: 'Допомога', href: '/help' },
  ],
};

export default config;
