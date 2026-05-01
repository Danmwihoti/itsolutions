export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p>Phone: 0723559412 (Dan)</p>
            <p>Phone: 0723559412 (Abdi)</p>
            <a 
              href="https://wa.me/0723559412" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Shop Locations */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Shops</h3>
            <ul className="space-y-2">
              <li>Tsavo Road (Tetu Arcade G4)</li>
              <li>Tom Mboya Street (Old Nation B27)</li>
              <li>Moi Avenue (Iconic Plaza G1)</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="hover:text-green-400">All Laptops</a></li>
              <li><a href="/contact" className="hover:text-green-400">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-green-400">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Kenyan IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
