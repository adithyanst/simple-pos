import { NextResponse } from "next/server";
import { createClient } from "redis";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const redis = createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}`,
    socket: { tls: true },
  });

  await redis.connect();
  const cart = await redis.get(`order:${id}`);
  await redis.quit();
  return NextResponse.json({ cart });
}
