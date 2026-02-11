import Link from "next/link"

export default function Header() {
  return (
    <header className="py-4 border-b border-neon-green">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-cyber text-neon-green mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="mr-2 w-10 h-10 border border-neon-green flex items-center justify-center">
              <span className="text-neon-green">T.P</span>
            </div>
            <span className="glitch" data-text="TOMÁS_PERÓ">
              TOMÁS_PERÓ
            </span>
            <span className="ml-2 text-neon-cyan text-sm">[v2.5]</span>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="https://www.linkedin.com/in/tomaspero"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-button"
              >
                LINKEDIN
              </a>
            </li>
            <li>
              <a href="mailto:tomaspero@gmail.com" className="nav-button">
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
