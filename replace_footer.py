from pathlib import Path
import re

HEADER = '''    <header id="main-header">
        <button class="material-symbols-outlined hamburger" id="hamburger-menu" type="button" aria-label="Open navigation menu" aria-controls="primary-navigation" aria-expanded="false">menu</button>
        <div class="logo" id="logo">
            <a href="index.html#home" aria-label="Opium Bite home"><img src="media/logo.png" alt="Opium Bite logo"></a>
        </div>
        <nav aria-label="Primary navigation">
            <div class="nav-links" id="primary-navigation">
                <a href="index.html#home" id="home-link">HOME</a>
                <div class="dropdown">
                    <a href="index.html#collections" id="collections-link">COLLECTIONS</a>
                    <div class="dropdown-content">
                        <div class="submenu">
                            <a class="submenu-trigger" href="grillz.html">Grillz <span aria-hidden="true">›</span></a>
                            <div class="submenu-content">
                                <a href="classic.html">Classic</a>
                                <a href="iced-out.html">Iced Out</a>
                                <a href="capital-custom.html">Opium</a>
                            </div>
                        </div>
                        <a href="bracelets.html">Bracelets</a>
                        <div class="submenu">
                            <a class="submenu-trigger" href="earrings.html">Earrings <span aria-hidden="true">›</span></a>
                            <div class="submenu-content">
                                <a href="earrings.html#classics">Classics</a>
                                <a href="earrings.html#opium">Opium</a>
                            </div>
                        </div>
                        <a href="necklaces.html">Pentals</a>
                        <a href="rings.html">Rings</a>
                    </div>
                </div>
                <a href="contact.html" id="contact-link">CONTACT</a>
                <a href="about.html" id="about-link">ABOUT US</a>
            </div>
            <div class="icons" aria-hidden="true">
                <span class="material-symbols-outlined">search</span>
            </div>
        </nav>
    </header>'''

FOOTER = '''    <footer>
        <div class="footer-content">
            <div class="footer-column">
                <h3>About Us</h3>
                <p>We craft premium custom grillz and jewelry for those who demand excellence. Each piece is handmade with precision and care.</p>
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><span class="material-symbols-outlined">facebook</span></a>
                    <a href="https://www.instagram.com/opium.bite/" aria-label="Instagram"><span class="material-symbols-outlined">photo_camera</span></a>
                    <a href="#" aria-label="YouTube"><span class="material-symbols-outlined">smart_display</span></a>
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
                <p><span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 10px;">mail</span> opiumbite@gmail.com</p>
            </div>
            <div class="footer-column">
                <h3>Newsletter</h3>
                <p>Subscribe to get updates on new products and special offers.</p>
                <div class="newsletter-form">
                    <input type="email" placeholder="Your email address" aria-label="Email address">
                    <button type="button">Subscribe</button>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Opium Bite. All rights reserved.</p>
        </div>
    </footer>'''

for path in Path('.').glob('*.html'):
    content = path.read_text()
    content = re.sub(r'\s*<header id="main-header">.*?</header>', '\n' + HEADER, content, count=1, flags=re.DOTALL)
    if re.search(r'<footer>.*?</footer>', content, flags=re.DOTALL):
        content = re.sub(r'\s*<footer>.*?</footer>', '\n\n' + FOOTER, content, count=1, flags=re.DOTALL)
    else:
        content = content.replace('</body>', FOOTER + '\n    </body>')
    content = re.sub(r'\s*<script>\s*const menu = document\.getElementById\(\'hamburger-menu\'\);.*?</script>', '', content, flags=re.DOTALL)
    if path.name != 'index.html' and 'site-chrome.js' not in content:
        content = content.replace('</body>', '    <script src="site-chrome.js" defer></script>\n</body>')
    path.write_text(content)

print('Standardized headers and footers across all secondary pages.')
