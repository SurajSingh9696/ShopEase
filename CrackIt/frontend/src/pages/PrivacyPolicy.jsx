import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Bell, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, including: Personal Information (name, email address, password), Resume and Career Information (uploaded resumes, work experience, skills, education), Interview Data (your answers to interview questions, performance metrics, scores), Usage Information (how you interact with our platform, features used, time spent), Device Information (IP address, browser type, operating system, device identifiers). We collect this information when you register for an account, upload your resume, participate in mock interviews, use our AI features, communicate with us, or otherwise interact with our Service.'
    },
    {
      icon: Eye,
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to: Provide, maintain, and improve our Services; Generate personalized interview questions based on your resume; Evaluate your interview answers using AI technology; Track your progress and provide performance analytics; Send you technical notices, updates, security alerts, and support messages; Respond to your comments, questions, and requests; Monitor and analyze trends, usage, and activities in connection with our Services; Detect, investigate and prevent fraudulent transactions and abuse; Improve our AI algorithms and interview question quality; Personalize your experience on the platform.'
    },
    {
      icon: UserCheck,
      title: '3. How We Share Your Information',
      content: 'We do not sell your personal information. We may share your information only in the following circumstances: With Service Providers who perform services on our behalf (cloud hosting, AI processing, analytics); With your consent or at your direction; To comply with legal obligations, protect rights, respond to legal requests; In connection with a merger, sale, or acquisition of all or a portion of our business; Aggregated or de-identified information that cannot reasonably be used to identify you. We require all third parties to respect the security of your personal data and treat it in accordance with the law.'
    },
    {
      icon: Lock,
      title: '4. Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include: Encryption of data in transit and at rest using industry-standard protocols; Regular security assessments and vulnerability testing; Access controls and authentication mechanisms; Secure cloud infrastructure with enterprise-grade protection; Regular backups and disaster recovery procedures; Employee training on data protection and privacy. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.'
    },
    {
      icon: Globe,
      title: '5. Data Retention',
      content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Account Information: Retained while your account is active and for a reasonable period after deactivation; Interview Data: Retained for analytics and improvement purposes for up to 3 years; Resume Information: Retained while your account is active; you can delete at any time; Usage Logs: Retained for up to 1 year for security and analytics purposes. You may request deletion of your account and associated data at any time through your account settings or by contacting us.'
    },
    {
      icon: UserCheck,
      title: '6. Your Rights and Choices',
      content: 'You have rights regarding your personal information: Access: Request access to the personal information we hold about you; Correction: Request correction of inaccurate or incomplete personal information; Deletion: Request deletion of your personal information; Portability: Request a copy of your personal information in a structured format; Opt-out: Opt-out of marketing communications; Withdraw Consent: Withdraw consent for data processing where we rely on consent. To exercise these rights, please contact us at privacy@crackit.com. We will respond to your request within 30 days.'
    },
    {
      icon: Bell,
      title: '7. Cookies and Tracking Technologies',
      content: 'We use cookies and similar tracking technologies to collect and track information about your usage of the Service. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. We use the following types of cookies: Essential Cookies (required for the Service to function); Analytics Cookies (help us understand how users interact with the Service); Preference Cookies (remember your settings and preferences); Marketing Cookies (track visits across websites for marketing purposes).'
    },
    {
      icon: Shield,
      title: '8. Third-Party Services',
      content: 'Our Service may contain links to third-party websites or services that are not owned or controlled by CrackIt. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. We use the following third-party services: OpenAI for AI-powered interview analysis and feedback; Cloud hosting providers for data storage and processing; Analytics services to understand user behavior; Payment processors for subscription management. We encourage you to review the privacy policies of any third-party services you access.'
    },
    {
      icon: UserCheck,
      title: '9. Children\'s Privacy',
      content: 'Our Service is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from a child under 16 without verification of parental consent, we will take steps to remove that information from our servers.'
    },
    {
      icon: Globe,
      title: '10. International Data Transfers',
      content: 'Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. If you are located outside the jurisdiction where our servers are located and choose to use our Service, you consent to the transfer of your information to that jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.'
    },
    {
      icon: Bell,
      title: '11. Changes to Privacy Policy',
      content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. For material changes, we will provide a more prominent notice (including, for certain services, email notification of Privacy Policy changes). You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.'
    },
    {
      icon: Lock,
      title: '12. California Privacy Rights',
      content: 'If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA): Right to Know what personal information is collected, used, shared or sold; Right to Delete personal information held by businesses; Right to Opt-out of sale of personal information (note: we do not sell personal information); Right to Non-discrimination for exercising CCPA rights. To exercise these rights, please contact us at privacy@crackit.com with "California Privacy Rights" in the subject line.'
    },
    {
      icon: Shield,
      title: '13. GDPR Compliance (EU Users)',
      content: 'If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). We process your personal data lawfully based on: Consent you have given; Performance of a contract with you; Compliance with legal obligations; Legitimate interests pursued by us. You have the right to: Access, correct, delete, or restrict processing of your personal data; Object to processing; Data portability; Lodge a complaint with a supervisory authority. To exercise these rights, contact us at gdpr@crackit.com.'
    },
    {
      icon: Database,
      title: '14. Data Breach Notification',
      content: 'In the event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law. We will provide information about the breach, the data affected, and steps we are taking to address the issue. We will make the notification without undue delay and, where feasible, within 72 hours of becoming aware of the breach.'
    },
    {
      icon: UserCheck,
      title: '15. Contact Us',
      content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: Email: privacy@crackit.com; Address: CrackIt, Data Protection Office, [Your Address]; Phone: [Your Phone Number]. We are committed to resolving any privacy concerns you may have and will respond to your inquiry within 30 days.'
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent font-display">
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Last updated: January 26, 2026
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <Lock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Your Privacy Matters</h3>
                <p className="text-sm">
                  At CrackIt, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our platform. We are committed to 
                  protecting your personal data and being transparent about our practices.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-13">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-effect rounded-2xl p-6 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            By using CrackIt, you acknowledge that you have read and understood this Privacy Policy 
            and agree to its terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Accept & Continue
            </Link>
            <Link
              to="/terms"
              className="px-6 py-3 glass-effect rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all"
            >
              Read Terms & Conditions
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

export default PrivacyPolicy;
