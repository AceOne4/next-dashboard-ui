import Link from "next/link";
import React from "react";

type SsideLink = {
  id: number;
  title: string;
  color: string;
  href: string;
};

function PersonalSideLinks({ links }: { links: SsideLink[] }) {
  return (
    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
      {links.map((link) => (
        <Link
          key={link.id}
          className={`p-3 rounded-md`}
          href={link.href}
          style={{ backgroundColor: link.color }}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}

export default PersonalSideLinks;
