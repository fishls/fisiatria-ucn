import TopAppBar from "./TopAppBar";
import BottomNavBar from "./BottomNavBar";

type AppShellProps = {
  children: React.ReactNode;
  /**
   * Controls which TopAppBar variant is rendered.
   * - "default": logo + desktop nav links + search icon (dashboards, search)
   * - "contextual": logo + notifications + avatar (resources, schedule)
   * - "back": back arrow + centered title + optional action (detail, profile)
   */
  topBar?: React.ReactNode;
  /**
   * Pass false to hide the BottomNavBar (e.g. on modal-like pages).
   */
  showBottomNav?: boolean;
  /**
   * Extra CSS classes applied to the <main> element.
   */
  mainClassName?: string;
};

/**
 * AppShell — the authenticated page wrapper.
 *
 * Usage:
 *   <AppShell topBar={<TopAppBar />}>
 *     <YourPageContent />
 *   </AppShell>
 *
 * If `topBar` is omitted, renders the default TopAppBar.
 */
export default function AppShell({
  children,
  topBar,
  showBottomNav = true,
  mainClassName,
}: AppShellProps) {
  return (
    <>
      {topBar ?? <TopAppBar />}

      <main
        className={[
          "pt-24 pb-32 px-6 max-w-screen-xl mx-auto",
          mainClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </main>

      {showBottomNav && <BottomNavBar />}
    </>
  );
}
