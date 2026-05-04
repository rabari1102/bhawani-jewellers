import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Bhawani Jewellers',
  description: 'Terms and Conditions for Bhawani Jewellers, Palghar.',
};

export default function TermsPage() {
  return (
    <div className="section-pad bg-cream-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-gold-500 text-xs tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-serif text-4xl text-jewel-dark">Terms &amp; Conditions</h1>
          <p className="text-gray-400 text-sm mt-2">Last updated: April 2024</p>
        </div>
        <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">1. Introduction</h2>
            <p>These Terms and Conditions govern your use of the Bhawani Jewellers website and showroom services. By visiting our showroom or using our services, you agree to these terms. Please read them carefully.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">2. Products & Pricing</h2>
            <p>All jewellery products are subject to availability. Prices are inclusive of making charges but exclusive of GST unless stated otherwise. The displayed metal rate widget shows current retail rates; final billing may vary based on the date of purchase. We reserve the right to change prices without prior notice.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">3. Hallmarking & Purity</h2>
            <p>All gold jewellery sold by Bhawani Jewellers is BIS hallmarked. Hallmark details are provided on the invoice. In the event of any dispute regarding purity, the hallmark certificate and BIS testing shall be the final authority.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">4. Custom & Bespoke Orders</h2>
            <p>Custom and bespoke jewellery orders require a minimum 50% advance payment at the time of order confirmation. Cancellation of custom orders after fabrication has begun will result in forfeiture of the advance amount. Delivery timelines for bespoke pieces are estimates and may vary.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">5. Exchange Policy</h2>
            <p>We offer a jewellery exchange policy for gold jewellery purchased from Bhawani Jewellers, subject to a making charge deduction. Exchange values are calculated based on the prevailing metal rate at the time of exchange. Jewellery must be presented in its original condition along with the original purchase invoice.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">6. Services</h2>
            <p>Service timelines (redesign, valuation, hallmarking) are estimates. Bhawani Jewellers is not liable for delays caused by third-party service providers (e.g., BIS hallmarking centres). All items left for service must be accompanied by a service receipt.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">7. Limitation of Liability</h2>
            <p>Bhawani Jewellers shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the value of the specific product or service purchased.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">8. Privacy</h2>
            <p>We collect and store customer information (name, phone, email) for order processing and communication purposes only. We do not share customer data with third parties except as required by law. All customer data is stored securely.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">9. Governing Law</h2>
            <p>These terms shall be governed by the laws of the State of Maharashtra, India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Palghar, Maharashtra.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-jewel-dark mb-3">10. Contact</h2>
            <p>For any questions regarding these Terms and Conditions, please contact us at:<br/>Shop No 3, Opp. Hutatma Chowk, Mahim Road, Palghar West – 401404<br/>Phone: +91 86989 09955<br/>Email: info@bhawanijewellers.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
