import Link from "next/link";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-zinc-100 font-sans">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-10 h-72 w-72 -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl" />
                <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
            </div>

            <div className="relative flex pt-20 items-center justify-center px-6">
                <div className="w-full max-w-7xl">
                    <div className="rounded-3xl bg-white p-8 shadow-sm backdrop-blur sm:p-10">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
                            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                            Lopsy.ai - Platform Learning Operating System
                        </div>

                        {/* Heading */}
                        <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-700 sm:text-5xl">
                            Bantu kamu <span className="text-green-400">kuasai materi</span> apapun!
                        </h1>

                        {/* Description */}
                        <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
                            kamu punya masalah berikut ini? {" "}
                        </p>
                        <ul>
                            <li>
                                <span className="font-medium text-zinc-800">Sulit mempelajari topik tertentu</span>
                            </li>
                            <li>
                                <span className="font-medium text-zinc-800">Kesulitan mengingat materi</span>
                            </li>
                            <li>
                                <span className="font-medium text-zinc-800">Dan masalah belajar lainnya</span>
                            </li>
                        </ul>

                        {/* Actions */}
                        <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">Tunggu apa lagi? coba gratis sekarang!</p>
                        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                            <Link href="/sign-up" className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-zinc-900/20">Sign Up</Link>

                            <Link
                                href="/sign-in"
                                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                            >
                                Sign in
                            </Link>
                        </div>

                        {/* Footer Hint */}
                        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                            <span className="rounded-full bg-zinc-100 px-3 py-1">Belajar</span>
                            <span className="rounded-full bg-zinc-100 px-3 py-1">Sistem Belajar</span>
                            <span className="rounded-full bg-zinc-100 px-3 py-1">Belajar Mudah</span>
                            <span className="ml-auto hidden sm:inline">
                                &copy; {new Date().getFullYear()}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
