import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const productIds = session.metadata?.productIds?.split(",") ?? [];
    const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        customerEmail,
        totalAmount: (session.amount_total ?? 0) / 100,
        currency: session.currency ?? "usd",
        status: "PAID",
        items: {
          create: products.map((p) => ({
            productId: p.id,
            price: p.price,
            quantity: 1,
          })),
        },
      },
    });

    // Generate download tokens (48h expiry)
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
    await prisma.download.createMany({
      data: products.map((p) => ({
        orderId: order.id,
        fileKey: `downloads/${p.slug}.zip`,
        fileName: `${p.slug}-print.zip`,
        expiresAt,
      })),
    });

    console.log(`✅ Order ${order.id} created for ${customerEmail}`);
  } catch (err) {
    console.error("Error processing checkout:", err);
  }
}
