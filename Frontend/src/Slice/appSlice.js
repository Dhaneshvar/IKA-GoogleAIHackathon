// npm install @reduxjs/toolkit react-redux
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const baseUrl = "http://127.0.0.1:5000";

const initialState = {
    currentUserInput : "",
    openPopModal : false,
    chooseTool : "",
    fileNames : [],
    snackBarSuccess : false,
    userData: {},
    userDataMissing: false,
    userDetailSuccess: false,
    userSystemMessage : [
                            {
                            text: "Hi I'm IKA - Intelligent Kirana Assistant, with my Intelligent assistance, I can help you expand your business... Please ask your query !! ",
                            isBot: true,
                            isMap: false,
                            }
                        ],
}

export const getUserDetails = createAsyncThunk(
    "toGetUserDetails/getUserDetails",
    async (input, {rejectWithValue}) =>
    {
        try{
            console.log(input);
            const options = {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(input),
              };
            
            const response = await fetch(`${baseUrl}/storeUserDetails`, options).then((res)=> res.json()).then((data)=> {return data});

            console.log(response);
            return response;
        } 
        catch(err)
        {
            return rejectWithValue({error:`Some Error in User Details !! ${err}`})
        }
    }
);


export const getTextApiResponse = createAsyncThunk(
    "textApiResponse/getTextApiResponse",
    async (input, {rejectWithValue}) =>
    {
        try{
            const options = {
                method: "POST", 
                headers: {
                "Content-Type": "text/plain"
                },
                body: input,
              };
            
            const response = await fetch(`${baseUrl}/callToGemini`, options).then((res)=> res.json()).then((data)=> {return data});

            console.log(response);
            return response;
        } 
        catch(err)
        {
            return rejectWithValue({error:`catch Request Cannot be FullFilled !! ${err}`})
        }
    }
);

const gptSlice = createSlice({
    name: "gptSlice",
    initialState,
    reducers:{
        setUserInput(state,action)
        {
            state.currentUserInput = action.payload;
        },
        setOpenModal(state,action)
        {
            state.openPopModal = action.payload;
        },
        setFilesName(state,action)
        {
            console.log(state.fileNames);
            console.log(action.payload)
            state.fileNames = [...state.fileNames, action.payload ];
            console.log(state.fileNames);
        },
        setSnackBarSuccess(state, action)
        {
            state.snackBarSuccess = !state.snackBarSuccess;
        },
        setSelectedTool(state, action)
        {
            state.chooseTool = action.payload;
        },
    },
    extraReducers : (builder) => 
    {
        builder
        .addCase(getTextApiResponse.pending, (state) => {
            state.userSystemMessage = [
                ...state.userSystemMessage,
                {text: state.currentUserInput, isBot: false, isMap: false},  // it is the current user Message
                {text: "loading" , isBot: true, isMap: false}
            ]
            state.currentUserInput = "";
        })
        .addCase(getTextApiResponse.fulfilled, (state, action) => {
            console.log("Fullfilled", action.payload)
            state.userSystemMessage.pop();
            const mapKeyWord = state.userSystemMessage[(state.userSystemMessage).length-1].text;
            // const mapKeyWord = action.payload;
            console.log("mapKeyword", mapKeyWord);
            if (mapKeyWord.toLowerCase().includes("location") || mapKeyWord.toLowerCase().includes("map"))
            {
                state.userSystemMessage = [
                    ...state.userSystemMessage,
                    {text: action.payload, isBot: true, isMap: true}   
                ]
            }
            else
            {
                state.userSystemMessage = [
                    ...state.userSystemMessage,
                    {text: action.payload, isBot: true, isMap: false}  
                ]
            }
        })
        .addCase(getTextApiResponse.rejected, (state, action) => {
            console.log("rejected?", action.payload.error);
            state.userSystemMessage.pop();
            state.userSystemMessage = [
                ...state.userSystemMessage,
                {text: action.payload.error, isBot: true, isMap: false}   // chat gpt Message
            ]
        })
        .addCase(getUserDetails.pending, (state) => {
            console.log("User Pending");
           
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            console.log("User Fullfilled", action.payload);
            const resultData = action.payload;
            const { name, phone, location, shoptype, yearofexperience, description } = resultData;
            console.log(name,phone,location,description, shoptype, yearofexperience);
            if(name === '' || phone === '' || location ===  '' || shoptype === '' || yearofexperience === '' || description === '')
            {
                console.log("failed");
                state.userDataMissing = true; 
                state.userDetailSuccess = false;
                state.snackBarSuccess = !state.snackBarSuccess;
            }
            else
            {
                console.log("success");
                state.userDataMissing = false; 
                state.userDetailSuccess = true;
                state.snackBarSuccess = !state.snackBarSuccess;
            }
           
        })
        .addCase(getUserDetails.rejected, (state, action) => {
            console.log("User rejected?", action.payload.error);
        })
        
    }
})

export const { setUserInput, setOpenModal,setFilesName,setSnackBarSuccess, setSelectedTool, setUserData} = gptSlice.actions;
export default gptSlice.reducer
