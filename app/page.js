"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [menu, setMenu] = useState(undefined);

  useEffect(() => {
    fetch("/api/dummySubwayStore")
      .then((res) => res.json())
      .then((jsonres) => setMenu(jsonres));
  }, []);

  return <div>{menu ? JSON.stringify(menu) : "loading"}</div>;
}
