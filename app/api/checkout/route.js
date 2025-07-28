import crypto from "node:crypto";
import * as server from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "redis";

export async function POST(req) {
  const { email, data } = await req.json();

  if (!email || !data) {
    return server.NextResponse.json({ error: "Missing email or data" }, { status: 400 });
  }

  // generate random key for storing in redis
  const randomString = crypto.randomBytes(6).toString("hex");
  const key = `order:${randomString}`;

  const redis = createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}`,
    socket: { tls: true },
  });

  try {
    await redis.connect();
    await redis.set(key, data);
    await redis.quit();
  } catch {
    return server.NextResponse.json({ error: "Redis error" }, { status: 500 });
  }

  // send smtp mail
  const transporter = nodemailer.createTransport({
    host: "email-smtp.eu-north-1.amazonaws.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER_NAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "mailer@adithya.zip",
      to: email,
      subject: "Your receipt from simple-pos!",
      text: `Hi there!\n\nThanks for your order.\n\n- Here is your receipt: ${process.env.BASE_URL}/receipt?id=${randomString}`,
    });
  } catch {
    return server.NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return server.NextResponse.json({ success: true, key });
}
