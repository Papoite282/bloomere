"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, ...props }) => (
        <Toast key={id} {...props}
          className="bg-walnut text-cream p-4 rounded-sm shadow-lg flex gap-3 items-start border border-white/10"
        >
          <div>
            {title && <ToastTitle className="text-sm font-sans font-medium">{title}</ToastTitle>}
            {description && <ToastDescription className="text-xs font-sans text-cream/60 mt-1">{description}</ToastDescription>}
          </div>
          <ToastClose className="ml-auto text-cream/40 hover:text-cream" />
        </Toast>
      ))}
      <ToastViewport className="fixed bottom-4 right-4 flex flex-col gap-2 z-[60] max-w-sm" />
    </ToastProvider>
  );
}
