import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    return null;
  }

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    gsap.set([cursor, cursorBorder], {
      xPercent: -50,
      yPercent: -50,
    });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

    const xToBorder = gsap.quickTo(cursorBorder, "x", { duration: 0.3, ease: "power3.out" });
    const yToBorder = gsap.quickTo(cursorBorder, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToBorder(e.clientX);
      yToBorder(e.clientY);
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.6, duration: 0.2 });
      gsap.to(cursorBorder, { scale: 1.5, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(cursorBorder, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[40px] h-[40px] border border-white rounded-full pointer-events-none z-[9999] opacity-50"
      />
    </>
  );
};

export default CustomCursor;