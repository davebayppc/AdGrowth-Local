import os
import glob
import re

base_dir = r"c:\Users\David M Bayas\OneDrive\Documents\DAVID DOCS\ANTIGRAVITY\ONLINE ADS TEST SITE"

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Update Footer
    # Looking for <div class="footer-bottom">
    if '<div class="footer-bottom">' in content:
        is_es = '/es/' in filepath.replace('\\', '/') or filepath.endswith('\\es\\index.html')
        footer_text = "Sirviendo a empresas en todo EE. UU." if is_es else "Serving businesses across the USA."
        
        # Replace <div class="footer-bottom">...
        # We can use regex to inject the paragraph right after <div class="footer-bottom">
        # Or simpler:
        if '<p style="margin-bottom: 0.5rem; color: #ccc;">' not in content:
            content = content.replace('<div class="footer-bottom">', f'<div class="footer-bottom">\n                <p style="margin-bottom: 0.5rem; color: #ccc;">{footer_text}</p>')
            
    # 2. Update Contact Forms
    if 'type="submit"' in content or 'type="submit"' in content:
        is_es = '/es/' in filepath.replace('\\', '/') or filepath.endswith('\\es\\index.html')
        submit_helper = "Actualmente aceptando nuevos socios dentro de los Estados Unidos." if is_es else "Currently accepting new partners within the United States."
        
        # Add helper text below the submit button. We look for a button or input with type submit.
        # It might look like <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
        # We can use regex to add the helper after the submit button
        if 'Currently accepting new partners' not in content and 'Actualmente aceptando nuevos socios' not in content:
            content = re.sub(r'(<button[^>]*type="submit"[^>]*>.*?</button>)', 
                             r'\1\n                    <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem; text-align: center;">' + submit_helper + r'</p>', 
                             content, flags=re.IGNORECASE)
    
    # 3. Hero Section
    if 'Small Local Business Ad Management' in content:
        if 'for US-Based Businesses Only.' not in content:
            content = content.replace('Small Local Business Ad Management</h1>', 
                                      'Small Local Business Ad Management</h1>\n            <p style="color: var(--color-primary); font-weight: 500; font-size: 1.1rem; margin-top: -0.5rem; margin-bottom: 1rem; text-shadow: 0px 1px 5px rgba(0,0,0,0.5);">for US-Based Businesses Only.</p>')
    
    if 'Gestión de Anuncios para Pequeños Negocios Locales' in content:
         if 'Solamente para Empresas en EE. UU.' not in content:
            content = content.replace('Gestión de Anuncios para Pequeños Negocios Locales</h1>', 
                                      'Gestión de Anuncios para Pequeños Negocios Locales</h1>\n            <p style="color: var(--color-primary); font-weight: 500; font-size: 1.1rem; margin-top: -0.5rem; margin-bottom: 1rem; text-shadow: 0px 1px 5px rgba(0,0,0,0.5);">Solamente para Empresas en EE. UU.</p>')

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

print("Done")
