import Script from 'next/script'
import React from 'react'

/**
 * Подгружает Yandex Metrika + Google Analytics 4. Оба id зашиты как
 * production-defaults; env-переменные при наличии переопределяют их
 * (для dev/staging счётчиков).
 *
 * Размещается один раз в root layout. next/script
 * strategy='afterInteractive' — счётчики не блокируют FCP/LCP.
 *
 * Env (опционально):
 *   NEXT_PUBLIC_YANDEX_METRIKA_ID — переопределить YM-id
 *   NEXT_PUBLIC_GA4_ID            — переопределить GA4-id
 *
 * Согласие на cookie: CookieConsent — soft-баннер (показывается, но
 * не блокирует). Если 152-ФЗ / GDPR-инспектор потребует hard-block,
 * добавить здесь условие: рендерить Scripts только когда в
 * localStorage `realty_cookie_consent_v1 === 'accepted'`.
 */

// Прод-defaults. ENV при наличии переопределяет.
const DEFAULT_YM_ID = '109710917'
const DEFAULT_GA4_ID = 'G-L7KQ9W2PJ8'

export const Analytics: React.FC = () => {
  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || DEFAULT_YM_ID
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID || DEFAULT_GA4_ID

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
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${ymId}", "ym");

              ym(${ymId}, "init", {
                ssr: true,
                webvisor: true,
                clickmap: true,
                ecommerce: "dataLayer",
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: true,
                trackLinks: true
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
