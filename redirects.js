const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // /properties/* → /flats/*. Старая коллекция «properties» — legacy
  // из стартового шаблона, у нас её заменяют 4 типа (flats/commercial/
  // lands/residential-complexes). Чтобы внешние ссылки и SEO-индекс
  // не получили 404, отправляем 301 на квартирные slug'и; общий
  // список — на каталог квартир.
  const legacyPropertiesRedirects = [
    {
      source: '/properties',
      destination: '/flats',
      permanent: true,
    },
    {
      source: '/properties/:slug',
      destination: '/flats/:slug',
      permanent: true,
    },
  ]

  const redirects = [internetExplorerRedirect, ...legacyPropertiesRedirects]

  return redirects
}

export default redirects
