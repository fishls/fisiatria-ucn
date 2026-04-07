// Public layout — no AppShell (no nav bars).
// Each public page manages its own wrapper (e.g. CenteredFormLayout).
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
