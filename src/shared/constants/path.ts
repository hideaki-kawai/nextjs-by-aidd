/**
 * パス定数
 */
export const PATH = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;

export type Path = (typeof PATH)[keyof typeof PATH];
