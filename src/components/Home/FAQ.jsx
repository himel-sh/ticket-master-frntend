import Container from "../Shared/Container";
import Heading from "../Shared/Heading";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a ticket?",
      answer:
        "Browse available tickets, click 'See Details' on any ticket, select your quantity, and click 'Book Now'. Complete the payment process to confirm your booking.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes! You can cancel pending bookings from your 'My Orders' page. Once approved or paid, cancellation policies may apply. Contact support for assistance.",
    },
    {
      question: "How do I track my booking status?",
      answer:
        "Go to your Dashboard and click 'My Orders'. You'll see all your bookings with their current status (pending, approved, paid, or rejected).",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards and digital payment methods through our secure Stripe payment gateway. Your payment information is always encrypted and safe.",
    },
    {
      question: "How do I become a ticket seller?",
      answer:
        "Click 'Become a Seller' in your profile settings. Submit your details for admin approval. Once approved, you can start adding and selling tickets.",
    },
    {
      question: "What should I do if I have issues with my booking?",
      answer:
        "Contact our support team through the 'Contact Us' page or reach out via email. Our team is here to help resolve any issues quickly!",
    },
  ];

  return (
    <Container>
      <div className="py-16">
        <Heading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about TicketMaster"
          center={true}
        />

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-white border border-gray-200 rounded-lg hover:border-lime-300 transition"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-semibold text-gray-900">
                {faq.question}
              </div>
              <div className="collapse-content text-sm text-gray-600">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
