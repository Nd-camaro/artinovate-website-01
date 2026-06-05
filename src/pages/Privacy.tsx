import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { motion } from "framer-motion";

export default function Privacy() {
  useDocumentHead({
    title: "Privacy Policy | ArtiNovate",
    description: "ArtiNovate Privacy Policy — how we handle information on artinovate.com.",
    canonicalUrl: "https://www.artinovate.com/privacy",
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      <main className="pt-24 lg:pt-32 pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="text-sm text-[#888888] hover:text-[#00D4D4] transition-colors duration-200 inline-flex items-center gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <div className="w-16 h-1 bg-[#00D4D4] mb-4" />
            <p className="text-[#888888] text-sm">
              <span className="text-white font-semibold">ArtiNovate</span>
              <span className="mx-2">|</span>
              Last updated: June 5, 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                1. Overview
              </h2>
              <p className="text-[#888888] leading-relaxed">
                ArtiNovate ("we," "us," or "our") operates artinovate.com. This Privacy Policy explains how we handle information in connection with your use of our website.
              </p>
              <p className="text-[#888888] leading-relaxed mt-4">
                We do not collect, store, or process personal information directly. However, third-party tools embedded on our site may collect certain data as described below.
              </p>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                2. Information We Do Not Collect
              </h2>
              <p className="text-[#888888] leading-relaxed">
                We do not operate contact forms, user accounts, or any direct data collection mechanism on this website. We do not collect your name, email address, or any personal information ourselves.
              </p>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                3. Third-Party Tools
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Calendly</h3>
                <p className="text-[#888888] leading-relaxed">
                  When you book a consultation through our website, you interact with a Calendly widget embedded on our site. Calendly may collect your name, email address, and other information you provide during booking. This data is collected and processed by Calendly, Inc. under their own Privacy Policy, available at{" "}
                  <a
                    href="https://calendly.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D4D4] hover:underline"
                  >
                    calendly.com/privacy
                  </a>
                  .
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Voiceflow</h3>
                <p className="text-[#888888] leading-relaxed">
                  Our website includes an AI chat assistant powered by Voiceflow. Conversations you have with the assistant may be processed by Voiceflow. Data collected through this widget is handled by Voiceflow Inc. under their Privacy Policy, available at{" "}
                  <a
                    href="https://voiceflow.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D4D4] hover:underline"
                  >
                    voiceflow.com/privacy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Lovable</h3>
                <p className="text-[#888888] leading-relaxed">
                  This website is built and hosted on the Lovable platform. Lovable may collect standard usage and analytics data such as page visits and browser information. This is handled by Lovable under their own Privacy Policy.
                </p>
              </div>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                4. Data We Store
              </h2>
              <p className="text-[#888888] leading-relaxed">
                We use Supabase to store blog post content and media assets displayed on this website. This database contains no personal information belonging to visitors or users.
              </p>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                5. Cookies
              </h2>
              <p className="text-[#888888] leading-relaxed">
                We do not set cookies directly. Third-party embeds such as Calendly and Voiceflow may set their own cookies in accordance with their respective privacy policies.
              </p>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                6. Links to Other Websites
              </h2>
              <p className="text-[#888888] leading-relaxed">
                Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.
              </p>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-[#888888] leading-relaxed">
                We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <hr className="border-[#00D4D4]/20 mb-12" />

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-4">
                8. Contact
              </h2>
              <p className="text-[#888888] leading-relaxed mb-2">
                For any questions regarding this policy, contact us at:
              </p>
              <a
                href="mailto:ndnwankwo01@gmail.com"
                className="text-[#00D4D4] hover:underline text-lg"
              >
                ndnwankwo01@gmail.com
              </a>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
