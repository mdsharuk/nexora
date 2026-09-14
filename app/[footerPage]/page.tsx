import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type FooterPage = {
  title: string;
  intro: string;
  sections: { title: string; body: string; items?: string[] }[];
  action?: { label: string; href: string };
  jobs?: { title: string; overview: string; responsibilities: string[]; skills: string[]; experience: string; education: string; benefits: string[]; location: string; deadline: string }[];
};

const pages: Record<string, FooterPage> = {
  about: {
    title: "About Nexora Tech",
    intro: "Technology for What's Next. We make it simpler to find the computers, components, and gadgets that suit your needs.",
    sections: [
      { title: "Who we are", body: "Nexora Tech is a customer-first technology retailer in Bangladesh. We bring trusted products, helpful guidance, and dependable support together in one place." },
      { title: "Our promise", body: "We focus on transparent prices, genuine products, and an easy shopping experience from product discovery through after-sales support.", items: ["Genuine technology products", "Clear and competitive pricing", "Helpful customer support"] },
    ],
    action: { label: "Contact Us", href: "/contact" },
  },
  contact: {
    title: "Contact Us",
    intro: "Our team is here to help with product advice, orders, delivery, and after-sales support.",
    sections: [
      { title: "Get in touch", body: "For sales support, email sales@nexoratech.com or call our Laptop Hotline at +880 18*******. Please include your product name or order number so we can assist you quickly." },
      { title: "Support hours", body: "Our customer support team is available during regular business hours. Messages received outside these hours will be answered on the next working day." },
    ],
    action: { label: "Help Center", href: "/help" },
  },
  careers: {
    title: "Careers at Nexora Tech",
    intro: "Build the future of technology retail with a team that cares about great products and exceptional customer experiences.",
    sections: [{ title: "Join our team", body: "We welcome people who are curious, capable, and excited to make technology easier for everyone." }],
    jobs: [
      { title: "Video Presenter", overview: "We are looking for a confident video presenter to bring our products to life through engaging, informative videos.", responsibilities: ["Host and present product videos, tutorials, and promotional content", "Collaborate with the creative team on scripts and video concepts", "Research products and explain their features clearly", "Maintain a professional, customer-friendly on-camera presence"], skills: ["Excellent presentation and communication skills", "Comfortable speaking in Bangla and English", "Strong interest in technology and consumer products", "Basic understanding of social-media video trends"], experience: "1–2 years in video presentation, content creation, or a related role.", education: "Bachelor's degree preferred; relevant experience is welcome.", benefits: ["Lunch facility and coffee", "Festival bonuses", "Yearly salary review", "Paid casual, sick, maternity, and annual leave"], location: "Nexora Tech, Dhaka, Bangladesh", deadline: "30 September 2026" },
      { title: "Videographer", overview: "Help us create polished visual content that tells the story of our products, people, and services.", responsibilities: ["Shoot and edit product, campaign, and social-media videos", "Plan video concepts with the creative and marketing teams", "Operate cameras, lighting, and audio equipment", "Maintain an organized archive of video assets"], skills: ["Proven experience with camera operation and video editing", "Knowledge of Adobe Premiere Pro or equivalent tools", "Strong sense of composition, lighting, and storytelling", "Ability to work independently and meet deadlines"], experience: "1–2 years of relevant videography or editing experience.", education: "Bachelor's degree preferred; portfolio submission is required.", benefits: ["Lunch facility and coffee", "Festival bonuses", "Yearly salary review", "Paid casual, sick, maternity, and annual leave"], location: "Nexora Tech, Dhaka, Bangladesh", deadline: "30 September 2026" },
      { title: "Team Lead – E-commerce Operations", overview: "Lead day-to-day e-commerce operations and help deliver a smooth, reliable shopping experience for every customer.", responsibilities: ["Manage order processing, fulfilment, and customer-service workflows", "Coordinate with sales, delivery, and support teams", "Monitor operational performance and improve processes", "Guide and support a high-performing operations team"], skills: ["Strong leadership and e-commerce operations experience", "Excellent communication and problem-solving skills", "Confident with reports, spreadsheets, and operational data", "Ability to prioritize effectively in a fast-paced environment"], experience: "3+ years in e-commerce operations, retail operations, or a related role.", education: "Bachelor's degree in Business Administration, Management, or a related field.", benefits: ["Competitive salary package", "Festival bonuses", "Yearly salary review", "Health and leave benefits"], location: "Nexora Tech, Dhaka, Bangladesh", deadline: "30 September 2026" },
      { title: "Internship Opportunity", overview: "Start your technology career with hands-on experience in sales, marketing, content, and e-commerce operations.", responsibilities: ["Support assigned teams with day-to-day tasks", "Assist with research, documentation, and customer communication", "Learn practical workflows from experienced team members"], skills: ["Eagerness to learn and a positive attitude", "Good communication and organization skills", "Basic computer and internet skills"], experience: "No prior experience required.", education: "Undergraduate or recently graduated students are encouraged to apply.", benefits: ["Mentorship and practical experience", "Internship completion certificate", "Performance-based opportunity for a full-time role"], location: "Nexora Tech, Dhaka, Bangladesh", deadline: "30 September 2026" },
    ],
  },
  blog: { title: "Nexora Tech Blog", intro: "Practical buying guides, product news, and technology tips from the Nexora Tech team.", sections: [{ title: "Technology made clearer", body: "Explore advice on choosing laptops, building PCs, comparing components, and getting more from your devices." }, { title: "Latest updates", body: "New articles and buying guides will appear here. Check back soon for fresh technology insights." }] },
  help: { title: "Help Center", intro: "Find answers and get the support you need before and after your purchase.", sections: [{ title: "How can we help?", body: "Our support team can help with product information, placing an order, payments, delivery, and warranty questions.", items: ["Product and stock information", "Order and delivery assistance", "Payment and warranty support"] }], action: { label: "Contact Support", href: "/contact" } },
  "track-order": { title: "Track Order", intro: "Keep up to date with your Nexora Tech order.", sections: [{ title: "Track your delivery", body: "Please contact our support team with your order number and the phone number used at checkout. We will confirm your current order and delivery status." }, { title: "Need help?", body: "If your delivery is delayed or you need to update an order, contact us as soon as possible." }], action: { label: "Contact Support", href: "/contact" } },
  returns: { title: "Returns & Refunds", intro: "We aim to make returns and refunds clear and straightforward.", sections: [{ title: "Return requests", body: "If an item arrives damaged, incorrect, or has a verified issue, contact our support team promptly with your order details and supporting photos where applicable." }, { title: "Refund process", body: "Once a return is reviewed and approved, the refund method and timeline will be confirmed by our support team." }] },
  shipping: { title: "Shipping Information", intro: "Delivery information for orders placed at Nexora Tech.", sections: [{ title: "Delivery options", body: "Delivery availability, fees, and estimated timelines may vary by location and product type. Your delivery details are confirmed during checkout." }, { title: "Receiving your order", body: "Please check your contact information carefully and inspect your package when it arrives. Contact us promptly if there is a problem." }] },
  faq: { title: "Frequently Asked Questions", intro: "Quick answers to common Nexora Tech questions.", sections: [{ title: "Are products genuine?", body: "We are committed to offering genuine products with applicable brand or seller warranty information." }, { title: "How can I place an order?", body: "Choose a product, select Buy Now, then complete your delivery and payment details at checkout." }, { title: "How do I get order help?", body: "Contact our support team with your order details and we will be happy to assist." }], action: { label: "Contact Us", href: "/contact" } },
  privacy: { title: "Privacy Policy", intro: "How Nexora Tech handles information collected through our website and services.", sections: [{ title: "Information we use", body: "We use the information you provide, such as contact and delivery details, to process orders, provide support, and improve our services." }, { title: "Protecting your information", body: "We take reasonable steps to protect personal information and only share it when needed to deliver your order, provide support, or meet legal obligations." }] },
  terms: { title: "Terms & Conditions", intro: "The terms that apply when using the Nexora Tech website and placing an order.", sections: [{ title: "Orders and availability", body: "Orders are subject to product availability, verification, and acceptance. Product details, pricing, and offers may change without notice." }, { title: "Customer responsibilities", body: "Please provide accurate contact and delivery information and review your order carefully before confirmation." }] },
  warranty: { title: "Warranty Policy", intro: "Warranty coverage and support information for products purchased from Nexora Tech.", sections: [{ title: "Warranty coverage", body: "Warranty terms vary by product and manufacturer. Please review the warranty information shown on the product page or provided with the item." }, { title: "Making a warranty claim", body: "Keep your invoice and contact our support team with your order details and a description of the issue." }], action: { label: "Contact Support", href: "/contact" } },
  exchange: { title: "Exchange Policy", intro: "Information about exchanges for eligible Nexora Tech purchases.", sections: [{ title: "Eligibility", body: "Exchange requests are reviewed based on product condition, packaging, accessories, and the applicable product policy." }, { title: "Request an exchange", body: "Contact us promptly with your order number and details of the product you would like to exchange." }], action: { label: "Contact Support", href: "/contact" } },
};

export async function generateMetadata({ params }: { params: Promise<{ footerPage: string }> }) {
  const { footerPage } = await params;
  const page = pages[footerPage];
  return { title: page ? `${page.title} | Nexora Tech` : "Page Not Found | Nexora Tech" };
}

export default async function FooterInformationPage({ params }: { params: Promise<{ footerPage: string }> }) {
  const { footerPage } = await params;
  const page = pages[footerPage];
  if (!page) notFound();

  return <>
    <Header breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]} />
    <main className="footer-page">
      <article className="footer-page__content">
        <span className="footer-page__eyebrow">Nexora Tech</span>
        <h1>{page.title}</h1>
        <p className="footer-page__intro">{page.intro}</p>
        <div className="footer-page__sections">
          {page.sections.map((section) => <section key={section.title} className="footer-page__card">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>)}
        </div>
        {page.jobs && <div className="career-jobs">
          {page.jobs.map((job) => <article className="career-job" key={job.title}>
            <h2>{job.title}</h2>
            <p className="career-job__overview">{job.overview}</p>
            <div className="career-job__grid">
              <div><h3>Job Responsibilities</h3><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>Skills Required</h3><ul>{job.skills.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <dl className="career-job__details"><div><dt>Experience Required</dt><dd>{job.experience}</dd></div><div><dt>Educational Background</dt><dd>{job.education}</dd></div><div><dt>Benefits</dt><dd><ul>{job.benefits.map((item) => <li key={item}>{item}</li>)}</ul></dd></div><div><dt>Office Location</dt><dd>{job.location}</dd></div><div><dt>Application Deadline</dt><dd>{job.deadline}</dd></div></dl>
            <p className="career-job__apply">Email your CV and expected salary to <a href="mailto:careers@nexoratech.com">careers@nexoratech.com</a> with the subject line “{job.title}”.</p>
          </article>)}
        </div>}
        {page.action && <Link className="footer-page__action" href={page.action.href}>{page.action.label}</Link>}
      </article>
    </main>
    <Footer />
  </>;
}
