import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield, CheckCircle2 } from 'lucide-react';

const TermsConditions = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using CrackIt platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted to temporarily access the materials (information or software) on CrackIt for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on the platform; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server. This license shall automatically terminate if you violate any of these restrictions.'
    },
    {
      title: '3. User Account',
      content: 'When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.'
    },
    {
      title: '4. Interview Practice & AI Services',
      content: 'CrackIt provides AI-powered mock interviews and feedback. While we strive for accuracy, the AI-generated content is for practice purposes only and should not be considered as professional career advice. Actual interview experiences may vary. We do not guarantee employment outcomes or interview success based on the use of our platform.'
    },
    {
      title: '5. User Content',
      content: 'Our Service allows you to upload, submit, store, and receive content including resumes, interview answers, and personal information. You retain all rights in, and are solely responsible for, the User Content you post to the platform. By uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your content solely for the purpose of providing our services to you.'
    },
    {
      title: '6. Intellectual Property',
      content: 'The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of CrackIt and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CrackIt.'
    },
    {
      title: '7. Data Collection and Privacy',
      content: 'We collect and process personal data in accordance with our Privacy Policy. By using the Service, you consent to such processing and you warrant that all data provided by you is accurate. We implement appropriate security measures to protect your personal information.'
    },
    {
      title: '8. Payment and Subscription',
      content: 'Certain features of the Service may be provided on a subscription basis. You will be billed in advance on a recurring and periodic basis. At the end of each period, your subscription will automatically renew unless you cancel it or we cancel it. You may cancel your subscription renewal either through your account settings or by contacting our support team.'
    },
    {
      title: '9. Prohibited Uses',
      content: 'You may not use the Service: (a) for any unlawful purpose; (b) to solicit others to perform unlawful acts; (c) to violate any international, federal, provincial or state regulations; (d) to infringe upon or violate our intellectual property rights; (e) to harass, abuse, or harm another person; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code; (h) to spam, phish, or engage in any automated use of the system; (i) to interfere with or circumvent security features of the Service.'
    },
    {
      title: '10. Limitation of Liability',
      content: 'In no event shall CrackIt, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.'
    },
    {
      title: '11. Disclaimer',
      content: 'Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.'
    },
    {
      title: '12. Termination',
      content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.'
    },
    {
      title: '13. Changes to Terms',
      content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.'
    },
    {
      title: '14. Governing Law',
      content: 'These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which CrackIt operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.'
    },
    {
      title: '15. Contact Information',
      content: 'If you have any questions about these Terms, please contact us at support@crackit.com. We are committed to resolving any concerns you may have about our Terms of Service.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Header */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent font-display">
                Terms & Conditions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Last updated: January 26, 2026
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <Shield className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Agreement to Terms</h3>
                <p className="text-sm">
                  Please read these Terms and Conditions carefully before using the CrackIt platform. 
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with 
                  any part of the terms, you may not access the Service.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                {section.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-effect rounded-2xl p-6 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            By using CrackIt, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms and Conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Accept & Continue
            </Link>
            <Link
              to="/privacy-policy"
              className="px-6 py-3 glass-effect rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all"
            >
              Read Privacy Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="px-6 py-3 glass-effect rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all"
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;
