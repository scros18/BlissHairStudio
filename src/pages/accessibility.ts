export function renderAccessibilityPage(): string {
  return `
    <div class="legal-page">
      <div class="legal-hero">
        <div class="container">
          <h1>Accessibility Statement</h1>
          <p class="legal-subtitle">Last updated: October 23, 2025</p>
        </div>
      </div>
      
      <div class="legal-content">
        <div class="container">
          <div class="legal-section">
            <h2>Our Commitment</h2>
            <p>BlissHairStudio is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
          </div>

          <div class="legal-section">
            <h2>Conformance Status</h2>
            <p>We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.</p>
            <p>Our website has been designed with accessibility in mind, implementing features such as:</p>
            <ul>
              <li>Semantic HTML5 markup for better screen reader compatibility</li>
              <li>Keyboard navigation support throughout the site</li>
              <li>Sufficient color contrast ratios (WCAG AA compliant)</li>
              <li>Alternative text for images</li>
              <li>ARIA labels for interactive elements</li>
              <li>Responsive design that works on all devices and screen sizes</li>
              <li>Clear focus indicators for keyboard navigation</li>
              <li>Reduced motion support for users with vestibular disorders</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>Accessibility Features</h2>
            <h3>Navigation</h3>
            <ul>
              <li>Logical heading structure for easy navigation</li>
              <li>Skip to main content link</li>
              <li>Consistent navigation across all pages</li>
              <li>Descriptive link text</li>
            </ul>

            <h3>Visual Design</h3>
            <ul>
              <li>High contrast text against backgrounds</li>
              <li>Resizable text without loss of functionality</li>
              <li>Clear visual focus indicators</li>
              <li>Icons accompanied by text labels</li>
            </ul>

            <h3>Multimedia</h3>
            <ul>
              <li>Alternative text for all meaningful images</li>
              <li>Decorative images properly marked for screen readers</li>
              <li>Video content with captions (where applicable)</li>
            </ul>

            <h3>Forms</h3>
            <ul>
              <li>Clear labels for all form fields</li>
              <li>Error messages that are descriptive and helpful</li>
              <li>Form validation that doesn't rely solely on color</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>Assistive Technologies</h2>
            <p>Our website is designed to be compatible with the following assistive technologies:</p>
            <ul>
              <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>Alternative input devices</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>Known Limitations</h2>
            <p>Despite our best efforts to ensure accessibility, there may be some limitations. We are aware of the following issues and are working to address them:</p>
            <ul>
              <li>Some third-party embedded content may not be fully accessible</li>
              <li>Older PDF documents may not be fully screen reader compatible</li>
              <li>Some images from user-generated content may lack alternative text</li>
            </ul>
            <p>We are committed to resolving these issues in future updates.</p>
          </div>

          <div class="legal-section">
            <h2>Third-Party Content</h2>
            <p>We may link to third-party websites or include third-party content on our site. We are not responsible for the accessibility of content on third-party sites. However, we strive to work with partners who share our commitment to accessibility.</p>
          </div>

          <div class="legal-section">
            <h2>Feedback and Contact</h2>
            <p>We welcome your feedback on the accessibility of BlissHairStudio. Please let us know if you encounter accessibility barriers:</p>
            <div class="contact-info">
              <p><strong>Email:</strong> hello@blisshairstudio.com</p>
              <p><strong>Phone:</strong> +44 (0) 123 456 7890</p>
              <p><strong>Subject Line:</strong> Please use "Accessibility Feedback" in your subject line</p>
            </div>
            <p>We aim to respond to accessibility feedback within 5 business days. We will work with you to provide the information, item, or transaction in an accessible format.</p>
          </div>

          <div class="legal-section">
            <h2>Continuous Improvement</h2>
            <p>Accessibility is an ongoing effort. We regularly:</p>
            <ul>
              <li>Review our website for accessibility issues</li>
              <li>Test with assistive technologies</li>
              <li>Conduct user testing with people with disabilities</li>
              <li>Provide accessibility training to our team</li>
              <li>Update our accessibility statement as we make improvements</li>
            </ul>
          </div>

          <div class="legal-section">
            <h2>Technical Specifications</h2>
            <p>Accessibility of BlissHairStudio relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:</p>
            <ul>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript (ES6+)</li>
              <li>WAI-ARIA</li>
            </ul>
            <p>These technologies are relied upon for conformance with the accessibility standards used.</p>
          </div>

          <div class="legal-back">
            <a href="/" class="btn btn-primary">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
