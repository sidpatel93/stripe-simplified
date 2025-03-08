import { httpRouter, HttpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();
const clerkWebHook = httpAction(async (ctx, req) => {
  const webhookSecret = process.env.CLERK_USER_CREATE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("CLERK_USER_CREATE_WEBHOOK_SECRET is not set");
  }
  const svix_id = req.headers.get("svix-id");
  const svix_signature = req.headers.get("svix-signature");
  const svix_timestamp = req.headers.get("svix-timestamp");

  if (!svix_id || !svix_signature || !svix_timestamp) {
    return new Response("Missing required svix headers", {
      status: 400,
    });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const webhook = new Webhook(webhookSecret);
  let webhookEvent: WebhookEvent;
  try {
    webhookEvent = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (e) {
    new Response("Error Occured", {
      status: 400,
    });
  }
  try {
  } catch (e) {}
});
http.route({
  path: "/clerk-userCreate-webhook",
  method: "POST",
  handler: clerkWebHook,
});

export default http;
