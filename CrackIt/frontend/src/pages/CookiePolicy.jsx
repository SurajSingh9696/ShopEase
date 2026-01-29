import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Settings, Eye, BarChart2, Target, Shield, CheckCircle2 } from 'lucide-react';

const CookiePolicy = () => {
  const sections = [
    {
      icon: Cookie,
      title: '1. What Are Cookies?',
      content: 'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and provide information to website owners. Cookies help websites remember your preferences, track your browsing behavior, and distinguish you from other users. They typically contain two pieces of information: a site name and a unique user ID. CrackIt uses cookies to enhance your experience and provide our services effectively.'
    },
    {
      icon: Settings,
      title: '2. Types of Cookies We Use',
      content: 'We use several types of cookies on our platform: Essential Cookies - Required for the website to function properly and cannot be disabled. These enable core functionality like security, authentication, and accessibility. Performance Cookies - Collect information about how visitors use our website, such as which pages are visited most often. All information is aggregated and anonymous. Functional Cookies - Allow the website to remember choices you make (such as your username, language, or theme preference) to provide enhanced, personalized features. Analytics Cookies - Help us understand how visitors interact with our website by collecting and reporting information anonymously. Marketing Cookies - Track your activity across websites to build a profile of your interests and show you relevant advertisements on other sites.'
    },
    {
      icon: Eye,
      title: '3. Essential Cookies',
      content: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as: Setting your privacy preferences; Logging in to your account; Filling in forms and submitting interview responses; Managing your session state; Maintaining security and preventing fraud; Enabling authentication services. Without these cookies, services you have asked for cannot be provided. These cookies do not store any personally identifiable information and are essential for the platform to work properly.'
    },
    {
      icon: BarChart2,
      title: '4. Analytics and Performance Cookies',
      content: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our platform. They help us understand: Which pages are most and least popular; How visitors move around the site; How long visitors spend on different pages; What features are used most frequently; Which interview questions are most challenging; Where users encounter issues or errors. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies, we will not know when you visited our site and will not be able to monitor its performance or improve your experience.'
    },
    {
      icon: Target,
      title: '5. Functional Cookies',
      content: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. These cookies remember: Your theme preference (light or dark mode); Your language selection; Your selected role and career preferences; Resume upload history; Interview session preferences; Dashboard layout customizations; Notification settings. If you do not allow these cookies, some or all of these services may not function properly, and you may need to re-enter your preferences each time you visit.'
    },
    {
      icon: Shield,
      title: '6. Third-Party Cookies',
      content: 'Some cookies are placed by third-party services that appear on our pages. We use the following third-party services that may set cookies: OpenAI for AI-powered interview analysis; Cloud hosting providers for platform infrastructure; Analytics services (Google Analytics) to understand user behavior; Authentication providers for secure login; Payment processors for subscription management. We do not control these third-party cookies. You should check the respective third-party websites for more information about their cookies and how to manage them. We carefully select our third-party partners and ensure they comply with privacy regulations.'
    },
    {
      icon: Settings,
      title: '7. How to Control Cookies',
      content: 'You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences through: Cookie Consent Manager: When you first visit our website, you will see a cookie banner where you can accept or reject non-essential cookies; Browser Settings: Most web browsers allow you to control cookies through their settings preferences. You can set your browser to refuse cookies or delete certain cookies; Browser Add-ons: You can use browser extensions or add-ons to manage cookies and prevent tracking; Opt-out Tools: For analytics cookies, you can use opt-out tools provided by analytics services. Please note that if you choose to block all cookies (including essential cookies), you may not be able to access all or parts of our platform.'
    },
    {
      icon: Cookie,
      title: '8. Session vs Persistent Cookies',
      content: 'We use both session and persistent cookies: Session Cookies are temporary cookies that remain in your browser only while you are using our website and are deleted when you close your browser. We use these to: Maintain your login state during your session; Remember items in your interview queue; Track your progress through multi-step processes. Persistent Cookies remain on your device after you close your browser and are activated each time you visit our website. We use these to: Remember your login credentials (if you choose); Store your theme and language preferences; Track your long-term usage patterns; Provide personalized content based on your history. You can delete persistent cookies through your browser settings at any time.'
    },
    {
      icon: Eye,
      title: '9. Cookie Duration',
      content: 'Different cookies have different lifespans: Essential Cookies: Valid for the duration of your session or up to 30 days for authentication; Performance Cookies: Typically valid for 1-2 years to track long-term trends; Functional Cookies: Valid for 1 year to remember your preferences; Analytics Cookies: Valid for 1-2 years to analyze usage patterns; Marketing Cookies: Valid for 6-12 months for advertising purposes. We regularly review and update cookie durations to ensure they are kept for no longer than necessary. Expired cookies are automatically deleted by your browser.'
    },
    {
      icon: Shield,
      title: '10. Cookie Security',
      content: 'We implement strict security measures to protect the information stored in cookies: Encryption: All sensitive information in cookies is encrypted using industry-standard protocols; Secure Flag: Cookies containing sensitive data are transmitted only over secure HTTPS connections; HttpOnly Flag: Prevents client-side scripts from accessing sensitive cookies, protecting against XSS attacks; SameSite Attribute: Protects against CSRF attacks by controlling when cookies are sent; Regular Audits: We regularly audit our cookie usage to ensure compliance with security best practices; Limited Access: Only authorized systems and personnel can access cookie data.'
    },
    {
      icon: Target,
      title: '11. Tracking and Do Not Track',
      content: 'We respect your privacy choices regarding tracking: Do Not Track (DNT): Currently, we do not respond to Do Not Track signals, as there is no industry standard for compliance. However, you can control tracking through your cookie preferences; Cross-Site Tracking: We do not track your activity across unrelated websites; Advertising: We may use cookies to show relevant ads, but we do not sell your personal data to advertisers; User Control: You have full control over cookie preferences and can opt-out of non-essential tracking at any time through our cookie settings or browser controls.'
    },
    {
      icon: BarChart2,
      title: '12. Analytics and Reporting',
      content: 'We use analytics cookies to improve our platform and provide better services: We track: Page views and navigation patterns; Feature usage and engagement; Interview completion rates; Error rates and technical issues; Load times and performance metrics; User flow and conversion funnels. This data is aggregated and anonymized. We use it to: Improve platform performance and reliability; Identify and fix usability issues; Develop new features based on user needs; Optimize the interview experience; Enhance AI accuracy and feedback quality. You can opt-out of analytics tracking through your cookie preferences.'
    },
    {
      icon: Settings,
      title: '13. Cookie Consent Management',
      content: 'We provide transparent cookie consent management: Initial Consent: When you first visit our website, you will be presented with a clear cookie notice explaining our cookie usage; Granular Control: You can accept all cookies, reject non-essential cookies, or customize your preferences by cookie category; Easy Access: You can update your cookie preferences at any time through the cookie settings link in our footer; Clear Information: We provide detailed information about each cookie category and its purpose; Consent Records: We maintain records of your consent choices to demonstrate compliance with privacy laws; Withdrawal: You can withdraw your consent at any time, and we will respect your choice going forward.'
    },
    {
      icon: Shield,
      title: '14. International Cookie Compliance',
      content: 'We comply with international cookie regulations: GDPR (EU): We obtain explicit consent before placing non-essential cookies for EU visitors and provide clear information about cookie purposes; ePrivacy Directive (EU): We comply with EU cookie consent requirements and provide opt-in mechanisms; CCPA (California): We respect California residents privacy rights and provide opt-out options for data selling (though we do not sell personal data); LGPD (Brazil): We comply with Brazilian data protection requirements for cookie usage; Other Jurisdictions: We monitor and comply with cookie regulations in all jurisdictions where we operate. We regularly update our cookie practices to ensure compliance with evolving regulations worldwide.'
    },
    {
      icon: Cookie,
      title: '15. Changes to Cookie Policy',
      content: 'We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. When we make changes: Notification: We will notify you of material changes through a prominent notice on our website or via email; Review Period: We will provide a reasonable period for you to review changes before they take effect; Date Stamp: The "Last Updated" date at the top of this policy shows when the latest changes were made; Continued Use: Your continued use of the platform after changes indicates acceptance of the updated policy. We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies. For questions about changes, please contact us at cookies@crackit.com.'
    }
  ];

  const cookieTypes = [
    {
      name: 'Essential',
      purpose: 'Required for website functionality',
      examples: 'Session ID, Authentication, Security',
      duration: 'Session / 30 days',
      canDisable: false,
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Performance',
      purpose: 'Measure and improve performance',
      examples: 'Page load times, Error tracking',
      duration: '1-2 years',
      canDisable: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Functional',
      purpose: 'Remember your preferences',
      examples: 'Theme, Language, Settings',
      duration: '1 year',
      canDisable: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Analytics',
      purpose: 'Understand user behavior',
      examples: 'Google Analytics, Usage metrics',
      duration: '1-2 years',
      canDisable: true,
      color: 'from-green-500 to-emerald-500'
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
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent font-display">
                Cookie Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Last updated: January 26, 2026
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <Cookie className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Understanding Our Cookie Usage</h3>
                <p className="text-sm">
                  This Cookie Policy explains how CrackIt uses cookies and similar tracking technologies 
                  when you visit our platform. We use cookies to improve your experience, provide personalized 
                  content, and analyze how our services are used.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cookie Types Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cookie Types Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.05), type: "spring", stiffness: 300, damping: 20 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{type.name}</h3>
                  <div className={`px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r ${type.color} text-white`}>
                    {type.canDisable ? 'Optional' : 'Required'}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{type.purpose}</p>
                <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <p><span className="font-semibold">Examples:</span> {type.examples}</p>
                  <p><span className="font-semibold">Duration:</span> {type.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.03 * index, type: "spring", stiffness: 300, damping: 20 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
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

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-12 glass-effect rounded-2xl p-8 text-center"
        >
          <Cookie className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Manage Your Cookie Preferences</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You have full control over which cookies we use. Update your preferences anytime through 
            your browser settings or our cookie consent manager.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Cookie Settings
            </button>
            <Link
              to="/privacy-policy"
              className="px-6 py-3 glass-effect rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              Read Privacy Policy
            </Link>
          </div>
        </motion.div>

        {/* Related Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            For more information about how we protect your data:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy-policy"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
