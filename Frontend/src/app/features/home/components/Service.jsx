import Image from "next/image";
import {
  ArrowPathIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import ServiceImage from "@/app/assets/image/S.webp";

const FEATURES = [
  {
    name: "Free shipping",
    description:
      "Orders move quickly and transparently, with shipping built to feel simple from checkout to delivery.",
    icon: TruckIcon,
  },
  {
    name: "10-year warranty",
    description:
      "Every piece is backed by a long warranty window, so you can shop with more confidence and less second-guessing.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Exchanges",
    description:
      "If sizing or style is not quite right, support can help you sort out exchange options without extra hassle.",
    icon: ArrowPathIcon,
  },
];

export default function Service() {
  return (
    <section className="border-b-2 border-amber-950 bg-orange-100 px-4 py-8 sm:px-6 lg:px-16 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-amber-950 sm:text-4xl">
            We built our business on great customer service
          </h2>
          <p className="mt-4 text-base text-amber-900">
            Thoughtful support, transparent policies, and reliable fulfillment
            are part of the experience we want every Velora customer to expect.
            The goal is a shopping journey that feels calm, clear, and easy to
            trust from the first visit to the final delivery.
          </p>
        </div>

        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            className="rounded-lg border-2 border-amber-950 object-cover shadow-md"
            src={ServiceImage}
            alt="Customer service desk"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

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
