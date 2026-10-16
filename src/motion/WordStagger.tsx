import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { T_TEXT, WORD_STAGGER, fromText, toText } from './tokens';

type Segment = { text: string; accent?: boolean };

type Word = {
  kind: 'word';
  text: string;
  accent: boolean;
  /** Separator rendered immediately after this word. */
  sep: ' ' | '\n' | null;
};

type Token = Word | { kind: 'line' };

/**
 * Word-by-word text reveal, matching the reference's
 * `tokenization: 'word'` effect: each word fades up 8px over 800 ms with a
 * 75 ms stagger, all on mount.
 *
 * Splitting is on whitespace only and the rendered characters are identical
 * to the Figma string, so with motion disabled the heading still reads
 * correctly and wraps the same way.
 *
 * The reference wraps accent-coloured runs in a coloured grouping span whose
 * words are each individually animated, e.g. the hero renders as
 *   "Find Your" + <span class="accent">"Signature"</span> + "Scent."
 * This reproduces that nesting so both the colour and the per-word
 * animation boundaries match.
 */
export function WordStagger({
  text,
  segments,
  className,
  style,
}: {
  /** Plain-text heading. Mutually exclusive with `segments`. */
  text?: string;
  /** Heading runs, with accent runs highlighted like `SectionHeading`. */
  segments?: Segment[];
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();

  const source: Segment[] = segments ?? (text !== undefined ? [{ text }] : []);

  // Flatten to words carrying their trailing separator, so the original
  // string (including explicit line breaks) can be rebuilt exactly.
  const tokens: Token[] = [];
  source.forEach((seg, si) => {
    const lines = seg.text.split('\n');
    lines.forEach((line, li) => {
      const parts = line.split(' ');
      parts.forEach((w, wi) => {
        const isLastWordOfLine = wi === parts.length - 1;
        const sep =
          !isLastWordOfLine ? ' ' : li < lines.length - 1 ? '\n' : null;
        if (w !== '' || sep !== null) {
          tokens.push({ kind: 'word', text: w, accent: seg.accent === true, sep });
        }
      });
      if (line === '' && li < lines.length - 1) tokens.push({ kind: 'line' });
    });
    // Re-insert the space that falls on a segment boundary.
    if (si < source.length - 1 && !seg.text.endsWith(' ') && !source[si + 1].text.startsWith(' ')) {
      const last = tokens[tokens.length - 1];
      if (last && last.kind === 'word' && last.sep === null) last.sep = ' ';
    }
  });

  let wordIndex = 0;

  const separator = (sep: Word['sep'], key: string) =>
    sep === '\n' ? <br key={key} /> : sep === ' ' ? <Fragment key={key}> </Fragment> : null;

  const renderWord = (word: Word) => {
    const index = wordIndex++;
    return (
      <Fragment key={`w${index}`}>
        <motion.span
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={reduced ? false : (fromText as never)}
          animate={toText as never}
          transition={
            reduced ? { duration: 0 } : ({ ...T_TEXT, delay: index * WORD_STAGGER } as never)
          }
        >
          {word.text}
        </motion.span>
        {separator(word.sep, `s${index}`)}
      </Fragment>
    );
  };

  // Group consecutive accent words so they share one coloured wrapper.
  const nodes: ReactNode[] = [];
  let i = 0;
  while (i < tokens.length) {
    const tok = tokens[i];
    if (tok.kind === 'line') {
      i++;
      continue;
    }
    if (tok.accent) {
      const group: ReactNode[] = [];
      let key = `a${i}`;
      while (i < tokens.length) {
        const t = tokens[i];
        if (t.kind !== 'word' || !t.accent) break;
        group.push(renderWord(t));
        i++;
      }
      nodes.push(
        <span className="accent" key={key}>
          {group}
        </span>,
      );
      continue;
    }
    nodes.push(renderWord(tok));
    i++;
  }

  return (
    <span className={className} style={style}>
      {nodes}
    </span>
  );
}