import Script from 'next/script'
import React from 'react'

/**
 * Подгружает Yandex Metrika и/или Google Analytics 4 — оба опциональны.
 * Если переменные окружения не заданы, ничего не рендерится.
 *
 * Размещается один раз в root layout. Skript next/script со
 * strategy='afterInteractive' гарантирует, что счётчики не блокируют
 * рендер и FCP.
 *
 * Env:
 *   NEXT_PUBLIC_YANDEX_METRIKA_ID — id счётчика (например, 12345678)
 *   NEXT_PUBLIC_GA4_ID            — measurement id (G-XXXXXXXXXX)
 *
 * Согласие на cookie: текущий CookieConsent — мягкая модель (баннер
 * показывается, но не блокирует трекинг). Если потребуется hard-block,
 * условие добавляется здесь — рендерить Scripts только когда в
 * localStorage есть ключ realty_cookie_consent_v1 = accepted.
 */
export const Analytics: React.FC = () => {
  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID

  if (!ymId && !ga4Id) return null

  return (
    <>
      {ymId ? (
        <>
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${ymId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            `}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${ymId}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        </>
      ) : null}

      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  )
}
