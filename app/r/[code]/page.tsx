import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareViewer } from "@/components/ShareViewer";
import { decodeReading } from "@/lib/share";

// Open Graph / Twitter cards pull the user's question if there was one,
// or a sober default otherwise. Description excerpts the first oracle line.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const payload = decodeReading(code);
  if (!payload) return { title: "Neon Oracle · 神谕" };
  const first = payload.s[0]?.split(/[。.!?！？]/)[0] ?? "";
  return {
    title: payload.q ? `「${payload.q}」 · Neon Oracle` : "Neon Oracle · 神谕",
    description: first,
    openGraph: {
      title: payload.q ? `「${payload.q}」` : "Neon Oracle · 神谕",
      description: first,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: payload.q ? `「${payload.q}」` : "Neon Oracle · 神谕",
      description: first,
    },
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const payload = decodeReading(code);
  if (!payload) notFound();
  return <ShareViewer payload={payload} />;
}
