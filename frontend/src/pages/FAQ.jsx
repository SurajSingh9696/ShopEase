import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 5-7 business days. Express shipping is available and takes 2-3 business days. International orders may take 10-15 business days depending on the destination.',
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "Orders" section. Click on any order to view detailed tracking information.',
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes! We ship to over 25 countries worldwide. Shipping costs and delivery times vary by location. You can see available shipping options and costs at checkout.',
        },
        {
          question: 'Can I change my shipping address after placing an order?',
          answer: 'If your order hasn\'t shipped yet, contact our customer support team immediately at support@shopease.com. We\'ll do our best to update the address. Once shipped, we cannot change the delivery address.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and in the same condition you received them. Electronics and software have specific return requirements - please check the product page for details.',
        },
        {
          question: 'How do I return an item?',
          answer: 'Log into your account, go to Orders, and select the item you want to return. Click "Request Return" and follow the instructions. You\'ll receive a prepaid return label via email. Ship the item back and we\'ll process your refund once received.',
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are typically processed within 5-7 business days after we receive your return. The funds will be credited to your original payment method. Please allow an additional 3-5 business days for the amount to appear in your account.',
        },
        {
          question: 'Are there any items that cannot be returned?',
          answer: 'Yes, for hygiene and safety reasons, we cannot accept returns on: personal care items, undergarments, opened software, gift cards, and customized products. Perishable items are also non-returnable.',
        },
      ],
    },
    {
      category: 'Payment & Pricing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with industry-standard encryption.',
        },
        {
          question: 'Is it safe to use my credit card on your site?',
          answer: 'Absolutely! We use SSL encryption and comply with PCI-DSS standards to protect your payment information. We never store your full credit card details on our servers.',
        },
        {
          question: 'Do you offer price matching?',
          answer: 'Yes! If you find a lower price on an identical item from an authorized retailer, contact us within 7 days of purchase. We\'ll match the price and refund the difference if the claim is verified.',
        },
        {
          question: 'Do you have sales or promotional codes?',
          answer: 'Yes! Sign up for our newsletter to receive exclusive discounts and be the first to know about sales. You can also follow us on social media for flash sales and limited-time offers.',
        },
      ],
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Register" in the top navigation, fill in your details (name, email, password), and click "Create Account". You\'ll receive a confirmation email. Creating an account lets you track orders, save addresses, and checkout faster.',
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Login" and then "Forgot Password". Enter your email address and we\'ll send you a password reset link. Follow the link to create a new password. If you don\'t receive the email, check your spam folder.',
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log into your account and go to "Profile" or "Account Settings". You can update your name, email, phone number, and addresses. Remember to click "Save Changes" when you\'re done.',
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes! We take privacy seriously. Your data is encrypted and stored securely. We never share your personal information with third parties without your consent. Read our Privacy Policy for full details.',
        },
      ],
    },
    {
      category: 'Products & Availability',
      questions: [
        {
          question: 'How do I know if an item is in stock?',
          answer: 'Stock availability is shown on each product page. If an item is out of stock, you can click "Notify Me" to receive an email when it\'s back in stock. Popular items may sell out quickly during sales.',
        },
        {
          question: 'Are your product images accurate?',
          answer: 'We strive to provide accurate product images and descriptions. However, colors may vary slightly due to screen settings. Check the product specifications and customer reviews for additional details.',
        },
        {
          question: 'Do you offer product warranties?',
          answer: 'Most products come with manufacturer warranties. Coverage varies by brand and product type. Warranty information is listed on the product page. We also offer extended warranty options at checkout for eligible items.',
        },
        {
          question: 'Can I pre-order upcoming products?',
          answer: 'Yes! When pre-orders are available, you\'ll see a "Pre-Order" button on the product page. You\'ll be charged when you place the order, and the item will ship on the release date. You can cancel pre-orders anytime before shipping.',
        },
      ],
    },
    {
      category: 'Customer Support',
      questions: [
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via email at support@shopease.com, call us at +1 (555) 123-4567 (Mon-Fri, 9 AM - 6 PM), or use the live chat on our website. We typically respond to emails within 24 hours.',
        },
        {
          question: 'Do you have a live chat feature?',
          answer: 'Yes! Look for the chat icon in the bottom-right corner of any page. Our support team is available during business hours (Mon-Fri, 9 AM - 6 PM EST) to answer your questions in real-time.',
        },
        {
          question: 'Can I speak to someone about a specific order?',
          answer: 'Of course! Contact our support team with your order number. We can help with order status, shipping questions, returns, and any other concerns. Have your order number ready for faster assistance.',
        },
        {
          question: 'How do I leave product feedback?',
          answer: 'After receiving your order, log into your account and go to "Orders". Click on the product and select "Write a Review". Your feedback helps other customers make informed decisions and helps us improve!',
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">FAQ</h1>
          </div>
          <p className="text-xl text-primary-100 text-center max-w-2xl mx-auto">
            Find answers to commonly asked questions about shopping with ShopEase.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={category.category} className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {openIndex === `${categoryIndex}-${questionIndex}` ? (
                          <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openIndex === `${categoryIndex}-${questionIndex}` && (
                        <div className="p-4 pt-0 bg-gray-50">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try searching with different keywords or browse all categories above.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our customer support team is here to help!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@shopease.com"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
