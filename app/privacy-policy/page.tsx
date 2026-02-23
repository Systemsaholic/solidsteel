import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Solid Steel Management. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Solid Steel Management",
    description:
      "Privacy Policy for Solid Steel Management. Learn how we collect, use, and protect your personal information.",
    url: "https://solidsteelmgt.ca/privacy-policy",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solid Steel Management Privacy Policy",
      },
    ],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100">
              Your privacy matters to us. This policy explains how Solid Steel
              Management collects, uses, and protects your personal information.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-gray prose-headings:text-blue-700">
            <p className="text-gray-500 text-sm mb-8">
              Effective Date: February 23, 2026
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-6">
              Solid Steel Management (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is a commercial construction company based in
              Eastern Ottawa, Ontario, Canada. We are committed to protecting
              the privacy of individuals who visit our website at
              solidsteelmgt.ca and who interact with our services. This Privacy
              Policy describes what personal information we collect, how we use
              it, and the choices available to you.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              2.1 Information You Provide
            </h3>
            <p className="text-gray-700 mb-4">
              When you fill out a contact form, request a quote, submit a
              proforma budget consultation request, or sign up for our
              newsletter, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or organization name</li>
              <li>Project details and descriptions</li>
              <li>Any other information you choose to include in your message</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              2.2 Information Collected Automatically
            </h3>
            <p className="text-gray-700 mb-4">
              When you visit our website, certain information is collected
              automatically through cookies and similar technologies, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URL</li>
              <li>Pages viewed and time spent on the site</li>
              <li>Device information</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                To respond to your inquiries and provide information about our
                commercial construction services
              </li>
              <li>To prepare quotes, estimates, and proforma budget consultations</li>
              <li>
                To communicate with you regarding projects, services, and
                updates
              </li>
              <li>
                To send newsletters and marketing communications, where you have
                opted in to receive them
              </li>
              <li>
                To improve our website, services, and overall user experience
              </li>
              <li>
                To analyze website traffic and usage patterns for operational
                and performance improvements
              </li>
              <li>To comply with applicable legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-4">
              Our website uses cookies and similar technologies to enhance your
              browsing experience. Cookies are small text files stored on your
              device that help us understand how visitors use our site. We use:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                <strong>Essential cookies:</strong> Required for the website to
                function properly, including session management and security.
              </li>
              <li>
                <strong>Analytics cookies:</strong> Help us understand how
                visitors interact with our site so we can improve its
                performance and content.
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              You can control cookies through your browser settings. Disabling
              certain cookies may affect the functionality of our website.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-gray-700 mb-4">
              We use the following third-party services to operate and improve
              our website and business:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                <strong>Vercel:</strong> Our website is hosted on Vercel&apos;s
                platform. Vercel may collect server logs and performance data in
                accordance with their own privacy policy.
              </li>
              <li>
                <strong>Groundhogg CRM:</strong> We use Groundhogg as our
                customer relationship management platform to manage
                communications, follow-ups, and marketing. Information you
                provide through our forms may be stored and processed within
                Groundhogg.
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              These third-party services have their own privacy policies, and we
              encourage you to review them. We only share the minimum
              information necessary for these services to function on our
              behalf.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              6. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, rent, or trade your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                With trusted service providers who assist us in operating our
                website and conducting business, subject to confidentiality
                obligations
              </li>
              <li>
                When required by law, regulation, or legal process
              </li>
              <li>
                To protect the rights, property, or safety of Solid Steel
                Management, our clients, or others
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information only for as long as necessary
              to fulfil the purposes outlined in this policy, or as required by
              applicable law. Contact form submissions and project-related
              communications are typically retained for the duration of the
              business relationship and for a reasonable period afterward to
              address any follow-up inquiries. You may request deletion of your
              personal information at any time by contacting us using the
              information below.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              8. Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We take reasonable technical and organizational measures to
              protect your personal information against unauthorized access,
              loss, destruction, or alteration. Our website is served over HTTPS
              to ensure data is encrypted in transit. However, no method of
              transmission over the internet or electronic storage is completely
              secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              9. Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              Under Canadian privacy legislation, including the Personal
              Information Protection and Electronic Documents Act (PIPEDA), you
              have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                Access the personal information we hold about you
              </li>
              <li>
                Request correction of any inaccurate or incomplete information
              </li>
              <li>
                Request deletion of your personal information, subject to legal
                and contractual obligations
              </li>
              <li>
                Withdraw consent for marketing communications at any time
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              To exercise any of these rights, please contact us using the
              information provided below. We will respond to your request within
              a reasonable timeframe in accordance with applicable law.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our website and services are not directed at individuals under the
              age of 18. We do not knowingly collect personal information from
              children. If you believe we have inadvertently collected
              information from a minor, please contact us so we can promptly
              delete it.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. Any updates will be
              posted on this page with a revised effective date. We encourage
              you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or how we
              handle your personal information, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg text-gray-700 space-y-2">
              <p className="font-semibold text-blue-700">
                Solid Steel Management
              </p>
              <p>Eastern Ottawa, Ontario, Canada</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@solidsteelmgt.ca"
                  className="text-blue-600 hover:underline"
                >
                  info@solidsteelmgt.ca
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+16132318639"
                  className="text-blue-600 hover:underline"
                >
                  (613) 231-8639
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://solidsteelmgt.ca"
                  className="text-blue-600 hover:underline"
                >
                  solidsteelmgt.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
