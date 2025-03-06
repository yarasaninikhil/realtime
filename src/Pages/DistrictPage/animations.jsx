
export const slideFromLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: '-100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 1.2, ease: 'easeOut' },
  },
});

export const slideFromRight = (delay = 0) => ({
  hidden: { opacity: 0, x: '-100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay, duration: 1.2, ease: 'easein' },
  },
});
