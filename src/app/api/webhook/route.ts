import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      // The order is paid — handle digital delivery here.
      // Options:
      //   1. Send email with download links (e.g., via Resend)
      //   2. Store order in database with download tokens
      //   3. Use Stripe's built-in file delivery

      console.log("✅ Order completed:", {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
        productIds: session.metadata?.product_ids,
        amount: session.amount_total,
      });

      // TODO: implement email delivery
      // await sendOrderEmail({
      //   to: session.customer_details?.email!,
      //   productIds: session.metadata?.product_ids?.split(",") ?? [],
      // });

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn("❌ Payment failed:", paymentIntent.id);
      break;
    }

    default:
      // Ignore unhandled event types
      break;
  }

  return NextResponse.json({ received: true });
}
