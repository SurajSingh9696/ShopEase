import { FileText } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl text-primary-100 text-center max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
          <p className="text-sm text-gray-500 mb-8">Last Updated: January 19, 2026</p>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4">
              ShopEase is a company registered in India. These Terms and Conditions govern your use of our
              website and services. By accessing or using ShopEase, you agree to be bound by these terms.
            </p>
            <p className="mb-4">
              If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Registration</h2>
            <p className="mb-4">
              To access certain features of our platform, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
            <p className="mb-4">
              We reserve the right to suspend or terminate accounts that violate these terms or engage in
              fraudulent activities.
            </p>
          </section>

          {/* Products and Orders */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Products and Orders</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Product Information</h3>
            <p className="mb-4">
              We strive to provide accurate product descriptions and images. However, we do not warrant that
              product descriptions, pricing, or other content is error-free. Colors may vary due to monitor
              settings.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Pricing</h3>
            <p className="mb-4">
              All prices are listed in Indian Rupees (INR) and include applicable taxes unless otherwise stated.
              We reserve the right to change prices at any time. Price changes will not affect orders already placed.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Order Acceptance</h3>
            <p className="mb-4">
              Your order constitutes an offer to purchase products. We reserve the right to accept or reject any
              order for any reason. We may require additional verification before accepting orders.
            </p>
          </section>

          {/* Payment */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="mb-4">
              We accept various payment methods including credit/debit cards, net banking, UPI, and digital wallets.
              Payment must be received before order processing begins.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>All payments are processed securely through encrypted connections</li>
              <li>We do not store complete credit/debit card information</li>
              <li>Payment processing may involve third-party services</li>
              <li>Failed transactions may result in order cancellation</li>
            </ul>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="mb-4">
              We ship to addresses across India and selected international locations. Delivery times are estimates
              and may vary based on location and product availability.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Standard delivery: 5-7 business days within India</li>
              <li>Express delivery: 2-3 business days (where available)</li>
              <li>International orders: 10-15 business days</li>
              <li>Shipping charges are calculated at checkout</li>
            </ul>
            <p className="mb-4">
              Risk of loss and title for products pass to you upon delivery to the shipping carrier. We are not
              responsible for shipping delays beyond our control.
            </p>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Return Policy</h3>
            <p className="mb-4">
              We offer a 30-day return policy on most products. Items must be unused, in original condition, and
              in original packaging. Certain products may have specific return requirements.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Non-Returnable Items</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Personal care and hygiene products</li>
              <li>Intimate or sanitary goods</li>
              <li>Opened software or digital downloads</li>
              <li>Gift cards and vouchers</li>
              <li>Customized or personalized products</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Refund Process</h3>
            <p className="mb-4">
              Refunds are processed within 5-7 business days after receiving and inspecting returned items.
              Refunds are issued to the original payment method. Shipping charges are non-refundable unless
              the return is due to our error.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              All content on ShopEase, including text, graphics, logos, images, and software, is the property of
              ShopEase or its licensors and is protected by Indian and international copyright laws.
            </p>
            <p className="mb-4">
              You may not reproduce, distribute, modify, or create derivative works without our express written
              permission.
            </p>
          </section>

          {/* User Conduct */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Post false, misleading, or defamatory content</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in fraudulent activities</li>
              <li>Harvest or collect user information without consent</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, ShopEase shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of our services.
            </p>
            <p className="mb-4">
              Our total liability for any claim arising out of these terms shall not exceed the amount you paid
              for the product or service in question.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
            <p className="mb-4">
              Our services are provided "as is" and "as available" without warranties of any kind, either express
              or implied. We do not warrant that the website will be uninterrupted, error-free, or secure.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible for the content,
              privacy practices, or terms of service of third-party sites. Your use of third-party websites is
              at your own risk.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting. Your continued use of the website after changes constitutes acceptance
              of the modified terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="mb-4">
              These Terms and Conditions are governed by and construed in accordance with the laws of India.
              Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in
              New Delhi, India.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
            <p className="mb-4">
              If any provision of these terms is found to be invalid or unenforceable, the remaining provisions
              will continue in full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us at legal@shopease.com or write to us at
              45, MG Road, Connaught Place, New Delhi, Delhi 110001, India.
            </p>
          </section>

          {/* Acceptance */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-8">
            <p className="text-gray-700">
              <strong>By using ShopEase, you acknowledge that you have read, understood, and agree to be bound by
              these Terms and Conditions.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
