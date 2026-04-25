import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-line/60 bg-canvas/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <svg
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
            aria-hidden="true"
          >
            <rect x="6" y="2" width="18" height="5" rx="2" fill="#000000" />
            <rect x="0" y="10" width="18" height="8" rx="2.5" fill="#000000" />
          </svg>
          <span className="font-medium text-[20px] tracking-tight text-ink leading-none">
            Peec AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px] text-ink/80">
          <a className="hover:text-ink" href="#">Pricing</a>
          <a className="hover:text-ink" href="#">Resources</a>
          <a className="hover:text-ink" href="#">Partnerships</a>
          <a className="hover:text-ink" href="#">Careers</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="px-4 h-9 text-[14px] rounded-lg hover:bg-ink/5 transition">
            Log in
          </button>
          <button className="px-4 h-9 text-[14px] rounded-lg bg-ink text-white hover:bg-ink/90 transition">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
