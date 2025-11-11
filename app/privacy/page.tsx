import { Shield, Lock, Eye, FileText, Mail, Calendar } from "lucide-react";
import { SITE } from "@/lib/site";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import ClientDate from "@/components/ClientDate";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for VoxHash Technologies. Learn how we collect, use, and protect your data in compliance with privacy regulations.",
  keywords: ["privacy", "privacy policy", "data protection", "GDPR", "user rights"],
  url: "/privacy",
  image: "/og.png",
});

export default function Privacy() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy <span className="text-brand">Policy</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Last updated: <ClientDate format="date" fallback="January 1, 2025" />
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Overview */}
        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <Eye className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We are committed to protecting your privacy. This website collects minimal analytics data 
                to improve user experience and does not sell, trade, or rent your personal information to third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6 text-brand" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Data We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-brand">Analytics Data</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-2">
                    We use Google Analytics 4 to collect anonymous usage statistics, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 dark:text-neutral-300 ml-4">
                    <li>Page views and navigation patterns</li>
                    <li>Device type and browser information</li>
                    <li>Geographic location (country/region level)</li>
                    <li>Time spent on pages</li>
                  </ul>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mt-3">
                    This data is aggregated and anonymized. We cannot identify individual users from this information.
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold mb-2 text-brand">Contact Information</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    If you contact us through the contact form, we collect your name, email address, and message. 
                    This information is used solely to respond to your inquiry and is not shared with third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Usage */}
        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-brand" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Data</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    <strong className="text-neutral-900 dark:text-neutral-100">Website Improvement:</strong> Analytics data helps us understand how visitors use our site and improve the user experience.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    <strong className="text-neutral-900 dark:text-neutral-100">Communication:</strong> Contact form submissions are used to respond to your inquiries and provide support.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    <strong className="text-neutral-900 dark:text-neutral-100">Legal Compliance:</strong> We may use your data to comply with legal obligations or respond to legal requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
            over the Internet is 100% secure.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Secure Connections</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  All data transmission uses HTTPS encryption
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm mb-1">No Data Selling</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  We never sell or rent your personal information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            We use the following third-party services that may collect information:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-brand">Google Analytics 4</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We use Google Analytics to understand website usage. Google's privacy policy can be found at{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  policies.google.com/privacy
                </a>
                . You can opt out of Google Analytics by installing the{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            You have the right to:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Request access to your personal data
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Request correction of inaccurate data
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Request deletion of your data
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0" />
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Opt out of analytics tracking
              </p>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Cookies</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            This website uses cookies and similar technologies to enhance your browsing experience and collect 
            analytics data. By continuing to use this site, you consent to our use of cookies.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            You can control cookies through your browser settings. Note that disabling cookies may affect 
            the functionality of certain features.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="card p-8">
          <div className="flex items-start gap-4">
            <Calendar className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the "Last updated" date. You are advised 
                to review this policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, 
                please contact us:
              </p>
              <div className="space-y-2">
                <a 
                  href={`mailto:${SITE.email}`}
                  className="text-brand hover:underline font-medium inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
