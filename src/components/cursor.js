"use client";

import { useEffect, useState } from "react";

const Cursor = ({ name }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition = null;

    function transformPosition(cursor) {
      return {
        x: cursor.x / window.innerWidth,
        y: cursor.y,
      };
    }

    function onPointerMove(event) {
      event.preventDefault();
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;

      setMousePosition({
        x: position.x,
        y: position.y,
      });
    }

    function onPointerLeave() {
      lastPosition = null;
      setMousePosition({
        x: -100,
        y: -100,
      });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        setMousePosition({
          x: position.x,
          y: position.y,
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const { x, y } = mousePosition;

  return (
    <div
      className="custom-cursor absolute z-[100] flex cursor-none flex-col items-center text-center"
      style={{
        top: `${y + 5}px`,
        left: `${x + 5}px`,
      }}
    >
      <img
        src={`https://api.cloudnouns.com/v1/pfp?background=n&body=n&accessory=n&text=${name}`}
        className="h-16 w-16 drop-shadow-xl"
      />
    </div>
  );
};
export default Cursor;
