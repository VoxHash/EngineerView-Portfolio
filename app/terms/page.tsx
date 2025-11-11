import { Scale, FileText, AlertCircle, CheckCircle, Shield, Mail, Calendar } from "lucide-react";
import { SITE } from "@/lib/site";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Use",
  description: "Terms of use for VoxHash Technologies website. Please read these terms before using our services.",
  keywords: ["terms", "terms of use", "legal", "user agreement", "website terms"],
  url: "/terms",
  image: "/og.png",
});

export default function Terms() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Scale className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terms of <span className="text-brand">Use</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          By accessing and using this website, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Acceptance */}
        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Acceptance of Terms</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </div>
        </div>

        {/* Use License */}
        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6 text-brand" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-brand">Permission</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-3">
                    Permission is granted to temporarily download one copy of the materials on this website 
                    for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 dark:text-neutral-300 ml-4 mt-3">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-lg font-semibold mb-2 text-brand">Code Samples</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    Code samples, examples, and documentation provided on this website are provided "as-is" 
                    without warranty of any kind. You may use code samples for learning and development purposes, 
                    but they are not guaranteed to be production-ready or error-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Conduct */}
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-brand" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                You agree to use this website in a respectful and lawful manner. You agree not to:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Use the website for any unlawful purpose
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Transmit any harmful code or malware
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Attempt to gain unauthorized access to systems
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Interfere with or disrupt the website's operation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-200">No Warranties</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    The materials on this website are provided on an 'as is' basis. We make no warranties, 
                    expressed or implied, and hereby disclaim and negate all other warranties including, 
                    without limitation, implied warranties or conditions of merchantability, fitness for 
                    a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-brand">Accuracy of Materials</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                The materials appearing on this website could include technical, typographical, or photographic errors. 
                We do not warrant that any of the materials on its website are accurate, complete, or current. 
                We may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Limitations of Liability</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            In no event shall VoxHash Technologies Ltd or its suppliers be liable for any damages (including, 
            without limitation, damages for loss of data or profit, or due to business interruption) arising 
            out of the use or inability to use the materials on this website, even if we or an authorized 
            representative has been notified orally or in writing of the possibility of such damage.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability 
            for consequential or incidental damages, these limitations may not apply to you.
          </p>
        </div>

        {/* Intellectual Property */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-brand">Copyright</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, icons, images, 
                audio clips, digital downloads, and software, is the property of VoxHash Technologies Ltd or its 
                content suppliers and is protected by international copyright laws.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold mb-2 text-brand">Trademarks</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                All trademarks, service marks, and trade names of VoxHash Technologies Ltd used on this site are 
                trademarks or registered trademarks of VoxHash Technologies Ltd.
              </p>
            </div>
          </div>
        </div>

        {/* Links to Other Sites */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Links to Other Websites</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Our website may contain links to third-party websites or services that are not owned or controlled 
            by VoxHash Technologies Ltd. We have no control over, and assume no responsibility for, the content, 
            privacy policies, or practices of any third-party websites or services. You acknowledge and agree 
            that we shall not be responsible or liable for any damage or loss caused by or in connection with 
            the use of any such content, goods, or services available on or through any such websites or services.
          </p>
        </div>

        {/* Modifications */}
        <div className="card p-8">
          <div className="flex items-start gap-4">
            <Calendar className="h-6 w-6 text-brand mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Modifications to Terms</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We reserve the right to revise these terms of service at any time without notice. By using this 
                website you are agreeing to be bound by the then current version of these terms of service. 
                We encourage you to review these terms periodically.
              </p>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with applicable laws. 
            Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts 
            in the applicable jurisdiction.
          </p>
        </div>

        {/* Contact */}
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Questions About Terms</h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Use, please contact us:
              </p>
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
  );
}
