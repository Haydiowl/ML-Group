/**
 * Motion tokens.
 *
 * Every value here was recovered from the reference site's own bundle
 * (`framer:toplevel` source map, `framer-manifest`-published appear
 * animations) and cross-checked against high-frequency browser traces.
 * Do not "simplify" these to easings — the reference uses critically-damped
 * springs (bounce: 0), which have a long asymptotic tail that cubic-bezier
 * approximations do not reproduce.
 *
 * Framer resolves these springs to an 80-stop `linear()` curve; the resolved
 * string is kept in SPRING_LINEAR for verification against that output.
 */

/* --- Springs (all bounce: 0, i.e. critically damped) ------------------- */

export const spring = (duration: number, delay = 0) =>
  ({ type: 'spring', duration, bounce: 0, delay }) as const;

/** 800 ms — text reveals. The per-word stagger also supplies 75 ms. */
export const T_TEXT = spring(0.8);
/** Word stagger step. */
export const WORD_STAGGER = 0.075;

/** 1000 ms — block reveals, each with its own delay. */
export const T_H = spring(1, 0); //   section headers / feature blocks / blog cards
export const T_H_01 = spring(1, 0.1); //  About image
export const T_H_02 = spring(1, 0.2); //  product cards
export const T_H_03 = spring(1, 0.3); //  testimonial cards
export const T_H_04 = spring(1, 0.4); //  stat 1
export const T_H_05 = spring(1, 0.5); //  stats 2 & 3

/* --- Initial / final states ------------------------------------------- */

/** Text reveals start at 0.001, not 0 — the reference never fully hides text. */
export const fromText = { opacity: 0.001, y: 8 } as const;
export const toText = { opacity: 1, y: 0 } as const;

/** Large blocks start fully transparent. */
export const fromBlock = { opacity: 0, y: 100 } as const;
export const toBlock = { opacity: 1, y: 0 } as const;

/** Section headers also scale up from 0.8. */
export const fromHeader = { opacity: 0, scale: 0.8, y: 25 } as const;
export const toHeader = { opacity: 1, scale: 1, y: 0 } as const;

/** Medium blocks (feature blocks, CTA buttons). */
export const fromMid = { opacity: 0, y: 20 } as const;
export const toMid = { opacity: 1, y: 0 } as const;

export const fromCta = { opacity: 0, y: 28 } as const;
export const toCta = { opacity: 1, y: 0 } as const;

export const fromPill = { opacity: 0.001, y: 10 } as const;
export const toPill = { opacity: 1, y: 0 } as const;

/**
 * Mounted-state appear for the four category cards.
 * The reference staggers by column: left column 0.2 s, right column 0.3 s.
 */
export const CATEGORY_APPEAR_DELAY = [0.2, 0.2, 0.3, 0.3] as const;

/* --- Scroll-linked ------------------------------------------------------ */

/** Marquee travel per loop, and its constant speed (measured: −30 px/s). */
export const MARQUEE_LOOP = 324.5;
export const MARQUEE_SPEED = -30;

/** Smooth-scroll settle time (Lenis `duration`, measured ≈ 1.0 s). */
export const SCROLL_DURATION = 1.0;

/**
 * Resolved spring curve published by the reference in its
 * `<script type="framer/appear">` payload. Kept for verification only —
 * used by tests to confirm our spring output matches theirs.
 */
export const SPRING_LINEAR =
  'linear(0 0%, 0.0063 1.2658227848101267%, 0.0234 2.5316455696202533%, 0.0488 3.79746835443038%, 0.0805 5.063291139240507%, 0.1168 6.329113924050633%, 0.1562 7.594936708860759%, 0.1977 8.860759493670885%, 0.2404 10.126582278481012%, 0.2833 11.392405063291138%, 0.3261 12.658227848101264%, 0.3681 13.92405063291139%, 0.409 15.189873417721516%, 0.4487 16.455696202531644%, 0.4867 17.72151898734177%, 0.5231 18.987341772151897%, 0.5577 20.253164556962023%, 0.5904 21.51898734177215%, 0.6214 22.784810126582276%, 0.6504 24.050632911392402%, 0.6777 25.316455696202528%, 0.7032 26.582278481012654%, 0.727 27.84810126582278%, 0.7492 29.113924050632907%, 0.7698 30.379746835443033%, 0.7889 31.64556962025316%, 0.8066 32.91139240506329%, 0.8229 34.177215189873415%, 0.838 35.44303797468354%, 0.852 36.70886075949367%, 0.8648 37.974683544303794%, 0.8766 39.24050632911392%, 0.8874 40.506329113924046%, 0.8974 41.77215189873417%, 0.9065 43.0379746835443%, 0.9148 44.303797468354425%, 0.9225 45.56962025316455%, 0.9295 46.83544303797468%, 0.9359 48.101265822784804%, 0.9417 49.36708860759493%, 0.9471 50.632911392405056%, 0.952 51.89873417721518%, 0.9564 53.16455696202531%, 0.9604 54.430379746835435%, 0.9641 55.69620253164556%, 0.9675 56.96202531645569%, 0.9705 58.22784810126581%, 0.9733 59.49367088607594%, 0.9758 60.759493670886066%, 0.9781 62.02531645569619%, 0.9802 63.29113924050632%, 0.9821 64.55696202531645%, 0.9838 65.82278481012658%, 0.9853 67.0886075949367%, 0.9867 68.35443037974683%, 0.988 69.62025316455696%, 0.9892 70.88607594936708%, 0.9902 72.15189873417721%, 0.9912 73.41772151898734%, 0.992 74.68354430379746%, 0.9928 75.94936708860759%, 0.9935 77.21518987341771%, 0.9941 78.48101265822784%, 0.9947 79.74683544303797%, 0.9952 81.01265822784809%, 0.9957 82.27848101265822%, 0.9961 83.54430379746834%, 0.9965 84.81012658227847%, 0.9968 86.0759493670886%, 0.9971 87.34177215189872%, 0.9974 88.60759493670885%, 0.9977 89.87341772151898%, 0.9979 91.1392405063291%, 0.9981 92.40506329113923%, 0.9983 93.67088607594935%, 0.9985 94.93670886075948%, 0.9986 96.20253164556961%, 0.9988 97.46835443037973%, 0.9989 98.73417721518987%, 1 100%)';