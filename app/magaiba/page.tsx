"use client"

import { useLanguage } from "@/components/language-context"

export default function Magaiba() {
  const { t, language } = useLanguage()

  return (
    <main className="py-8 px-4 md:px-12">
      <div className="marquee-container mb-6">
        <div className="marquee">
          <span>MAGAIBA // WEB3 + AI // BLOCKCHAIN // ARTIFICIAL INTELLIGENCE // INNOVATION</span>
        </div>
      </div>

      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neon-green font-cyber glitch" data-text="MAGAIBA">
          MAGAIBA
        </h1>
        <h2 className="text-xl text-neon-cyan mb-4 font-cyber">WEB3_AI_INNOVATION.exe</h2>
      </section>

      <section className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video on the left */}
          <div className="terminal">
            <div className="terminal-header">
              <span className="text-xl">MAGAIBA_RECAP</span>
            </div>
            <div className="terminal-content p-0">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/T0jHv0bQ3Kg"
                  title="Magaiba Recap"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Title on the right */}
          <div className="terminal">
            <div className="terminal-header">
              <span className="text-xl">MAGAIBA_INFO</span>
            </div>
            <div className="terminal-content flex items-center justify-center">
              <div className="text-center flex flex-col items-center">
  <img src="/magaibacoin.gif" alt="Magaiba Coin" className="mx-auto mb-4 w-24 h-24" />
  <h2 className="text-3xl md:text-4xl text-neon-green mb-6 font-cyber">
    {language === "es" ? "¿QUÉ ES MAGAIBA?" : "WHAT IS MAGAIBA?"}
  </h2>
  <p className="text-xl text-neon-cyan">
    {language === "es"
      ? "La primera memecoin argentina popular, comunitaria y gentle."
      : "The first Argentine memecoin to go global: community-driven and gentle."}
  </p>
</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-12">
        <div className="terminal">
          <div className="terminal-header">
            <span className="text-xl">MAGAIBA_DETAILS</span>
          </div>
          <div className="terminal-content">
            {language === "es" ? (
              <>
                <p className="mb-6 text-lg font-bold">
                  $MAGAIBA fue la primera memecoin argentina que alcanzó niveles de viralidad globales. Fue creada por Juan Ruocco y Pablo Wasserman, hosts del podcast Círculo Vicioso, y dos devs anónimos. Esta "memecoin" alcanzó un market cap de U$S 16.000.000, una liquidez de U$S 350.000, y un ATH (precio) de U$S 0.02132; por ese entonces, el doble de valor que un yen japonés.
                </p>

                <p className="mb-6 text-lg">
                  Era oyente del podcast y, cuando contaron sobre el proyecto y la decisión de crearlo a nivel comunitario, me pareció un side project divertido que mezclaba web3 con comunicación y tecnología.
                </p>

                <p className="mb-6 text-lg">
                  Participé en el proceso de comunicación de $MAGAIBA y creé el canal de YouTube "RADIO MAGAIBA", que funcionaba 24x7 con canciones generadas con IA (Suno), curando también contenido creado por la comunidad. Desde su creación, el canal cuenta con más de 1.9 millones de horas de visualización y más de 500 suscriptores.
                </p>

                <p className="mb-6 text-lg">
                  Por cuestiones de copyright (algunas canciones creadas por la comunidad usaban samples de canciones populares) quedaron pocos videos accesibles; comparto acá:
                </p>
              </>
            ) : (
              <>
                <p className="mb-6 text-lg font-bold">
                  $MAGAIBA was the first Argentine memecoin to reach truly global virality. It was created by Juan Ruocco and Pablo Wasserman, hosts of the podcast Círculo Vicioso, along with two anonymous devs. This memecoin reached a $16,000,000 market cap, around $350,000 in liquidity, and an ATH price of $0.02132—at the time, roughly twice the value of a Japanese yen.
                </p>

                <p className="mb-6 text-lg">
                  I was a listener of the podcast, and when they shared the project and the decision to build it as a community-driven initiative, it felt like a fun side project that mixed web3 with communication and technology.
                </p>

                <p className="mb-6 text-lg">
                  I contributed to $MAGAIBA’s communication efforts and created the YouTube channel “RADIO MAGAIBA”, which ran 24/7 with AI-generated songs (Suno), also curating content created by the community. Since launch, the channel has accumulated over 1.9 million watch hours and more than 500 subscribers.
                </p>

                <p className="mb-6 text-lg">
                  Due to copyright issues (some community songs used samples from popular tracks), only a few videos remain accessible—sharing them here:
                </p>
              </>
            )}

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/videoseries?list=PLDQ8uca_QeH3eyiqXaBhIY_OUzC9gTMyB"
                title="Radio Magaiba Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-12">
        <div className="terminal">
          <div className="terminal-header">
            <span className="text-xl">MAGAIBA_NEWS</span>
          </div>
          <div className="terminal-content">
            <h3 className="text-xl text-neon-cyan mb-4">
              {language === "es" ? "MAGAIBA EN LOS MEDIOS:" : "MAGAIBA IN THE MEDIA:"}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://elplanteo.com/magaiba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  El Planteo: Magaiba
                </a>
              </li>
              <li>
                <a
                  href="https://www.ambito.com/criptomonedas-aprobaron-la-reforma-la-ley-prevencion-lavado-activos-n5965481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Ámbito: Criptomonedas - Aprobaron la reforma a la ley de prevención de lavado de activos
                </a>
              </li>
              <li>
                <a
                  href="https://es-us.finanzas.yahoo.com/noticias/magaiba-memecoin-argentina-surgió-podcast-183000944.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Yahoo Finanzas: Magaiba, la memecoin argentina que surgió de un podcast
                </a>
              </li>
              <li>
                <a
                  href="https://corta.com/economia/que-magaiba-memecoin-argentina-n22698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Corta: ¿Qué es Magaiba? La memecoin argentina
                </a>
              </li>
              <li>
                <a
                  href="https://www.ellitoral.com/internet-y-tecnologia/memecoin-creado-argentinos-base-lagarto-nacional-vale-peso-magaiba-bitcoin-criptomoneda-cotizacion-vale-dolar-precio-circulo-vicioso_0_nFGoEaQC11.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  El Litoral: Memecoin creado por argentinos en base al lagarto nacional
                </a>
              </li>
              <li>
                <a
                  href="https://actualidad.rt.com/actualidad/502277-criptomoneda-argentina-magaiba-surgir-meme-valor-subir-350-por-ciento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  RT: Criptomoneda argentina Magaiba surgir como meme y valor subir 350 por ciento
                </a>
              </li>
              <li>
                <a
                  href="https://www.iproup.com/economia-digital/46400-magaiba-la-memecoin-argentina-surgida-de-un-podcast-que-es-furor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  iProup: Magaiba, la memecoin argentina surgida de un podcast que es furor
                </a>
              </li>
              <li>
                <a
                  href="https://jpmas.com.ni/magaiba-la-memecoin-que-crecio-350-en-un-dia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  JP+: Magaiba, la memecoin que creció 350% en un día
                </a>
              </li>
              <li>
                <a
                  href="https://www.noticiasdebariloche.com.ar/magaiba-una-criptomoneda-argentina-se-dispara-por-el-impulso-de-su-comunidad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Noticias de Bariloche: Magaiba, una criptomoneda argentina se dispara por el impulso de su comunidad
                </a>
              </li>
              <li>
                <a
                  href="https://lajornadanet.com/mundo/criptomoneda-argentina-surgida-como-meme-sube-mas-de-350-en-un-dia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  La Jornada: Criptomoneda argentina surgida como meme sube más de 350% en un día
                </a>
              </li>
              <li>
                <a
                  href="https://www.cripto247.com/noticias-bitcoin/así-es-magaiba-la-meme-coin-argentina-que-subió-más-del-330-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Cripto247: Así es Magaiba, la meme coin argentina que subió más del 330%
                </a>
              </li>
              <li>
                <a
                  href="https://www.criptonoticias.com/mercados/magaiba-criptomoneda-argentina-dispara-impulso-comunidad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Criptonoticias: Magaiba, la criptomoneda argentina se dispara por el impulso de su comunidad
                </a>
              </li>
              <li>
                <a
                  href="https://www.criptotendencias.com/actualidad/magaiba-la-nueva-sensacion-de-las-memecoins-ya-disponible-en-ripio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Criptotendencias: Magaiba, la nueva sensación de las memecoins ya disponible en Ripio
                </a>
              </li>
              <li>
                <a
                  href="https://adnpositivo.com/magaiba-la-broma-que-se-volvio-viral-y-revoluciona-el-mundo-de-las-criptomonedas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  ADN Positivo: Magaiba, la broma que se volvió viral y revoluciona el mundo de las criptomonedas
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/reel/C4tqauuOgmv/?igsh=Yndmd3ExdWo0ZHEx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Instagram: Reel sobre Magaiba
                </a>
              </li>
              <li>
                <a
                  href="https://www.a24.com/crypto/magaiba-la-historia-la-memecoin-argentina-que-sacudio-el-mercado-criptomonedas-pocos-dias-n1306321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  A24: Magaiba, la historia de la memecoin argentina que sacudió el mercado de criptomonedas en pocos
                  días
                </a>
              </li>
              <li>
                <a
                  href="https://www.criptonoticias.com/mercados/desangra-magaiba-memecoin-lagarto-argentino/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan"
                >
                  Criptonoticias: Se desangra Magaiba, la memecoin del lagarto argentino
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
