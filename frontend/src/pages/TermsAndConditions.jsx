import { Shield, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl text-primary-100 text-center max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our service.
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
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              1. Introduction
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Welcome to ShopEase ("Company", "we", "our", "us"). These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with the ShopEase website and services (the "Service") operated by ShopEase.
              </p>
              <p>
                Please read these Terms and Conditions carefully before using our Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p className="font-semibold">
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
            </div>
          </div>

          {/* Accounts */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Accounts</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              <p>
                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
              </p>
            </div>
          </div>

          {/* Purchases */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Purchases and Payment</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-lg">3.1 Orders</h3>
              <p>
                By placing an order through our Service, you warrant that you are legally capable of entering into binding contracts and that all information you provide is true and accurate.
              </p>
              
              <h3 className="font-semibold text-lg">3.2 Pricing</h3>
              <p>
                All prices are listed in US Dollars and are subject to change without notice. We reserve the right to modify or discontinue products at any time. Prices do not include applicable taxes and shipping charges, which will be added to your order total.
              </p>
              
              <h3 className="font-semibold text-lg">3.3 Payment</h3>
              <p>
                We accept various payment methods including credit cards, debit cards, PayPal, and other payment services. You agree to provide current, complete, and accurate purchase and account information for all purchases made via our Service.
              </p>
              <p>
                You agree to promptly update your account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
              </p>
              
              <h3 className="font-semibold text-lg">3.4 Order Confirmation</h3>
              <p>
                We reserve the right to refuse or cancel any order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.
              </p>
            </div>
          </div>

          {/* Shipping and Delivery */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping and Delivery</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We will arrange for shipment of ordered products to you. Please check the individual product page for specific delivery options. Title and risk of loss pass to you upon our transfer of the products to the carrier.
              </p>
              <p>
                Shipping times may vary depending on your location and the shipping method selected. We are not responsible for delays caused by customs, weather conditions, or carrier delays.
              </p>
              <p>
                You are responsible for providing accurate shipping information. We are not liable for orders shipped to incorrect addresses provided by the customer.
              </p>
            </div>
          </div>

          {/* Returns and Refunds */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Returns and Refunds</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We offer a 30-day return policy on most products. Items must be unused, in their original packaging, and in the same condition that you received them. Please refer to our Returns Policy for detailed information.
              </p>
              <p>
                To initiate a return, please log into your account and request a return authorization. Once your return is received and inspected, we will send you an email notification of approval or rejection of your refund.
              </p>
              <p>
                If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
              </p>
              <p>
                Certain products are non-returnable including: personal care items, opened software, gift cards, and customized products.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of ShopEase and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ShopEase. You may not modify, reproduce, distribute, create derivative works of, publicly display, or exploit any content without our express written permission.
              </p>
            </div>
          </div>

          {/* User Conduct */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              7. Prohibited Uses
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>You may not use our Service:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the Service</li>
              </ul>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                In no event shall ShopEase, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
              <p>
                ShopEase, its subsidiaries, affiliates, and its licensors do not warrant that:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The Service will function uninterrupted, secure or available at any particular time or location</li>
                <li>Any errors or defects will be corrected</li>
                <li>The Service is free of viruses or other harmful components</li>
                <li>The results of using the Service will meet your requirements</li>
              </ul>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States and the State of New York, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p>
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              12. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="space-y-2">
              <li>• Email: legal@shopease.com</li>
              <li>• Phone: +1 (555) 123-4567</li>
              <li>• Mail: 123 Commerce Street, Business District, New York, NY 10001</li>
            </ul>
          </div>

          {/* Agreement Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-8">
            <p className="text-sm text-yellow-800">
              <strong>By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
