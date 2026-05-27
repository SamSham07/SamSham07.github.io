import sys
path = r"d:\OneDrive\3. My Workplace\2. Projects\Qualification - Path to become CxS\Become GBI CxS\Individual Pre-Requisittes\3. Ir Sham Zhen Dong Applicant's CV.pdf"
try:
    from pypdf import PdfReader
    r = PdfReader(path)
    for i, p in enumerate(r.pages):
        print(f"===PAGE {i+1}===")
        print(p.extract_text() or "")
except Exception as e:
    print("ERR", e, file=sys.stderr)
    sys.exit(1)
