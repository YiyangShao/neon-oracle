// The single shipped theme: 深空墨色 (deep ink black).
// Other themes were design-time exploration only.

export type Accent = {
  fg: string;
  dim: string;
  glow: string;
};

export type Theme = {
  bg: string;
  bgGrad: string;
  bone: string;
  mute: string;
  accent: Accent;
};

export const INK: Theme = {
  bg: "#0c0a08",
  bgGrad:
    "radial-gradient(ellipse at 50% 35%, #1a1612 0%, #0c0a08 60%, #050403 100%)",
  bone: "#f3ebd8",
  mute: "#5c5448",
  accent: {
    fg: "#d4a85a",
    dim: "rgba(212,168,90,0.18)",
    glow: "rgba(212,168,90,0.18)",
  },
};

// CSS variables exposed at the app root so children can reference them
// without prop drilling.
export const cssVars: Record<string, string> = {
  "--bg": INK.bg,
  "--bone": INK.bone,
  "--mute": INK.mute,
  "--accent-fg": INK.accent.fg,
  "--accent-dim": INK.accent.dim,
  "--accent-glow": INK.accent.glow,
};
