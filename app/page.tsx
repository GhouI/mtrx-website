"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainApp() {
  const router = useRouter();

  useEffect(() => {
    router.push("/overview");
  }, [router]);

  return <div>Hello</div>;
}
