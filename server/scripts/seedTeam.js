const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const TeamMember = require('../models/TeamMember');

const teamMembers = [
  // Founding Members (founding)
  { name: "Vasudev Thakkar", designation: "Founder & Chairman", image: "/uploads/team/vasudev.png", bio: "Established the firm in 1989 with a vision to democratize financial literacy and empower families across India.", order: 1, category: 'founding' },
  { name: "Late Smt. Geetaben Thakkar", designation: "Co-Founder", image: "/uploads/team/geeta.png", bio: "The heart of our client-centric philosophy and relationship building. Her legacy continues to inspire our values.", order: 2, category: 'founding' },
  
  // Directors (director)
  { name: "Nikhil Thakkar", designation: "Managing Director", image: "/uploads/team/nikhil.png", bio: "Leading the firm's strategic expansion and digital-first advisory model with institutional precision.", order: 3, category: 'director' },
  { name: "Megha Thakkar", designation: "Director", image: "/uploads/team/megha.png", bio: "Ensuring operational excellence and superior client experience across all touchpoints.", order: 4, category: 'director' },
  { name: "Priyang Patel", designation: "Director", image: "/uploads/team/priyang.png", bio: "Driving innovation in wealth management and client portfolio optimization strategies.", order: 5, category: 'director' },
  { name: "Dwij Thakkar", designation: "Director", image: "/uploads/team/dwij.png", bio: "Spearheading technology integration and next-generation financial solutions.", order: 6, category: 'director' },
  
  // Leadership (leadership)
  { name: "Kamlesh Patel", designation: "Deputy Manager (Sales Support)", image: "/uploads/team/kamlesh.png", bio: "Orchestrating operational excellence and strategic execution across all business verticals.", order: 7, category: 'leadership' },
  { name: "Dr. H. K. Desai", designation: "Chief Operating Officer", image: "/uploads/team/hraday.png", bio: "Providing institutional wisdom and strategic guidance for long-term growth initiatives.", order: 8, category: 'leadership' },
  { name: "Hetal Mehta", designation: "Deputy Manager - Customer Relationship", image: "/uploads/team/hetal.png", bio: "Ensuring seamless sales operations and client onboarding excellence.", order: 9, category: 'leadership' },
  
  // Associate Partners (associate_partner)
  { name: "Rajesh Chauhan", designation: "Associate Partner", image: "/uploads/team/rajesh.png", bio: "Specializing in retirement solution and wealth preservation strategies.", order: 10, category: 'associate_partner' },
  { name: "Tushar Shah", designation: "Associate Partner", image: "/uploads/team/tushar.png", bio: "Driving business growth and client satisfaction in the Vadodara market.", order: 11, category: 'associate_partner' },
  { name: "Dharmesh Kunadia", designation: "Associate Partner", image: "/uploads/team/dharmesh.png", bio: "Leading client acquisition and relationship management in the Anand region.", order: 12, category: 'associate_partner' },
  { name: "Dhruvik Shah", designation: "Associate Partner", image: "/uploads/team/dhruvik.png", bio: "Managing high-net-worth client portfolios and strategic partnerships in Ahmedabad.", order: 13, category: 'associate_partner' },
  { name: "Pavan Sachdeva", designation: "Associate Partner", image: "/uploads/team/pavan.jpeg", bio: "Expanding our footprint in the Delhi NCR region with premium advisory services.", order: 14, category: 'associate_partner' },
  { name: "Amit Arora", designation: "Associate Partner", image: "/uploads/team/amit.png", bio: "Driving strategic partnerships and business expansion initiatives.", order: 15, category: 'associate_partner' },
  
  // Insurance Heads (insurance_head)
  { name: "Prakash Machhi", designation: "Associate Partner (Insurance - Personal Line)", image: "/uploads/team/prakash.png", bio: "Focusing on personal insurance solutions and client protection.", order: 16, category: 'insurance_head' },
  { name: "Nishith Pandya", designation: "Associate Partner (Insurance - Commercial Line)", image: "/uploads/team/nishith.png", bio: "Specializing in commercial insurance strategies and risk management.", order: 17, category: 'insurance_head' },
  
  // Relationship Managers (rm)
  { name: "Chintal Patel", designation: "Relationship Manager", image: "/uploads/team/chintal.png", bio: "Dedicated to building long-term client relationships and personalized wealth strategies.", order: 18, category: 'rm' },
  { name: "Dhruvi Sheth", designation: "Relationship Manager", image: "/uploads/team/dhruvi.png", bio: "Providing expert guidance on investment solution and portfolio optimization.", order: 19, category: 'rm' },
  { name: "Rohan Goswami", designation: "Relationship Manager", image: "/uploads/team/rohan.png", bio: "Focused on goal-based investing and comprehensive financial solution.", order: 20, category: 'rm' },
  { name: "Harikrushna Gadhvi", designation: "Relationship Manager", image: "/uploads/team/hari.png", bio: "Expert in mutual fund advisory and systematic investment solution.", order: 21, category: 'rm' },
  
  // Equity Head (equity_head)
  { name: "Pratik Shah", designation: "Equity Head", image: "/uploads/team/pratik.png", bio: "Conducting in-depth market analysis and stock recommendations.", order: 22, category: 'equity_head' }
];

const seedTeam = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for Team Seeding');

    // Clear existing team members to ensure enum/category is updated
    await TeamMember.deleteMany({});

    for (const member of teamMembers) {
      await TeamMember.create(member);
      console.log(`Seeded Team Member: ${member.name}`);
    }

    console.log('✅ Team Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Team Seeding failed:', err);
    process.exit(1);
  }
};

seedTeam();
