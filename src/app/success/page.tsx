import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");

  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (!session || session.payment_status !== "paid") redirect("/");

  const order = await prisma.order.findUnique({
    where: { stripeSessionId: session_id },
    include: { downloads: true, items: { include: { product: true } } },
  });

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <p className="font-display text-xl text-walnut/60">Processing your order…</p>
        <p className="text-sm font-sans text-walnut/40 mt-2">Please check your email for the download link.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h1 className="font-display text-4xl font-light text-walnut mb-3">
          Thank you for your order
        </h1>
        <p className="text-sm font-sans text-walnut/50">
          Your files are ready to download below. A confirmation has been sent to{" "}
          <strong className="text-walnut/70">{order.customerEmail}</strong>.
        </p>
      </div>

      <div className="w-full h-px bg-linen mb-8" />

      <div className="space-y-3 mb-10">
        {order.items.map((item) => {
          const download = order.downloads.find((d) => d.fileName.includes(item.product.slug));
          return (
            <div key={item.id}
              className="flex items-center justify-between p-4 bg-linen/40 rounded-sm border border-linen"
            >
              <div>
                <p className="text-sm font-sans font-medium text-walnut">{item.product.name}</p>
                <p className="text-xs font-sans text-walnut/40">{item.product.category}</p>
              </div>
              {download ? (
                <a
                  href={`/api/download/${download.token}`}
                  className="flex items-center gap-1.5 text-xs font-sans font-medium text-sage hover:text-sage-dark transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
              ) : (
                <span className="text-xs font-sans text-walnut/30">Preparing…</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-rose-light/20 rounded-sm mb-8">
        <p className="text-xs font-sans text-walnut/60 leading-relaxed">
          Download links are valid for 48 hours. If you experience any issues, contact us via{" "}
          <a href="https://bloommerestudio.etsy.com" target="_blank" rel="noopener noreferrer"
            className="text-rose-dark underline underline-offset-2">
            Etsy
          </a>
          .
        </p>
      </div>

      <Link href="/shop" className="btn-secondary flex items-center justify-center gap-2 w-full">
        Continue Shopping <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
