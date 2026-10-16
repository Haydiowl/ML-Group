import { Container } from '../components/Container';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../motion/Reveal';
import { T_H } from '../motion/tokens';

/**
 * Join Newsletter — Figma `1088:3210`.
 * 1920×490.4, padding 50/80/100/80. Content 1200 wide, gap 44.
 * Form 550×168.8, gap 10, padding 23/24/24/24.
 */
export function JoinNewsletter() {
  return (
    <section id="newsletter" style={{ padding: 'var(--sp-9) 0 var(--sp-11)' }}>
      <Reveal variant="header" transition={T_H} className="heading-reveal">
        <Container variant="heading">
          <SectionHeading
            eyebrow="Get Notified"
            headingWidth={904.59}
            gap={9}
            segments={[{ text: 'Join our ' }, { text: 'Newsletter', accent: true }]}
            sub="Receive fragrance launches, scent guides, collection announcements and store updates."
            subClass="t-body muted"
          />
        </Container>
      </Reveal>

      <Container variant="heading">
        <div
          className="newsletter-form"
          style={{
            width: 'var(--w-form)',
            maxWidth: '100%',
            margin: '44px auto 0',
            background: 'var(--c-surface)',
            padding: '23px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <span className="t-body muted" style={{ paddingBottom: 0.8 }}>
            Email
          </span>

          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 40,
              background: 'var(--c-field)',
              padding: 12,
            }}
          >
            <input
              type="email"
              placeholder="example@gmail.com"
              aria-label="Email"
              style={{
                display: 'block',
                width: '100%',
                height: 16,
                border: 0,
                outline: 0,
                background: 'transparent',
                padding: 0,
                fontFamily: 'var(--f-alt)',
                fontSize: 14,
                lineHeight: '16.943px',
                color: 'var(--c-ink)',
              }}
            />
            <span aria-hidden className="hairline" />
          </div>

          <Reveal
            as="button"
            type="button"
            variant="pill"
            transition={T_H}
            style={{
              position: 'relative',
              width: '100%',
              height: 40,
              background: 'var(--c-dark)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <span className="t-body">Submit</span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}