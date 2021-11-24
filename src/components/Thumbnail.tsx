import React from "react";

export default function Thumbnail({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <img style={{ flex: 1 }} width="50" height="auto" src={src} alt={name} />
  );
}
