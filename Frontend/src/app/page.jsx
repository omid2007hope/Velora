"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./main/App"), { ssr: false });

export default function Home() {
  return <App />;
}
