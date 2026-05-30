import React from 'react';

const TermsPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">Terms of Use</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {[
          ['1. Acceptance of Terms', 'By accessing and using Local Bites, you accept and agree to be bound by the terms and conditions of this agreement.'],
          ['2. User Responsibilities', 'Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.'],
          ['3. Content Guidelines', 'Reviews and ratings must be honest and based on actual experiences. Inappropriate or false content will be removed.'],
          ['4. Privacy', 'We respect your privacy and handle your data according to our Privacy Policy. Location data is used solely to provide nearby vendor recommendations.'],
          ['5. Limitation of Liability', 'Local Bites is a platform connecting users with food vendors. We are not responsible for the quality of food or services provided by vendors listed on our platform.'],
        ].map(([title, text]) => (
          <div key={title}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-700">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TermsPage;
