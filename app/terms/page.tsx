import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the Solid Steel Management website. Review the terms and conditions governing your use of solidsteelmgt.ca.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Solid Steel Management",
    description:
      "Terms of service for the Solid Steel Management website. Review the terms and conditions governing your use of solidsteelmgt.ca.",
    url: "https://solidsteelmgt.ca/terms",
  },
}

export default function TermsOfServicePage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100">
              Please read these terms carefully before using our website.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg prose-blue">
            <p className="text-gray-600 mb-8">
              <strong>Effective Date:</strong> February 23, 2026
            </p>

            <p className="text-gray-700 mb-8">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
              website located at{" "}
              <Link href="https://solidsteelmgt.ca" className="text-blue-700 underline">
                solidsteelmgt.ca
              </Link>{" "}
              (the &quot;Website&quot;), operated by Solid Steel Management
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a commercial
              construction company based in Eastern Ottawa, Ontario, Canada. By accessing
              or using the Website, you agree to be bound by these Terms. If you do not
              agree with any part of these Terms, you must not use the Website.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              1. Use of the Website
            </h2>
            <p className="text-gray-700 mb-4">
              The Website is provided for informational purposes to present the services,
              projects, and capabilities of Solid Steel Management. You agree to use the
              Website only for lawful purposes and in a manner that does not infringe upon
              the rights of, restrict, or inhibit the use and enjoyment of the Website by
              any third party.
            </p>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                Use the Website in any way that violates any applicable federal,
                provincial, or local law or regulation.
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the Website, its
                servers, or any systems or networks connected to the Website.
              </li>
              <li>
                Use any automated system, including bots, crawlers, or scrapers, to
                access the Website for any purpose without our express written permission.
              </li>
              <li>
                Introduce any viruses, malware, or other harmful material to the Website.
              </li>
              <li>
                Reproduce, duplicate, copy, sell, or otherwise exploit any portion of the
                Website for commercial purposes without our prior written consent.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              2. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4">
              All content on this Website, including but not limited to text, graphics,
              logos, images, photographs, videos, project descriptions, case studies, and
              the design and layout of the Website, is the property of Solid Steel
              Management or its licensors and is protected by Canadian and international
              copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-700 mb-6">
              You may not reproduce, distribute, modify, create derivative works from,
              publicly display, or otherwise use any content from this Website without our
              prior written authorization. Limited personal, non-commercial use such as
              viewing and printing pages for your own reference is permitted.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              3. Form Submissions and Communications
            </h2>
            <p className="text-gray-700 mb-4">
              The Website may provide forms for contacting us, requesting quotes,
              requesting proforma budget consultations, or subscribing to communications.
              By submitting information through any form on the Website, you acknowledge
              and agree that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                The information you provide is accurate, complete, and current.
              </li>
              <li>
                Your submission does not create a binding contract, obligation, or
                client-contractor relationship between you and Solid Steel Management.
              </li>
              <li>
                We may use the information you provide to respond to your inquiry, provide
                requested information, or communicate with you about our services.
              </li>
              <li>
                We will handle your personal information in accordance with our{" "}
                <Link href="/privacy-policy" className="text-blue-700 underline">
                  Privacy Policy
                </Link>
                .
              </li>
              <li>
                Any estimates, budgets, or project information discussed through the
                Website or subsequent communications are preliminary and non-binding until
                formalized in a written contract signed by both parties.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              4. Project Information and Accuracy
            </h2>
            <p className="text-gray-700 mb-6">
              While we strive to ensure that all information on the Website is accurate
              and up to date, we make no representations or warranties regarding the
              completeness, accuracy, reliability, or availability of any content,
              including project descriptions, case studies, images, timelines, or cost
              estimates. Project details, specifications, and pricing are subject to
              change and may vary based on individual project requirements, site
              conditions, material availability, and other factors.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              5. Third-Party Links
            </h2>
            <p className="text-gray-700 mb-6">
              The Website may contain links to third-party websites or resources. These
              links are provided for your convenience only. We have no control over the
              content, privacy practices, or availability of those third-party sites and
              accept no responsibility or liability for them. Your use of any third-party
              website is at your own risk and subject to the terms and conditions of that
              website.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 mb-4">
              THE WEBSITE AND ALL CONTENT, MATERIALS, AND SERVICES PROVIDED ON OR THROUGH
              THE WEBSITE ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED.
            </p>
            <p className="text-gray-700 mb-6">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, SOLID STEEL MANAGEMENT
              DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE
              UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL
              COMPONENTS.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SOLID STEEL MANAGEMENT,
              ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, AND AFFILIATES SHALL
              NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL,
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE
              WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM YOUR USE OF THE WEBSITE SHALL
              NOT EXCEED THE AMOUNT, IF ANY, YOU PAID TO ACCESS THE WEBSITE.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              8. Indemnification
            </h2>
            <p className="text-gray-700 mb-6">
              You agree to indemnify, defend, and hold harmless Solid Steel Management and
              its directors, officers, employees, and agents from and against any and all
              claims, liabilities, damages, losses, costs, and expenses (including
              reasonable legal fees) arising out of or related to your use of the Website,
              your violation of these Terms, or your violation of any rights of a third
              party.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              9. Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be governed by and construed in accordance with the laws
              of the Province of Ontario and the federal laws of Canada applicable therein,
              without regard to conflict of law principles. Any dispute arising out of or
              in connection with these Terms or the use of the Website shall be subject to
              the exclusive jurisdiction of the courts of the Province of Ontario, Canada.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              10. Changes to These Terms
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify or replace these Terms at any time at our
              sole discretion. Changes will be effective immediately upon posting to the
              Website. Your continued use of the Website after any changes constitutes
              your acceptance of the revised Terms. We encourage you to review these Terms
              periodically.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              11. Severability
            </h2>
            <p className="text-gray-700 mb-6">
              If any provision of these Terms is found to be invalid, illegal, or
              unenforceable by a court of competent jurisdiction, that provision shall be
              enforced to the maximum extent permissible, and the remaining provisions of
              these Terms shall remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-blue-700 mb-4 mt-12">
              12. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg text-gray-700 space-y-2">
              <p className="font-semibold text-blue-700">Solid Steel Management</p>
              <p>Eastern Ottawa, Ontario, Canada</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@solidsteelmgt.ca"
                  className="text-blue-700 underline"
                >
                  info@solidsteelmgt.ca
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+16132318639" className="text-blue-700 underline">
                  (613) 231-8639
                </a>
              </p>
              <p>
                Website:{" "}
                <Link href="https://solidsteelmgt.ca" className="text-blue-700 underline">
                  solidsteelmgt.ca
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
