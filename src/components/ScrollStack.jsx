import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card relative w-full rounded-[40px] shadow-2xl origin-top will-change-transform transition-opacity duration-300 ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            opacity: 0
        }}
    >
        {children}
    </div>
);

const ScrollStack = ({
                         children,
                         itemStackDistance = 15, // How much of the card border is visible at the top
                         stackPosition = '12%',   // Where the cards "pin" on the screen
                         baseScale = 0.98,        // Keeps cards large (User requested less scaling)
                         blurAmount = 3,          // How much the underneath cards blur
                     }) => {
    const scrollerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length) return;

        const scrollTop = window.scrollY;
        const containerHeight = window.innerHeight;
        const stackPositionPx = (parseFloat(stackPosition) / 100) * containerHeight;

        const endElement = document.querySelector('.scroll-stack-end');
        const endElementTop = endElement ? endElement.getBoundingClientRect().top + window.scrollY : 0;

        let activeIndex = 0;
        cardsRef.current.forEach((card, i) => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top <= stackPositionPx + (i * itemStackDistance) + 20) {
                activeIndex = i;
            }
        });

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = card.getBoundingClientRect().top + window.scrollY - (lastTransformsRef.current.get(i)?.translateY || 0);
            const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
            const pinEnd = endElementTop - 500;

            // Faster fade in
            const fadeInProgress = Math.min(Math.max((scrollTop - (pinStart - 150)) / 150, 0), 1);
            card.style.opacity = fadeInProgress;

            // Pinning logic
            let translateY = 0;
            if (scrollTop >= pinStart && scrollTop <= pinEnd) {
                translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
            }

            const depth = activeIndex - i;
            const isUnderneath = depth > 0;

            const blur = isUnderneath ? depth * blurAmount : 0;
            const scale = isUnderneath ? Math.pow(baseScale, depth) : 1;

            const newTransform = { translateY, scale, blur };
            const last = lastTransformsRef.current.get(i);

            if (!last || Math.abs(last.translateY - translateY) > 0.1 || last.blur !== blur || last.scale !== scale) {
                card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
                card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
                card.style.zIndex = i + 10;
                lastTransformsRef.current.set(i, newTransform);
            }
        });
    }, [itemStackDistance, stackPosition, baseScale, blurAmount]);

    useLayoutEffect(() => {
        const lenis = new Lenis({ lerp: 0.12, duration: 1, smoothWheel: true });

        const raf = (time) => {
            lenis.raf(time);
            updateCardTransforms();
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);

        const cards = Array.from(scrollerRef.current.querySelectorAll('.scroll-stack-card'));
        cardsRef.current = cards;

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            lenis.destroy();
        };
    }, [updateCardTransforms]);

    return (
        <div className="relative w-full" ref={scrollerRef}>
            {/* Reduced bottom padding to make the section feel shorter */}
            <div className="scroll-stack-inner pt-2 pb-[10vh]">
                {/* Gap 12vh makes cards appear faster as you scroll */}
                <div className="flex flex-col gap-[12vh] items-center">
                    {children}
                </div>
                <div className="scroll-stack-end w-full h-px" />
            </div>
        </div>
    );
};

export default ScrollStack;