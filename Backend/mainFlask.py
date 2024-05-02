from flask import Flask, render_template,jsonify
from flask_cors import CORS
from flask import request
from werkzeug.utils import secure_filename
import os
from geminiCode import Pdf_extract_GeminiCall
from userDetailStore import storeUserProfile, getUserProfile

UPLOAD_FOLDER = './myFiles/'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask("__name__")
# CORS(app)
CORS(app, resources={r"*": {"origins": "*"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/uploadFiles", methods=['POST'])
def uploadFiles():
    print(request.files)
    print(request.method)
    files = request.files

    if not files:
        return jsonify({'error': 'No files received'})

    uploaded_files = []
    print(files.items())
    for key, file in files.items():
        print("Key", key, "file", file)
        if file.filename == '':
            return jsonify({'error': f'No selected file for key: {key}'})

        if(os.path.exists("./myFiles")):
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            print(filename)
            file.save(filename)
            uploaded_files.append({'key': key, 'filename': filename})
            print(uploaded_files)
        else:
            print("File Already Exist")
            return jsonify("file already exist")

    return jsonify({'message': 'Files uploaded successfully', 'files': uploaded_files})

@app.route("/storeUserDetails", methods=['POST','GET'])
def getUserPersonalInfo():
    userData = request.get_json()
    print(userData)
    storeUserProfile(userData)
    resultData = getUserProfile()
    print("res", resultData['name'],resultData['phone'],resultData['location'], resultData['shoptype'],resultData['yearofexperience'],resultData['description'])
    print("res", resultData)
    return resultData

@app.route("/callToGemini", methods=['POST','GET'])
def GeminiModel():
    user_Text = request.data.decode('utf-8')
    print(user_Text)
    model_call = Pdf_extract_GeminiCall(user_Text)
    print(model_call)
    return jsonify(model_call)
    
if __name__ == "__main__":
    app.run(debug=True)


# Syntax  : flask --app main --debug run
# Here 'main' is the currently running file Name. so we have to write 
# flask --app mainFlask --debug run


# pip install Flask
# https://pypi.org/project/Flask/

# pip install Flask-Cors
# https://pypi.org/project/Flask-Cors/
    

# IKAgg\Scripts\activate     
# flask --app mainFlask --debug run
