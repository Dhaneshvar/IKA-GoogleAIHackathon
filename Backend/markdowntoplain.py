from bs4 import BeautifulSoup
from markdown import markdown
import re

def markdown_to_text(markdown_string):
    """ Converts a markdown string to plaintext """

    # md -> html -> text since BeautifulSoup can extract text cleanly
    html = markdown(markdown_string)
    print("HTML", html)
    # remove code snippets
    html = re.sub(r'<pre>(.*?)</pre>', ' ', html)
    html = re.sub(r'<code>(.*?)</code >', ' ', html)

    # extract text
    soup = BeautifulSoup(html, "html.parser")
    text = ''.join(soup.findAll(text=True))
    print("DAI",text)
    return text

# pip install bs4
# pip install Markdown

'''
import markdown
import html2text
 
def markdown_to_text(markdown_text):
    print("came")
    # Convert Markdown to HTML
    html = markdown.markdown(markdown_text)
    # Convert HTML to plain text
    plain_text = html2text.html2text(html)
    print("plain")
    return plain_text

# pip install markdown html2text
'''