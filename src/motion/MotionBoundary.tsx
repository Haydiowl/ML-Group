import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Guards every animated element.
 *
 * The hidden start states (opacity 0, translateY) are applied imperatively
 * by Motion at runtime. If the animation layer throws for any reason — a
 * runtime error inside a spring, a browser without the needed APIs, a
 * partially loaded bundle — those inline styles would be left applied and
 * the content would stay invisible.
 *
 * On failure this renders its children plainly and force-restores visibility,
 * so a broken animation degrades to a static page rather than a blank one.
 */
export class MotionBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surfaced for debugging; never blocks rendering.
    console.warn('[motion] animation layer failed, falling back to static render:', error.message, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return <div className="motion-fallback">{this.props.children}</div>;
  }
}