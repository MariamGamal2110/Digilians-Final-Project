function App() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-primary">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center">
        <section className="grid w-full gap-8 rounded-[2rem] border border-accent/70 bg-white/70 p-8 shadow-2xl shadow-primary/10 backdrop-blur md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-accent bg-accent/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
              Final Project
            </p>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-primary sm:text-5xl">
                React JSX and Tailwind CSS are fully configured and ready for development.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-secondary">
                This starter screen verifies the setup with semantic palette tokens,
                Vite hot reload, PostCSS, and Tailwind utilities wired into the app.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background">
                bg-primary
              </span>
              <span className="rounded-full border border-accent px-4 py-2 text-sm font-semibold text-secondary">
                text-secondary
              </span>
              <span className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary">
                bg-accent
              </span>
              <span className="rounded-full border border-secondary px-4 py-2 text-sm font-semibold text-primary">
                border-secondary
              </span>
            </div>
          </div>

          <aside className="flex flex-col justify-between rounded-[1.5rem] bg-primary p-6 text-background">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-accent">
                Setup checklist
              </p>
              <ul className="space-y-3 text-sm leading-7 text-background/90">
                <li>React 19 with Vite JSX scaffold</li>
                <li>Tailwind CSS with PostCSS and Autoprefixer</li>
                <li>Semantic color tokens mapped in Tailwind config</li>
                <li>Build and dev startup verified locally</li>
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-background/20 bg-background/10 p-4">
              <p className="text-sm text-background/75">Palette preview</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                <div className="h-14 rounded-xl bg-primary" title="primary" />
                <div className="h-14 rounded-xl bg-secondary" title="secondary" />
                <div className="h-14 rounded-xl bg-accent" title="accent" />
                <div className="h-14 rounded-xl bg-background" title="background" />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default App
