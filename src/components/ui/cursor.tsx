"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Position = {
  x: number;
  y: number;
};

type CursorProps = {
  name: string;
  optional: boolean;
};

const Cursor = ({ name, optional }: CursorProps) => {
  let pathRef = usePathname() as string;
  let pathName = pathRef.split("/")[1];

  const [mousePosition, setMousePosition] = useState<Position>({
    x: -50,
    y: -50,
  });

  useEffect(() => {
    let scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition: Position;

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
      lastPosition = {
        x: mousePosition.x,
        y: mousePosition.y,
      };
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
      className="custom-cursor absolute z-[100] hidden cursor-none flex-col items-center text-center sm:flex"
      style={{
        top: `${y + 5}px`,
        left: `${x + 5}px`,
      }}
    >
      <Image
        src={`https://api.cloudnouns.com/v1/pfp?background=n&body=n&accessory=n&text=${
          optional ? name : pathName
        }`}
        alt="custom-cursor"
        width={64}
        height={64}
        className="hidden h-16 w-16 drop-shadow-xl sm:block"
      />
    </div>
  );
};
export default Cursor;
