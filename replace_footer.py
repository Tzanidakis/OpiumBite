import os
import re

footer_html = """    <footer>
        <div class="footer-content">
            <div class="footer-column">
                <h3>About Us</h3>
                <p>We craft premium custom grillz and jewelry for those who demand excellence. Each piece is handmade with precision and care.</p>
                <div class="social-links">
                    <a href="#"><span class="material-symbols-outlined">facebook</span></a>
                    <a href="#"><span class="material-symbols-outlined">photo_camera</span></a>
                    <a href="#"><span class="material-symbols-outlined">smart_display</span></a>
                </div>
            </div>
            
            <div class="footer-column">
                <h3>Quick Links</h3>
                <a href="index.html">Home</a>
                <a href="index.html#collections">Collections</a>
                <a href="contact.html">Contact Us</a>
                <a href="about.html">About Us</a>
            </div>
            
            <div class="footer-column">
                <h3>Contact Info</h3>
                <p><span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 10px;">location_on</span> Heraklion</p>
                <p><span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 10px;">call</span> +30 6985071700</p>
                <p><span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 10px;">mail</span> info@opiumbite.com</p>
            </div>
            
            <div class="footer-column">
                <h3>Newsletter</h3>
                <p>Subscribe to get updates on new products and special offers.</p>
                <div class="newsletter-form">
                    <input type="email" placeholder="Your email address">
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2026 Opium Bite. All rights reserved.</p>
        </div>
    </footer>"""

directory = '.'
files = ['index.html', 'product.html', 'classic.html', 'iced-out.html', 'capital-custom.html', 'bracelets.html', 'earrings.html', 'necklaces.html', 'rings.html']

for file in files:
    filepath = os.path.join(directory, file)
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Use re.sub with DOTALL to replace everything from <footer> to </footer>
    # Note: re.sub will replace all occurrences. Since there's only one footer, it's fine.
    # The regex looks for any leading spaces followed by <footer>, then everything until </footer>
    new_content = re.sub(r'^[ \t]*<footer>.*?</footer>', footer_html, content, flags=re.DOTALL | re.MULTILINE)
    
    with open(filepath, 'w') as f:
        f.write(new_content)
        
print("Replaced footer in all 9 files")
