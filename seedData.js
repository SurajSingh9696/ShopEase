const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Address = require('./models/Address');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const Payment = require('./models/Payment');
const Review = require('./models/Review');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed Data
const seedData = async () => {
  try {
    console.log('Starting data seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Address.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    await Payment.deleteMany({});
    await Review.deleteMany({});
    console.log('✓ Cleared existing data');

    // Drop old indexes that might cause conflicts
    try {
      await Order.collection.dropIndex('orderId_1');
      console.log('✓ Dropped old orderId index');
    } catch (error) {
      // Index might not exist, continue
    }

    // Create Users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        name: 'Admin User',
        age: 30,
        email: 'admin@shopease.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+1234567890',
        isBlocked: false
      },
      {
        name: 'John Doe',
        age: 28,
        email: 'john@example.com',
        password: hashedPassword,
        role: 'customer',
        phone: '+1234567891',
        isBlocked: false
      },
      {
        name: 'Jane Smith',
        age: 32,
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'customer',
        phone: '+1234567892',
        isBlocked: false
      },
      {
        name: 'Mike Johnson',
        age: 25,
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'customer',
        phone: '+1234567893',
        isBlocked: false
      },
      {
        name: 'Sarah Williams',
        age: 35,
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'customer',
        phone: '+1234567894',
        isBlocked: false
      }
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create Categories
    const categories = await Category.create([
      { name: 'Electronics', parentId: null },
      { name: 'Computers & Laptops', parentId: null },
      { name: 'Smartphones', parentId: null },
      { name: 'Tablets', parentId: null },
      { name: 'Home Appliances', parentId: null },
      { name: 'Fashion', parentId: null },
      { name: "Men's Clothing", parentId: null },
      { name: "Women's Clothing", parentId: null },
      { name: 'Shoes', parentId: null },
      { name: 'Accessories', parentId: null },
      { name: 'Sports & Outdoors', parentId: null },
      { name: 'Books', parentId: null },
      { name: 'Toys & Games', parentId: null },
      { name: 'Health & Beauty', parentId: null }
    ]);
    console.log(`✓ Created ${categories.length} categories`);

    // Create Products
    const products = await Product.create([
      // Electronics
      {
        title: 'MacBook Pro 16"',
        description: 'Apple MacBook Pro 16-inch with M2 Pro chip, 16GB RAM, 512GB SSD. Perfect for professionals and content creators.',
        price: 2499,
        category: ['Electronics', 'Computers & Laptops'],
        categoryId: [categories[0]._id, categories[1]._id],
        salePrice: 2299,
        sku: 'MBP-16-M2-512',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'],
        stock: 25,
        isActive: true
      },
      {
        title: 'iPhone 15 Pro Max',
        description: 'Latest iPhone 15 Pro Max with A17 Pro chip, 256GB storage, Titanium design, and advanced camera system.',
        price: 1199,
        category: ['Electronics', 'Smartphones'],
        categoryId: [categories[0]._id, categories[2]._id],
        salePrice: 1099,
        sku: 'IPH-15-PM-256',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1592286927505-c0d0c1b6e7f1?w=500', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
        stock: 50,
        isActive: true
      },
      {
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Samsung flagship phone with 200MP camera, S Pen, 12GB RAM, 512GB storage, and stunning display.',
        price: 1299,
        category: ['Electronics', 'Smartphones'],
        categoryId: [categories[0]._id, categories[2]._id],
        salePrice: null,
        sku: 'SAM-S24U-512',
        brand: 'Samsung',
        images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
        stock: 35,
        isActive: true
      },
      {
        title: 'iPad Air 5th Gen',
        description: 'iPad Air with M1 chip, 10.9" Liquid Retina display, 256GB storage. Perfect for productivity and entertainment.',
        price: 749,
        category: ['Electronics', 'Tablets'],
        categoryId: [categories[0]._id, categories[3]._id],
        salePrice: 699,
        sku: 'IPAD-AIR-M1-256',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
        stock: 40,
        isActive: true
      },
      {
        title: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling wireless headphones with premium sound quality and 30-hour battery life.',
        price: 399,
        category: ['Electronics', 'Accessories'],
        categoryId: [categories[0]._id, categories[9]._id],
        salePrice: 349,
        sku: 'SONY-WH1000XM5',
        brand: 'Sony',
        images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'],
        stock: 60,
        isActive: true
      },
      {
        title: 'Dell XPS 15',
        description: 'Premium laptop with Intel i7-13700H, 16GB RAM, 512GB SSD, and stunning 15.6" OLED display.',
        price: 1699,
        category: ['Electronics', 'Computers & Laptops'],
        categoryId: [categories[0]._id, categories[1]._id],
        salePrice: 1599,
        sku: 'DELL-XPS15-512',
        brand: 'Dell',
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'],
        stock: 20,
        isActive: true
      },
      // Home Appliances
      {
        title: 'Dyson V15 Detect',
        description: 'Powerful cordless vacuum with laser detection, intelligent suction, and up to 60 minutes runtime.',
        price: 749,
        category: ['Home Appliances'],
        categoryId: [categories[4]._id],
        salePrice: 699,
        sku: 'DYSON-V15-DET',
        brand: 'Dyson',
        images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'],
        stock: 30,
        isActive: true
      },
      {
        title: 'Nespresso Vertuo Next',
        description: 'Premium coffee maker with one-touch brewing, produces barista-quality coffee and espresso.',
        price: 199,
        category: ['Home Appliances'],
        categoryId: [categories[4]._id],
        salePrice: 179,
        sku: 'NESP-VERT-NEXT',
        brand: 'Nespresso',
        images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
        stock: 45,
        isActive: true
      },
      // Fashion
      {
        title: "Men's Classic Denim Jacket",
        description: 'Timeless denim jacket made from premium cotton. Perfect for casual wear in any season.',
        price: 89,
        category: ['Fashion', "Men's Clothing"],
        categoryId: [categories[5]._id, categories[6]._id],
        salePrice: 69,
        sku: 'MEN-DENIM-JKT-BL',
        brand: "Levi's",
        images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500'],
        stock: 100,
        isActive: true
      },
      {
        title: "Women's Floral Summer Dress",
        description: 'Beautiful floral pattern summer dress, lightweight and comfortable for warm weather.',
        price: 79,
        category: ['Fashion', "Women's Clothing"],
        categoryId: [categories[5]._id, categories[7]._id],
        salePrice: 59,
        sku: 'WOM-FLORAL-DRS-01',
        brand: 'Zara',
        images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'],
        stock: 80,
        isActive: true
      },
      {
        title: 'Nike Air Max 270',
        description: 'Iconic Nike Air Max sneakers with maximum cushioning and style. Available in multiple colors.',
        price: 150,
        category: ['Fashion', 'Shoes'],
        categoryId: [categories[5]._id, categories[8]._id],
        salePrice: 129,
        sku: 'NIKE-AM270-BLK',
        brand: 'Nike',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
        stock: 120,
        isActive: true
      },
      {
        title: 'Ray-Ban Aviator Sunglasses',
        description: 'Classic aviator sunglasses with polarized lenses and UV protection. Timeless style.',
        price: 165,
        category: ['Fashion', 'Accessories'],
        categoryId: [categories[5]._id, categories[9]._id],
        salePrice: 149,
        sku: 'RAY-AVI-GOLD',
        brand: 'Ray-Ban',
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
        stock: 75,
        isActive: true
      },
      // Sports & Outdoors
      {
        title: 'Yoga Mat Premium',
        description: 'Extra thick yoga mat with non-slip surface, perfect for yoga, pilates, and fitness exercises.',
        price: 39,
        category: ['Sports & Outdoors'],
        categoryId: [categories[10]._id],
        salePrice: 29,
        sku: 'YOGA-MAT-PREM-PUR',
        brand: 'Manduka',
        images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
        stock: 150,
        isActive: true
      },
      {
        title: 'Adjustable Dumbbell Set',
        description: 'Space-saving adjustable dumbbells, 5-52.5 lbs per dumbbell. Perfect for home gym.',
        price: 299,
        category: ['Sports & Outdoors'],
        categoryId: [categories[10]._id],
        salePrice: 279,
        sku: 'DUMB-ADJ-SET-52',
        brand: 'Bowflex',
        images: ['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500'],
        stock: 40,
        isActive: true
      },
      // Books
      {
        title: 'The Art of Programming',
        description: 'Comprehensive guide to modern programming practices, algorithms, and software design patterns.',
        price: 49,
        category: ['Books'],
        categoryId: [categories[11]._id],
        salePrice: 39,
        sku: 'BOOK-ART-PROG-01',
        brand: "O'Reilly",
        images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'],
        stock: 200,
        isActive: true
      },
      // Toys & Games
      {
        title: 'LEGO Star Wars Millennium Falcon',
        description: 'Iconic LEGO set with 7500+ pieces. Build the legendary Millennium Falcon from Star Wars.',
        price: 849,
        category: ['Toys & Games'],
        categoryId: [categories[12]._id],
        salePrice: 799,
        sku: 'LEGO-SW-MF-7541',
        brand: 'LEGO',
        images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'],
        stock: 15,
        isActive: true
      },
      // Health & Beauty
      {
        title: 'Vitamin C Serum',
        description: 'Premium vitamin C serum for face. Anti-aging, brightening, and hydrating properties.',
        price: 29,
        category: ['Health & Beauty'],
        categoryId: [categories[13]._id],
        salePrice: 24,
        sku: 'VITC-SERUM-30ML',
        brand: 'The Ordinary',
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'],
        stock: 300,
        isActive: true
      },
      {
        title: 'Electric Toothbrush Pro',
        description: 'Smart electric toothbrush with pressure sensor, 5 cleaning modes, and 2-week battery life.',
        price: 129,
        category: ['Health & Beauty'],
        categoryId: [categories[13]._id],
        salePrice: 99,
        sku: 'ORAL-B-PRO-9000',
        brand: 'Oral-B',
        images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500'],
        stock: 90,
        isActive: true
      }
    ]);
    console.log(`✓ Created ${products.length} products`);

    // Create Addresses
    const addresses = await Address.create([
      {
        userId: users[1]._id,
        line1: '123 Main Street',
        line2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001'
      },
      {
        userId: users[1]._id,
        line1: '456 Oak Avenue',
        line2: '',
        city: 'Brooklyn',
        state: 'NY',
        postalCode: '11201'
      },
      {
        userId: users[2]._id,
        line1: '789 Pine Road',
        line2: 'Suite 200',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90001'
      },
      {
        userId: users[3]._id,
        line1: '321 Elm Street',
        line2: '',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601'
      },
      {
        userId: users[4]._id,
        line1: '654 Maple Drive',
        line2: 'Unit 12',
        city: 'Houston',
        state: 'TX',
        postalCode: '77001'
      }
    ]);
    console.log(`✓ Created ${addresses.length} addresses`);

    // Create Carts
    const carts = await Cart.create([
      {
        userId: users[1]._id,
        items: [
          { productId: products[1]._id, quantity: 1 },
          { productId: products[4]._id, quantity: 2 }
        ]
      },
      {
        userId: users[2]._id,
        items: [
          { productId: products[0]._id, quantity: 1 },
          { productId: products[8]._id, quantity: 3 }
        ]
      },
      {
        userId: users[3]._id,
        items: [
          { productId: products[10]._id, quantity: 2 },
          { productId: products[12]._id, quantity: 1 }
        ]
      }
    ]);
    console.log(`✓ Created ${carts.length} carts`);

    // Create Orders
    const orders = await Order.create([
      {
        userId: users[1]._id,
        items: [
          {
            productId: products[0]._id,
            title: products[0].title,
            quantity: 1,
            price: products[0].salePrice || products[0].price
          }
        ],
        totalAmount: 2299,
        status: 'delivered',
        shippingAddress: {
          line1: addresses[0].line1,
          line2: addresses[0].line2,
          city: addresses[0].city,
          state: addresses[0].state,
          postalCode: addresses[0].postalCode
        }
      },
      {
        userId: users[2]._id,
        items: [
          {
            productId: products[2]._id,
            title: products[2].title,
            quantity: 1,
            price: products[2].price
          },
          {
            productId: products[4]._id,
            title: products[4].title,
            quantity: 1,
            price: products[4].salePrice || products[4].price
          }
        ],
        totalAmount: 1648,
        status: 'shipped',
        shippingAddress: {
          line1: addresses[2].line1,
          line2: addresses[2].line2,
          city: addresses[2].city,
          state: addresses[2].state,
          postalCode: addresses[2].postalCode
        }
      },
      {
        userId: users[3]._id,
        items: [
          {
            productId: products[10]._id,
            title: products[10].title,
            quantity: 2,
            price: products[10].salePrice || products[10].price
          }
        ],
        totalAmount: 258,
        status: 'processing',
        shippingAddress: {
          line1: addresses[3].line1,
          line2: addresses[3].line2,
          city: addresses[3].city,
          state: addresses[3].state,
          postalCode: addresses[3].postalCode
        }
      },
      {
        userId: users[4]._id,
        items: [
          {
            productId: products[15]._id,
            title: products[15].title,
            quantity: 1,
            price: products[15].salePrice || products[15].price
          }
        ],
        totalAmount: 799,
        status: 'pending',
        shippingAddress: {
          line1: addresses[4].line1,
          line2: addresses[4].line2,
          city: addresses[4].city,
          state: addresses[4].state,
          postalCode: addresses[4].postalCode
        }
      }
    ]);
    console.log(`✓ Created ${orders.length} orders`);

    // Create Payments
    const payments = await Payment.create([
      {
        userId: users[1]._id,
        orderId: orders[0]._id,
        amount: 2299,
        provider: 'stripe',
        status: 'completed',
        transactionId: `TXN-${Date.now()}-001`
      },
      {
        userId: users[2]._id,
        orderId: orders[1]._id,
        amount: 1648,
        provider: 'paypal',
        status: 'completed',
        transactionId: `TXN-${Date.now()}-002`
      },
      {
        userId: users[3]._id,
        orderId: orders[2]._id,
        amount: 258,
        provider: 'razorpay',
        status: 'pending',
        transactionId: `TXN-${Date.now()}-003`
      }
    ]);
    
    // Link payments to orders
    orders[0].paymentId = payments[0]._id;
    orders[1].paymentId = payments[1]._id;
    orders[2].paymentId = payments[2]._id;
    await Promise.all(orders.map(order => order.save()));
    
    console.log(`✓ Created ${payments.length} payments`);

    // Create Reviews
    const reviews = await Review.create([
      {
        productId: products[0]._id,
        userId: users[1]._id,
        rating: 5,
        comment: 'Absolutely love this MacBook! The M2 Pro chip is incredibly fast and the display is stunning. Perfect for video editing.'
      },
      {
        productId: products[0]._id,
        userId: users[2]._id,
        rating: 4,
        comment: 'Great laptop but quite expensive. Performance is top-notch though!'
      },
      {
        productId: products[1]._id,
        userId: users[3]._id,
        rating: 5,
        comment: 'Best iPhone yet! The camera quality is amazing and the titanium build feels premium.'
      },
      {
        productId: products[2]._id,
        userId: users[2]._id,
        rating: 5,
        comment: 'The S Pen integration is fantastic. Best Android phone on the market!'
      },
      {
        productId: products[4]._id,
        userId: users[1]._id,
        rating: 5,
        comment: 'These headphones are worth every penny. Noise cancellation is incredible!'
      },
      {
        productId: products[4]._id,
        userId: users[4]._id,
        rating: 4,
        comment: 'Great sound quality and comfortable to wear for long periods.'
      },
      {
        productId: products[6]._id,
        userId: users[3]._id,
        rating: 5,
        comment: 'Best vacuum I\'ve ever owned. The laser detection feature is amazing!'
      },
      {
        productId: products[8]._id,
        userId: users[4]._id,
        rating: 4,
        comment: 'Good quality denim jacket. Fits well and looks great!'
      },
      {
        productId: products[10]._id,
        userId: users[1]._id,
        rating: 5,
        comment: 'Super comfortable sneakers. Great for everyday wear and running.'
      },
      {
        productId: products[12]._id,
        userId: users[2]._id,
        rating: 5,
        comment: 'Best yoga mat I\'ve used. Non-slip and very comfortable!'
      },
      {
        productId: products[15]._id,
        userId: users[3]._id,
        rating: 5,
        comment: 'Amazing LEGO set! Took a while to build but absolutely worth it.'
      },
      {
        productId: products[17]._id,
        userId: users[4]._id,
        rating: 5,
        comment: 'This toothbrush has improved my oral health significantly. Highly recommend!'
      }
    ]);
    console.log(`✓ Created ${reviews.length} reviews`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Addresses: ${addresses.length}`);
    console.log(`   Carts: ${carts.length}`);
    console.log(`   Orders: ${orders.length}`);
    console.log(`   Payments: ${payments.length}`);
    console.log(`   Reviews: ${reviews.length}`);
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@shopease.com / password123');
    console.log('   Customer: john@example.com / password123');
    console.log('   Customer: jane@example.com / password123');
    console.log('   Customer: mike@example.com / password123');
    console.log('   Customer: sarah@example.com / password123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run seeding
connectDB().then(() => seedData());
