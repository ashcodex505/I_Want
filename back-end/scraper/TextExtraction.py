import pdfplumber

# Open the PDF file
with pdfplumber.open("/path/to/test.pdf") as pdf:
    # Initialize an empty string to hold all text
    text_data = ''

    # Iterate through each page of the PDF
    for page in pdf.pages:
        text_data += page.extract_text()

# Now, `text_data` contains all the text extracted from the PDF
print(text_data)
