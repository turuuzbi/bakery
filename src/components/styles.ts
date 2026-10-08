/** Shared class lists so buttons and cards stay consistent. */

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-bold whitespace-nowrap transition duration-200 ease-out select-none";

export const button = {
  primary: `${buttonBase} bg-forest text-cream hover:bg-forest-deep motion-safe:hover:-translate-y-0.5`,
  secondary: `${buttonBase} bg-cream-soft text-forest ring-1 ring-forest/25 hover:bg-white hover:ring-forest/50 motion-safe:hover:-translate-y-0.5`,
  viber: `${buttonBase} bg-viber text-white hover:bg-viber-deep`,
  onDark: `${buttonBase} bg-cream text-forest hover:bg-white`,
  outlineOnDark: `${buttonBase} text-cream ring-1 ring-cream/40 hover:bg-cream/10 hover:ring-cream/70`,
};

export const card = "rounded-3xl bg-cream-soft shadow-soft ring-1 ring-ink/5";
