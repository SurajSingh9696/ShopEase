import { ShoppingBag, Users, Award, TrendingUp, Heart, Shield, Truck, Headphones } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Products', value: '10,000+', icon: ShoppingBag },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Countries', value: '25+', icon: TrendingUp },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above all else. Your happiness is our success.',
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product is carefully selected and verified to meet our high quality standards.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your products to you as fast as possible.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you with any questions or concerns.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description: 'Visionary leader with 20 years in e-commerce.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Tech innovator passionate about user experience.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: 'Operations expert ensuring seamless delivery.',
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      description: 'Dedicated to creating exceptional experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopEase</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Your trusted partner for quality products and exceptional shopping experiences since 2011.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 text-center">
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2011, ShopEase began as a small online store in New Delhi with a simple mission: to make
                  quality products accessible to everyone across India. What started in a small office has grown into one of
                  the most trusted e-commerce platforms, serving customers across India and 25 countries worldwide.
                </p>
                <p>
                  Our journey has been driven by a commitment to excellence, innovation, and customer
                  satisfaction. We've built lasting relationships with thousands of suppliers and millions
                  of customers who trust us to deliver the best shopping experience.
                </p>
                <p>
                  Today, we offer over 10,000 products across multiple categories, from electronics to
                  fashion, home goods to sports equipment. But no matter how much we grow, our core values
                  remain the same: quality, trust, and putting our customers first.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
                alt="Office"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400"
                alt="Team"
                className="rounded-lg shadow-md w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400"
                alt="Warehouse"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400"
                alt="Meeting"
                className="rounded-lg shadow-md w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core principles guide everything we do and help us deliver the best experience to our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our passionate team of experts is dedicated to making your shopping experience exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Be part of our growing community of satisfied customers. Start shopping today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </a>
            <a href="/contact" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
