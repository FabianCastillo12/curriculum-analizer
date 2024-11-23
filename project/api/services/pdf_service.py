from pdfminer.high_level import extract_text_to_fp
from pdfminer.layout import LAParams
from io import StringIO
import tempfile
import asyncio

async def extract_text(pdf_file) -> str:
    """Extract text from uploaded PDF file."""
    try:
        # Create a temporary file to store the uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            content = await pdf_file.read()
            temp_file.write(content)
            temp_file.seek(0)
            
            # Extract text from PDF
            output_string = StringIO()
            with open(temp_file.name, 'rb') as pdf:
                extract_text_to_fp(pdf, output_string, laparams=LAParams())
            return output_string.getvalue()
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

# Sección de prueba
if __name__ == "__main__":
    class MockPDFFile:
        def __init__(self, file_path):
            self.file_path = file_path

        async def read(self):
            with open(self.file_path, 'rb') as f:
                return f.read()

    async def main():
        pdf_file = MockPDFFile('test.pdf')
        extracted_text = await extract_text(pdf_file)
        print("Extracted Text:")
        print(extracted_text)

    asyncio.run(main())