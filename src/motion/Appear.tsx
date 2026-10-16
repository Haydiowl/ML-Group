import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fromBlock, toBlock } from './tokens';

/**
 * Mount-triggered entrance — plays once on page load, independent of scroll.
 * Used for the hero heading words and the four category cards.
 *
 * `initial={false}` would mean "no animation", so we instead start from
 * `initial` and animate to `toBlock`. Crucially the *final* state is the
 * resting CSS state: if motion never mounts (JS disabled, bundle blocked,
 * reduced motion) the element renders at full opacity and its natural
 * position, so content can never be left invisible.
 */
export function Appear({
  children,
  transition,
  delay = 0,
  as = 'div',
  className,
  style,
  href,
  initial = fromBlock,
}: {
  children: ReactNode;
  transition: object;
  delay?: number;
  as?: 'div' | 'li' | 'span' | 'p' | 'a';
  className?: string;
  style?: CSSProperties;
  href?: string;
  initial?: object;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as unknown as ElementType;

  return (
    <Tag
      href={href}
      className={className}
      style={style}
      initial={reduced ? false : (initial as never)}
      animate={toBlock as never}
      transition={reduced ? { duration: 0 } : ({ ...(transition as object), delay } as never)}
    >
      {children}
    </Tag>
  );
}