export function renderTermsPage(): string {
  return `
    <div class="legal-page">
      <div class="legal-hero">
        <div class="container">
          <h1>Terms of Service</h1>
          <p class="legal-subtitle">Last updated: October 23, 2025</p>
        </div>
      </div>
      
      <div class="legal-content">
        <div class="container">
          <div class="legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using the BlissHairStudio website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </div>

          <div class="legal-section">
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily access the materials (information or software) on BlissHairStudio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>3. Products and Services</h2>
            <p>All products and services are subject to availability. We reserve the right to discontinue any product or service at any time. Prices for our products are subject to change without notice.</p>
            <ul>
              <li>All prices are in GBP (£) unless otherwise stated</li>
              <li>We reserve the right to refuse any order placed with us</li>
              <li>Product images are for illustration purposes only</li>
              <li>We strive to display product colors accurately, but cannot guarantee exact color representation</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>4. Ordering and Payment</h2>
            <p>By placing an order, you warrant that:</p>
            <ul>
              <li>You are legally capable of entering into binding contracts</li>
              <li>You are at least 18 years old</li>
              <li>All information you provide is accurate and complete</li>
              <li>Payment information provided is valid and authorized</li>
            </ul>
            <p>We accept the following payment methods: major credit/debit cards and PayPal. Payment is processed securely through our payment providers.</p>
          </div>

          <div class="legal-section">
            <h2>5. Shipping and Delivery</h2>
            <p>We aim to dispatch orders within 1-2 business days. Delivery times vary based on location:</p>
            <ul>
              <li><strong>UK Standard Delivery:</strong> 3-5 business days</li>
              <li><strong>UK Express Delivery:</strong> 1-2 business days</li>
              <li><strong>International Delivery:</strong> 7-14 business days</li>
            </ul>
            <p>Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.</p>
          </div>

          <div class="legal-section">
            <h2>6. Returns and Refunds</h2>
            <p>We want you to be completely satisfied with your purchase. Our return policy includes:</p>
            <ul>
              <li>30-day return window for unused products in original packaging</li>
              <li>Products must be unopened and in resalable condition</li>
              <li>Return shipping costs are the responsibility of the customer unless the item is faulty</li>
              <li>Refunds will be processed within 7-10 business days of receiving the returned item</li>
              <li>Original shipping charges are non-refundable</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>7. User Account</h2>
            <p>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account and password</li>
              <li>Restricting access to your computer and account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>8. Intellectual Property</h2>
            <p>The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of BlissHairStudio and is protected by copyright, trademark, and other intellectual property laws.</p>
          </div>

          <div class="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>BlissHairStudio shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
          </div>

          <div class="legal-section">
            <h2>10. Modifications to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page. Your continued use of the website after such modifications constitutes your acceptance of the new terms.</p>
          </div>

          <div class="legal-section">
            <h2>11. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us:</p>
            <div class="contact-info">
              <p><strong>Email:</strong> hello@blisshairstudio.com</p>
              <p><strong>Phone:</strong> +44 (0) 123 456 7890</p>
              <p><strong>Address:</strong> BlissHairStudio, United Kingdom</p>
            </div>
          </div>

          <div class="legal-back">
            <a href="/" class="btn btn-primary">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
