import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Check user's motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Reusable smooth animations
export const fadeInStagger = (
  targets: gsap.DOMTarget,
  options: gsap.TweenVars = {}
) => {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  return gsap.from(targets, {
    opacity: 0,
    y: 24,
    duration: 0.7,
    stagger: 0.12,
    ease: "power3.out",
    ...options,
  });
};

export const heroReveal = (
  container: gsap.DOMTarget,
  elements: gsap.DOMTarget
) => {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, scope: container as any });
  tl.from(elements, {
    opacity: 0,
    y: 36,
    duration: 0.9,
    stagger: 0.15,
  });
  return tl;
};

export { gsap, useGSAP };
