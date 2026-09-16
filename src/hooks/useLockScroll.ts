import { useEffect, useRef } from 'react'

const locks = new Set<symbol>()

export function useLockScroll(locked: boolean) {
    const id = useRef(Symbol())

    useEffect(() => {
        if (!locked) return

        const lockId = id.current

        if (locks.size === 0) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
            document.body.classList.add('scroll-locked');
        }

        locks.add(lockId)

        return () => {
            locks.delete(lockId)

            if (locks.size === 0) {
                document.documentElement.style.removeProperty('--scrollbar-width');
                document.body.classList.remove('scroll-locked');
            }
        }
    }, [locked])
}