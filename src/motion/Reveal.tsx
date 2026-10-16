import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { registerPending, unregisterPending } from './revealSafety';
import {
  fromBlock,
  fromCta,
  fromHeader,
  fromMid,
  fromPill,
  fromText,
  toBlock,
  toCta,
  toHeader,
  toMid,
  toPill,
  toText,
} from './tokens';

const VARIANTS = {
  block: [fromBlock, toBlock],
  header: [fromHeader, toHeader],
  mid: [fromMid, toMid],
  cta: [fromCta, toCta],
  pill: [fromPill, toPill],
  text: [fromText, toText],
} as const;

export type RevealVariant = keyof typeof VARIANTS;

type Props = {
  children: ReactNode;
  transition: object;
  variant?: RevealVariant;
  delay?: number;
  /**
   * Fraction of the element that must be visible before it fires.
   * Default 0 = `amount: 'some'` on the reference, i.e. fires as soon as
   * any part of the element crosses the viewport.
   */
  amount?: number;
  as?: 'div' | 'li' | 'span' | 'a' | 'p' | 'button';
  className?: string;
  style?: CSSProperties;
  href?: string;
  /** Only meaningful when as="button". */
  type?: 'button' | 'submit' | 'reset';
  /** Hides a decorative duplicate from assistive tech. */
  'aria-hidden'?: true;
  /** Click handler; receives the event so modified clicks can be ignored. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Accessible name for icon-only or composite controls. */
  'aria-label'?: string;
};

/**
 * Viewport-triggered entrance.
 *
 * Fires once when the element crosses `amount`, matching the reference's
 * `whileInView` + `amount: 'some'` + `once: true` behaviour: scrolling back
 * up does NOT replay it.
 *
 * The resting state is the element's natural CSS state (opacity 1, no
 * transform). The hidden start state is only applied once Motion has
 * mounted and the element is still below the fold, so a JS failure or a
 * blocked bundle can never leave content invisible.
 *
 * Only `transform` (x/y/scale) and `opacity` are animated — nothing that
 * triggers layout.
 */
export const Reveal = forwardRef<HTMLElement, Props>(function Reveal(
  { children, transition, variant = 'block', delay = 0, amount = 0, as = 'div', className, style, href, type, onClick, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden },
  forwardedRef,
) {
  const localRef = useRef<HTMLElement>(null);
  const ref = (forwardedRef ?? localRef) as React.RefObject<HTMLElement>;
  const inView = useInView(ref, { once: true, amount });
  const reduced = useReducedMotion();

  const [from, to] = VARIANTS[variant];
  const [forced, setForced] = useState(false);

  // Safety net: if we scroll past an element before its observer fires,
  // reveal it rather than leaving it at opacity 0.
  useEffect(() => {
    const el = ref.current;
    if (inView || reduced || !el) return;
    registerPending(el, () => setForced(true));
    return () => unregisterPending(el);
  }, [inView, reduced, ref]);

  const shown = reduced || inView || forced;
  const Tag = motion[as] as unknown as ElementType;

  // Promote the layer only for the duration of the entrance. A permanent
  // will-change on every reveal keeps dozens of GPU layers alive for the life
  // of the page, which is the thing the stylesheet comment warns against.
  const handleStart = () => {
    if (ref.current) ref.current.style.willChange = 'transform, opacity';
  };
  const handleComplete = () => {
    if (ref.current) ref.current.style.willChange = 'auto';
  };

  return (
    <Tag
      ref={ref}
      href={href}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={className}
      style={style}
      animate={shown ? to : from}
      transition={
        reduced ? { duration: 0 } : ({ ...(transition as object), delay } as never)
      }
      onAnimationStart={reduced ? undefined : handleStart}
      onAnimationComplete={reduced ? undefined : handleComplete}
    >
      {children}
    </Tag>
  );
});