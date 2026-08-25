"use client";

import { useState } from "react";
import Image from "next/image";
import StatsBar from "@/components/StatsBar";
import PledgeModal from "@/components/PledgeModal";
import FloatingStatCard from "@/components/FloatingStatCard";

// Edit this block to change the mission statement copy shown in the hero.
const MISSION = {
  eyebrow: "A pledge, not a payment",
  heading: "Put your name behind something worth building.",
  highlight: "worth building.",
  body: "Every pledge is a vote of confidence in what we're setting out to do. Tell us what you're willing to commit. We'll only ask you to follow through once we're ready to deliver.",
};

const TRUST_POINTS = [
  "No payment taken today",
  "Takes under a minute",
  "You choose the amount",
];

export default function LandingClient() {
  const [modalOpen, setModalOpen] = useState(false);

  const [beforeHighlight] = MISSION.heading.split(MISSION.highlight);

  return (
    <>
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:min-h-[600px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-20 xl:px-24">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <span className="h-px w-8 bg-emerald-500" />
              {MISSION.eyebrow}
            </div>

            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 leading-[1.1] sm:text-5xl lg:text-6xl">
              {beforeHighlight}
              <span className="text-emerald-600">{MISSION.highlight}</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
              {MISSION.body}
            </p>

            <div className="mt-9 flex flex-col items-start gap-5">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-md bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Make a pledge
              </button>

              <p className="text-sm text-slate-500">
                {TRUST_POINTS.join("  ·  ")}
              </p>
            </div>
          </div>

          <div className="relative min-h-[360px] lg:min-h-0">
            <Image
              src="/hero.jpg"
              alt="A group of people joining hands in a show of shared commitment"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto">
              <FloatingStatCard />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <StatsBar />
        </div>
      </div>

      <PledgeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
