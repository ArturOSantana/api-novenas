import urllib.request
import urllib.parse
import re

def search_duckduckgo(query):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            results = []
            matches = re.findall(r'<a class="result__snippet"[^>]* href="([^"]+)"[^>]*>(.*?)</a>', html, re.DOTALL)
            if not matches:
                matches = re.findall(r'<a class="result__url" href="([^"]+)".*?<td class="result__snippet">(.*?)</td>', html, re.DOTALL)
            for href, snippet in matches[:5]:
                clean_snippet = re.sub(r'<[^>]+>', '', snippet).strip()
                results.append((href, clean_snippet))
            return results
    except Exception as e:
        return [("Error", str(e))]

print("=== FRASSATI ===")
for r in search_duckduckgo("novena pier giorgio frassati oração tradicional"):
    print(r)

print("=== SANTO AGOSTINHO ===")
for r in search_duckduckgo("novena de santo agostinho oração original"):
    print(r)

print("=== SÃO TARCÍSIO ===")
for r in search_duckduckgo("novena de sao tarcisio oração oficial"):
    print(r)

print("=== SANTA JOANA D'ARC ===")
for r in search_duckduckgo("novena de santa joana darc oração tradicional"):
    print(r)
