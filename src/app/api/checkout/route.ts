import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    // Validate products exist
    const productIds: string[] = items.map((i: { id: string }) => i.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: "Some products not found" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    // Build Stripe line items
    const lineItems = products.map((p) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: p.name,
          description: `${p.category} · Digital Download`,
          metadata: { productId: p.id, slug: p.slug },
        },
        unit_amount: Math.round(p.price * 100),
      },
      quantity: 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop`,
      metadata: {
        productIds: productIds.join(","),
      },
      customer_creation: "always",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
