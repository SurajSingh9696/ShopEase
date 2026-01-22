import { Shield, Lock, Eye, Database, Bell, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-primary-100 text-center max-w-3xl mx-auto">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-sm text-blue-800">
              <strong>Last Updated:</strong> January 19, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 text-primary-600 mr-2" />
              1. Introduction
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                ShopEase ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. We are based in India and comply with applicable data protection laws including the Information Technology Act, 2000.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
              <p className="font-semibold">
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 text-green-600 mr-2" />
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-lg">2.1 Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Register for an account</li>
                <li>Make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Account credentials (username, password)</li>
                <li>Shipping and delivery information</li>
                <li>Purchase history and preferences</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6">2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information about your device, including:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6">2.3 Information from Third Parties</h3>
              <p>
                We may receive information about you from third parties, such as social media platforms, payment processors, and marketing partners, if you choose to connect your accounts or interact with our services through third-party platforms.
              </p>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <UserCheck className="w-6 h-6 text-blue-600 mr-2" />
              3. How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Process and fulfill your orders and transactions</li>
                <li>Manage your account and provide customer support</li>
                <li>Send you confirmations, updates, and administrative messages</li>
                <li>Personalize your shopping experience and provide product recommendations</li>
                <li>Improve our website, products, and services</li>
                <li>Conduct analytics and research to understand user behavior</li>
                <li>Send marketing communications and promotional offers (with your consent)</li>
                <li>Detect and prevent fraud, security incidents, and other illegal activities</li>
                <li>Comply with legal obligations and enforce our terms and policies</li>
                <li>Respond to law enforcement requests and legal process</li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>We may share your information in the following situations:</p>
              
              <h3 className="font-semibold text-lg">4.1 Service Providers</h3>
              <p>
                We share information with third-party service providers who perform services on our behalf, such as payment processing, shipping and delivery, email services, marketing, analytics, and customer support.
              </p>

              <h3 className="font-semibold text-lg">4.2 Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, sale of assets, or bankruptcy, your information may be transferred as part of that transaction.
              </p>

              <h3 className="font-semibold text-lg">4.3 Legal Requirements</h3>
              <p>
                We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>

              <h3 className="font-semibold text-lg">4.4 With Your Consent</h3>
              <p>
                We may share your information with third parties when you give us explicit consent to do so.
              </p>

              <p className="font-semibold mt-4">
                We do not sell your personal information to third parties for their marketing purposes without your explicit consent.
              </p>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies, web beacons, and similar technologies to enhance your experience, analyze site usage, and assist in our marketing efforts.
              </p>
              
              <h3 className="font-semibold text-lg">Types of Cookies We Use:</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
              </ul>

              <p className="mt-4">
                You can control cookies through your browser settings. However, disabling certain cookies may affect your ability to use some features of our website.
              </p>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 text-red-600 mr-2" />
              6. Data Security
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
              </p>
              <p>Our security measures include:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through PCI-DSS compliant providers</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication procedures</li>
                <li>Employee training on data protection and privacy</li>
              </ul>
              <p className="font-semibold mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p>
                When we no longer need your information, we will securely delete or anonymize it. You may request deletion of your account and personal data at any time, subject to legal obligations that may require us to retain certain information.
              </p>
            </div>
          </div>

          {/* Your Privacy Rights */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Bell className="w-6 h-6 text-purple-600 mr-2" />
              8. Your Privacy Rights
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where we rely on consent</li>
                <li><strong>Opt-out:</strong> Opt-out of marketing communications at any time</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at privacy@shopease.com. We will respond to your request within 30 days.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
              <p>
                If we become aware that we have collected personal information from a child under 13 without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
            </div>
          </div>

          {/* International Transfers */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from the laws of your country.
              </p>
              <p>
                When we transfer your information internationally, we implement appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy and applicable laws.
              </p>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Third-Party Links and Services</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our website may contain links to third-party websites and services that are not operated by us. We are not responsible for the privacy practices of these third parties.
              </p>
              <p>
                We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies only to information collected through our Service.
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              12. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul className="space-y-2">
              <li>• Email: privacy@shopease.com</li>
              <li>• Phone: +1 (555) 123-4567</li>
              <li>• Mail: Privacy Officer, 123 Commerce Street, Business District, New York, NY 10001</li>
            </ul>
          </div>

          {/* Consent Notice */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
            <p className="text-sm text-green-800">
              <strong>By using our Service, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
