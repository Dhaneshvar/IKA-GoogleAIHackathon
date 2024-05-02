import pickle 


def storeUserProfile(Data):
    # Open a file and use dump() 
    with open('personalInfo.pkl', 'wb') as file: 
        # A new file will be created 
        pickle.dump(Data, file) 
        print("Stored User Profile Info !!!")

def getUserProfile():
    with open('personalInfo.pkl', 'rb') as file: 
        myInfo = pickle.load(file) 
        print("Got user Info", myInfo)
        return myInfo