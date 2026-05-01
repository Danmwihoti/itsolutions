import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const locations = [
    {
      name: 'Tetu Arcade G4',
      road: 'Tsavo Road',
      city: 'Nairobi',
      mapUrl: 'https://maps.google.com/?q=Tetu+Arcade+Tsavo+Road+Nairobi',
    },
    {
      name: 'Old Nation B27',
      road: 'Tom Mboya Street',
      city: 'Nairobi',
      mapUrl: 'https://maps.google.com/?q=Tom+Mboya+Street+Nairobi+Old+Nation',
    },
    {
      name: 'Iconic Plaza G1',
      road: 'Moi Avenue',
      city: 'Nairobi',
      mapUrl: 'https://maps.google.com/?q=Iconic+Plaza+Moi+Avenue+Nairobi',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">Phone (Dan)</h3>
                <a href="tel:0723559412" className="text-green-700 hover:underline">
                  0723559412
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Phone (Abdi)</h3>
                <a href="tel:0723559412" className="text-green-700 hover:underline">
                  0723559412
                </a>
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <a 
                  href="https://wa.me/0723559412" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h2 className="text-xl font-bold mb-4 text-green-800">Why Buy From Us?</h2>
            <ul className="space-y-2 text-green-700">
              <li>✓ 30-day warranty on all laptops</li>
              <li>✓ Physical shops - come see before you buy</li>
              <li>✓ M-Pesa payment accepted</li>
              <li>✓ Free pickup at any of our 3 locations</li>
              <li>✓ Delivery available within Nairobi (24hrs)</li>
              <li>✓ Quality-tested refurbished laptops</li>
            </ul>
          </section>
        </div>

        {/* Shop Locations */}
        <div>
          <h2 className="text-xl font-bold mb-4">Our Shops in Nairobi</h2>
          <div className="space-y-4">
            {locations.map(location => (
              <div key={location.name} className="bg-white p-6 rounded-lg border">
                <h3 className="font-bold text-lg">{location.name}</h3>
                <p className="text-gray-600">{location.road}</p>
                <p className="text-gray-600">{location.city}</p>
                <a 
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3"
                >
                  <Button variant="outline" size="sm">
                    Open in Google Maps
                  </Button>
                </a>
              </div>
            ))}
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-6 bg-blue-600 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
            <p className="mb-4">Chat with us on WhatsApp for personalized recommendations.</p>
            <a 
              href="https://wa.me/0723559412?text=Hi, I need help choosing a laptop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
