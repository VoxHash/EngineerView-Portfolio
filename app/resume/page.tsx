"use client";
import { useState, useEffect } from "react";
import { Download, Printer, Eye, EyeOff, ExternalLink } from "lucide-react";
import { useAnalytics } from "@/components/Analytics";

export default function ResumePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useGoogleViewer, setUseGoogleViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfError, setPdfError] = useState(false);
  const { trackDownload } = useAnalytics();

  useEffect(() => {
    // Set the PDF URL after component mounts to avoid SSR issues
    setPdfUrl(window.location.origin + '/VoxHash_Resume.pdf');
  }, []);

  const handleDownload = async () => {
    trackDownload('VoxHash_Resume.pdf');
    try {
      // Generate and download the dynamic PDF
      const response = await fetch('/api/resume/pdf');
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'VoxHash_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Fallback to static PDF
      const link = document.createElement('a');
      link.href = '/VoxHash_Resume.pdf';
      link.download = 'VoxHash_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Resume & <span className="text-brand">CV</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
          Download my resume or view it inline. Available in PDF format for easy sharing and printing.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={handleDownload}
            className="btn flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          
          <button
            onClick={handlePrint}
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
          >
            {isFullscreen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          
          <a
            href="/VoxHash_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </a>
          
          <button
            onClick={() => setUseGoogleViewer(!useGoogleViewer)}
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
          >
            {useGoogleViewer ? 'Use Native Viewer' : 'Use Google Viewer'}
          </button>
          
          <button
            onClick={handleDownload}
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Generate New PDF
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-neutral-950' : 'max-w-4xl mx-auto'}`}>
        <div className={`${isFullscreen ? 'h-full' : 'card p-4'}`}>
          <div className="relative w-full h-full">
            {pdfError ? (
              <div className="w-full h-[800px] border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg flex items-center justify-center bg-neutral-50 dark:bg-neutral-800">
                <div className="text-center p-8">
                  <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                    PDF Viewer Error
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    The PDF couldn't be loaded in the viewer. Please try one of the options below:
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPdfError(false)}
                      className="btn mr-2"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => setUseGoogleViewer(!useGoogleViewer)}
                      className="badge mr-2"
                    >
                      Switch to {useGoogleViewer ? 'Native' : 'Google'} Viewer
                    </button>
                    <a
                      href="/VoxHash_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge"
                    >
                      Open in New Tab
                    </a>
                  </div>
                </div>
              </div>
            ) : useGoogleViewer ? (
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                className="w-full h-[800px] border-0 rounded-lg"
                title="VoxHash Resume - Google Viewer"
                onError={() => setPdfError(true)}
              />
            ) : (
              <iframe
                src="/VoxHash_Resume.pdf#toolbar=1&navpanes=1&scrollbar=1&view=FitH"
                className="w-full h-[800px] border-0 rounded-lg"
                title="VoxHash Resume"
                onError={() => setPdfError(true)}
              />
            )}
            {!pdfError && (
              <div className="text-center mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                <p>If the PDF doesn't load, try the "Use Google Viewer" button above or "Open in New Tab".</p>
              </div>
            )}
          </div>
        </div>
        
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="fixed top-4 right-4 z-10 badge p-3 hover:bg-brand/10 hover:text-brand transition-colors duration-200"
            aria-label="Exit fullscreen"
          >
            <EyeOff className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Resume Information */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Resume Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand">Contact Information</h3>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <p><strong>Name:</strong> VoxHash</p>
                <p><strong>Title:</strong> Senior Software Engineer</p>
                <p><strong>Location:</strong> Remote / Global</p>
                <p><strong>Email:</strong> contact@voxhash.dev</p>
                <p><strong>Website:</strong> voxhash.dev</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand">Key Skills</h3>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <p><strong>Languages:</strong> TypeScript, Python, Go, Rust</p>
                <p><strong>Frameworks:</strong> Next.js, React, Node.js</p>
                <p><strong>Cloud:</strong> AWS, Vercel, Docker</p>
                <p><strong>AI/ML:</strong> OpenAI, LangChain, Vector DBs</p>
                <p><strong>Tools:</strong> Git, Linux, CI/CD</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-brand">Experience Highlights</h3>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>• 15+ years of full-stack development experience</li>
              <li>• Led development of scalable microservices handling 100K+ users</li>
              <li>• Built AI-powered applications with modern LLM integrations</li>
              <li>• Open source contributor with 1000+ GitHub stars</li>
              <li>• Speaker at tech conferences and meetups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
