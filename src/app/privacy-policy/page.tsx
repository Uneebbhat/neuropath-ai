import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NeuroPath AI",
  description:
    "Learn how NeuroPath AI collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">
        Effective Date: 24 January 2026
      </p>

      <section className="space-y-6">
        <p>
          Your privacy is important to us. This Privacy Policy explains how{" "}
          <strong>NeuroPath AI</strong> collects, uses, and protects your
          information.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>

        <h3 className="font-semibold">a. Information You Provide</h3>
        <ul className="list-disc pl-6">
          <li>Name and email address</li>
          <li>Account and onboarding information</li>
          <li>Learning goals and preferences</li>
        </ul>

        <h3 className="font-semibold">b. Automatically Collected Information</h3>
        <ul className="list-disc pl-6">
          <li>Usage behavior and interaction data</li>
          <li>Device and browser information</li>
          <li>IP address for security and analytics</li>
        </ul>

        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6">
          <li>Personalize learning experiences</li>
          <li>Improve platform performance</li>
          <li>Enhance AI-driven personalization</li>
          <li>Communicate important updates</li>
        </ul>

        <h2 className="text-xl font-semibold">3. AI & Data Usage</h2>
        <p>
          Learner interaction data may be processed by AI systems to improve
          personalization. We do not sell personal data and do not use it for
          purposes outside the scope of the platform.
        </p>

        <h2 className="text-xl font-semibold">4. Data Storage & Security</h2>
        <p>
          We use industry-standard security measures to protect your data.
          However, no system can guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold">5. Cookies & Analytics</h2>
        <p>
          NeuroPath AI may use cookies or similar technologies to improve user
          experience and analyze usage patterns.
        </p>

        <h2 className="text-xl font-semibold">6. Data Retention</h2>
        <p>
          We retain personal data only as long as necessary to provide the
          service or comply with legal obligations.
        </p>

        <h2 className="text-xl font-semibold">7. Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have the right to access,
          update, or request deletion of your personal data.
        </p>

        <h2 className="text-xl font-semibold">8. Children&apos;s Privacy</h2>
        <p>
          NeuroPath AI does not knowingly collect personal data from children
          under the age of 13.
        </p>

        <h2 className="text-xl font-semibold">
          9. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be
          published on this page.
        </p>

        <h2 className="text-xl font-semibold">10. Contact</h2>
        <p>
          For privacy-related questions, contact us at:{" "}
          <strong>uneebbhatti3@gmail.com</strong>
        </p>
      </section>
    </main>
  );
}
