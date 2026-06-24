"use client";
import { useState } from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
}

let listeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];

function dispatch(toast: Toast) {
  toasts = [...toasts, toast];
  listeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id);
    listeners.forEach((l) => l(toasts));
  }, 3000);
}

export function toast(t: Omit<Toast, "id">) {
  dispatch({ ...t, id: Math.random().toString(36).slice(2) });
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts);
  listeners.push(setState);
  return { toasts: state, toast };
}
