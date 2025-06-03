export const monthlyPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "1 AI-Tailored Resume per day",
      "Standard AI Models",
      "Basic Template",
      "Community Support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Standard",
    price: "$9.99",
    priceSuffix: "/ month",
    features: [
      "20 AI-Tailored Resumes per day",
      "Access to Gemini & Premium AI Models",
      "Multiple Professional Templates (Coming Soon)",
      "Priority Email Support",
      "Review parsed data & add details",
    ],
    cta: "Go Pro",
    popular: true,
    paymentLink:
      "https://test.checkout.dodopayments.com/buy/pdt_nOlqoNZ6bqkzpp3NPSI4Z?quantity=1&redirect_url=https://jobfitresume.vercel.app%2Fverify-payment&metadata_uid=",
  },
  {
    name: "Premium",
    price: "$19.99",
    priceSuffix: "/ month",
    features: [
      "Unlimited AI-Tailored Resumes",
      "Access to Gemini & Premium AI Models",
      "All Templates & Future Designs (Coming Soon)",
      "Priority Email Support",
      "Review parsed data & add details",
      "Cover Letter Generation (Coming Soon)",
    ],
    cta: "Go Unlimited",
    popular: false,
    paymentLink:
      "https://test.checkout.dodopayments.com/buy/pdt_nOlqoNZ6bqkzpp3NPSI4Z?quantity=1&redirect_url=https://jobfitresume.vercel.app%2Fverify-payment",
  },
];

export const halfYearlyPlans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "1 AI-Tailored Resume per day",
      "Standard AI Models",
      "Basic Template",
      "Community Support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Standard",
    price: "$49.99", // Approx. $8.33/month * 6, slight discount
    priceSuffix: "/ 6 months",
    features: [
      "20 AI-Tailored Resumes per day",
      "Access to Gemini & Premium AI Models",
      "Multiple Professional Templates (Coming Soon)",
      "Priority Email Support",
      "Review parsed data & add details",
    ],
    cta: "Go Pro (Half-Yearly)",
    popular: true,
    paymentLink:
      "https://test.checkout.dodopayments.com/buy/pdt_nOlqoNZ6bqkzpp3NPSI4Z?quantity=1&redirect_url=https://jobfitresume.vercel.app%2Fverify-payment",
  },
  {
    name: "Premium",
    price: "$99.99", // Approx. $16.67/month * 6, slight discount
    priceSuffix: "/ 6 months",
    features: [
      "Unlimited AI-Tailored Resumes",
      "Access to Gemini & Premium AI Models",
      "All Templates & Future Designs (Coming Soon)",
      "Priority Email Support",
      "Review parsed data & add details",
      "Cover Letter Generation (Coming Soon)",
    ],
    cta: "Go Unlimited (Half-Yearly)",
    popular: false,
    paymentLink:
      "https://test.checkout.dodopayments.com/buy/pdt_nOlqoNZ6bqkzpp3NPSI4Z?quantity=1&redirect_url=https://jobfitresume.vercel.app%2Fverify-payment",
  },
];
