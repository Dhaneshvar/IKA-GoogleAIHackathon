from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.chains.retrieval_qa.base import RetrievalQA
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import warnings
import os
import json
from userDetailStore import getUserProfile
from markdowntoplain import markdown_to_text

# Define a simple filter function to ignore warnings containing specific text
def ignore_specific_warning(message, category, filename, lineno, file=None, line=None):
    return "Multiple definitions in dictionary" in str(message)

# Apply the filter
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=RuntimeWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.showwarning = ignore_specific_warning


# Define fixed Google API Key
GOOGLE_API_KEY = "AI*************************z-64"

# Define model
model = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY,
                               temperature=0.2, convert_system_message_to_human=True)

def Pdf_extract_GeminiCall(user_text):

    directory = r"C:\Users\MuraliDh\Local Documents\Googl Gen AI\Backend\knowledge_base"

    all_files = os.listdir(directory)

    pdf_files = [file for file in all_files if file.endswith(".pdf")]


    all_pages = []

    for pdf_file in pdf_files:
 
        file_path = os.path.join(directory, pdf_file)
        

        pdf_loader = PyPDFLoader(file_path)
        pages = pdf_loader.load_and_split()
        

        all_pages.extend(pages)


    context = "\n\n".join(str(p.page_content) for p in all_pages)

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    texts = text_splitter.split_text(context)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY)
    vector_index = Chroma.from_texts(texts, embeddings).as_retriever(search_kwargs={"k": 4})

    resultData = getUserProfile()


    shop_type =  resultData['shoptype']
    shop_description = resultData['description']
    years_in_business = resultData['yearofexperience']
    customer_interests = "Mainly families and individuals looking for everyday essentials. Interest in locally sourced products and organic options."
    geographic_location = f"Suburban neighborhood with a mix of residential and commercial areas in {resultData['location']}"


    user_question = user_text

    template = PromptTemplate.from_template(
        template=f"""As an expert guidance provider for small-scale or kirana shops, your role is to utilize your expertise along with Gemini capabilities to answer queries effectively. 
        You should act as an advisor who provides insightful recommendations and solutions tailored to the needs of such businesses.
        
        Use Gemini to search for the most relevant information based on your user profile.
        
        User Profile:
        Shop Type: {shop_type}
        Shop Description: {shop_description}
        Years in Business: {years_in_business}
        Customer Interests: {customer_interests}
        Geographic Location: {geographic_location}
        
        user question : {user_question}

        context:{{context}}
        Important instruction don't return the response in markdown format please strictly return it in plain text only
        Helpful Answer:
        """,
        template_format="f-string",
        partial_variables={},
    )


    QA_CHAIN_PROMPT = template
    qa_chain = RetrievalQA.from_chain_type(
        model,
        retriever=vector_index,
        return_source_documents=True,
        chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
    )

    result = qa_chain({
        "query": user_question,
        "shop_type": shop_type,
        "shop_description": shop_description,
        "years_in_business": years_in_business,
        "customer_interests": customer_interests,
        "geographic_location": geographic_location,
        "context":context,
    })


    chat_response = result["result"]

    print("User Question: ",user_question,"\n")
    print("Chatbot Response: ",chat_response)
    print("type of Chatbot Response",type(chat_response))

    return chat_response


# print(Pdf_extract_GeminiCall())
# pip install langchain-google-genai
# pip install pypdf
# pip install langchain
# pip install python-dotenv
# pip install pwdpy
# pip install chromadb

# npm install react-markdown