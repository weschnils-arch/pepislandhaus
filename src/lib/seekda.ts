// Loads the Seekda (KBE) booking widget loader once and returns the __KBE API.
// All three widgets (searchbar / rates / offers) share id "BOOKINGWIDGET" + propertyCode S001697,
// exactly as provided in the client's link document.
export function ensureKbe(): any {
  const w = window as any
  if (!w['kbe-widgets']) {
    ;(function (t: any, e: any, n: any, s: any) {
      t['kbe-widgets'] = s
      t[s] =
        t[s] ||
        new Proxy(
          { q: [] as any[] },
          { get: (e: any, n: any) => (n in e ? e[n] : function (a: any) { t[s].q.push([n, a]) }) }
        )
      const o = e.createElement(n)
      const r = e.getElementsByTagName(n)[0]
      o.id = s
      o.src = 'https://widget-bf.seekda.com/loader.js'
      o.async = 1
      r.parentNode.insertBefore(o, r)
    })(window, document, 'script', '__KBE')
    // settings() must run EXACTLY ONCE — calling it again (e.g. once per
    // mounted widget) crashes the Seekda widget ("reading 'language'") and
    // leaves every widget on the page empty. Keep it inside this one-time guard.
    w.__KBE.settings({ id: 'BOOKINGWIDGET', propertyCode: 'S001697' })
  }
  return w.__KBE
}
