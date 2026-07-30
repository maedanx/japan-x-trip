import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localDevOrigins = Object.values(networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .filter(
    (network) =>
      network.family === "IPv4" &&
      !network.internal,
  )
  .map((network) => network.address);

const nextConfig: NextConfig = {
  // Allow the iPhone/Android browser on the same Wi-Fi to load the
  // Next.js development client and hydrate interactive React controls.
  allowedDevOrigins: localDevOrigins,
  images: {
    // Next.js 15+ defaults this to "attachment", which makes browsers
    // refuse to decode/paint optimized images used as inline <img> content
    // (naturalWidth/naturalHeight stay 0 even though the request succeeds).
    // Restore the pre-v15 "inline" behavior so next/image works for
    // on-page photos like the homepage Hero image.
    contentDispositionType: "inline",
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
