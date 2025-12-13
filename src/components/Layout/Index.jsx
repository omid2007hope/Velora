import Header from "../Layout/Header/Header";

function withMenuLayout(WrappedComponent) {
  const HOC = (props) => (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-2 z-50 -translate-y-16 px-3 py-2 bg-white border border-amber-900 text-amber-950 rounded-md shadow focus:translate-y-0 focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" role="main" className="block focus:outline-none">
        <WrappedComponent {...props} />
      </main>
    </>
  );

  // For better debugging in React DevTools
  HOC.displayName = `WithMenuLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return HOC;
}
export default withMenuLayout;
