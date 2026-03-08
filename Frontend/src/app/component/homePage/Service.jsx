// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import React from "react";
import Image from "next/image";
import {
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import S from "../../assets/image/S.webp";

const FEATURES = [
  {
    name: "Free shipping",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    icon: TruckIcon,
  },
  {
    name: "10-year warranty",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Exchanges",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    icon: ArrowPathIcon,
  },
];

export default function Service() {
  return (
    <section className="border-b-2 border-amber-950 bg-orange-100 px-4 py-8 sm:px-6 lg:px-16 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold text-amber-950 sm:text-4xl">
            We built our business on great customer service
          </h2>
          <p className="mt-4 text-base text-amber-900">
            At the beginning at least, but then we realized we could make a lot
            more money if we kinda stopped caring about that. Our new strategy
            is to write a bunch of things that look really good in the
            headlines, then clarify in the small print but hope people don't
            actually read it.
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96">
          <Image
            className="rounded-lg border-2 border-amber-950 object-cover shadow-md"
            src={S}
            alt="Customer service desk"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.name}
              role="article"
              className="flex items-start space-x-4 rounded-xl border-2 border-amber-950 bg-orange-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Icon className="h-8 w-8 flex-shrink-0 text-amber-950" />
              <div>
                <h3 className="text-md font-semibold text-amber-900">
                  {feature.name}
                </h3>
                <p className="mt-1 text-sm text-amber-900">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
