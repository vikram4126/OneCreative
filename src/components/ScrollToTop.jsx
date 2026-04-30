import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Immediate reset (auto behavior)
    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      
      const scroller = document.getElementById('main-scroller');
      if (scroller) scroller.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    reset();

    // 2. Series of timeouts to catch post-render jumps
    const timers = [10, 50, 100, 300, 500, 1000].map(delay => 
      setTimeout(reset, delay)
    );

    // 3. Force scroll restoration to manual if possible
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
