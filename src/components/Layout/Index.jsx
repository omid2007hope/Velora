import Header from "./Header";

function withMenuLayout(WrappedComponent) {
  const HOC = (props) => (
    <>
      <Header />
      <WrappedComponent {...props} />
    </>
  );

  // For better debugging in React DevTools
  HOC.displayName = `WithMenuLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return HOC;
}
export default withMenuLayout;
