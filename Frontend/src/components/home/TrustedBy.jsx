import React from 'react'

const logos = [
  {
    alt: 'Google',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq9mrcbecC5-ZVwH2iB82K6coCEAFiD23SFCdCqwUAH4EgWTaxFwUCgoQjBBSWk9I-565OrmJLXCe_6Z4xGZI_a2_7i41JeUs1uUcNxcodKhCeNJs2wNDBKk-VJmsBg9iq3_QhauMhVK88K5DFANXsz9fUyAm-EnpashWAx2uB2eJkJk60vLcSEeKF7xnKtvzWbEgvQpO5iQrj8zbkYibipxkXvKsuWCWfLCRGmNGvK_FnuolDV-pWNSM9yozryW0MRpih48vK2cLa'
  },
  {
    alt: 'Meta',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-KvFJ5oTfe21xRKMMyLkVYGTnCCJJrU5qJyvEgzPlcbzEu61sozABZ9aLWX2kjFirmHpkgMhBtEMuw-op9i03unfxsbwK6mC7lL-Fr_KJSfjzhYGcu2RyKTykVrwlwaQVIIVjgmJgPJaaxB9xMKrpWu0WTe7MzjYSmFAl_e0RKxKd7m7RWWmAZKl5q_hor9ylADNsaZ85BL7ktY3e_gLH0XHrLNwXTNl52p8aVSLd5dy0honuE394CDUx7eQ0FX2-gXGK-y4jV4u'
  },
  {
    alt: 'Amazon',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTRkmAOiG3s9AaxWUm3V55Vd2s7LC0Wt-xHAMqSn2XBsqL8gCDCpP4Ox-sXHMTkEuRGEf11ru53MEIPa0yKf8eJtq945ndPh6WXmy2Kqf5QvYD3Yeq0-m8DksNwMQGnd-geSbM7Ud_R8GrPdIziD7LSjLv4nDJAAjHS7OC2Y73C-vFZWSAd938iwUHoDaO7b-If4wrtOtYj5YFPdvaEa9CoqZqsRIXf7AZNfHb6uT0DoTiV9s-E2lKccLIHoSJR1ldNbDXQ26Sk_dl'
  },
  {
    alt: 'Netflix',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0VS17oUQYAsA0vbwt2jCzNp1a5m0v_c3FFhED1mXAvOofq4lCdgBLlTUZQ-Sb3bsbEuwolvF7g6sqZ8aDb1Ijf1l1S0Zi6mf9NIOYkSfKuIIxlARXtKT3veo_qwP-TIgzVz5Xg-snL4N0h3shT6Vw8Xmj2g1fshPEph2h3dcz4SEbbBySpgztX7umk3hlClHTsbXUMgklcuUoL52ArwZpdIZ3K4Fe6k2F6pFifgYNGQixumwmmuxahuXIuvuIDtJHHokPq45ZG-CK'
  },
  {
    alt: 'Apple',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAync_4EFDwDQZQck3m6csi1K2uyZMyJO5fthYHhXm28q7-sTLI7I3P3E405Niz31jVX_uKZWBBQ5doC-sajmUbJlxl2TWkK4pXw-cnAIsl-Urvm2KNQ79gQtm1W7OEHNd9sap8zdEq9Iaa3y4XhZ1nbQR_7E5Un5nORYdZab_oelJSr9aPGgC1NIdZvcoPAZjUx4kss9KmMYLigBcTIqQpARWGvWcrCRpqCfeQSNPgn_6gcVOF_tp6_aytFyxQktebgcO9JmyXCvXe'
  }
]

const TrustedBy = () => {
  return (
    <section className="max-w-full md:max-w-7xl mx-auto md:px-6 mb-40 text-center">
      <p className="text-sm font-label text-on-surface-variant/60 uppercase tracking-[0.3em] mb-12">
        Trusted by candidates from top tech companies
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale contrast-125">
        {logos.map((logo) => (
          <img key={logo.alt} alt={logo.alt} className="h-6" src={logo.src} />
        ))}
      </div>
    </section>
  )
}

export default TrustedBy
