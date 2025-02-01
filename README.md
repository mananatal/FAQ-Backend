# Project Name: FAQs-Backend 

## Technology Stack

- **Express.js**: A minimal and flexible Node.js web application framework for handling backend logic and API requests.  
- **MongoDB**: A NoSQL database for storing and managing application data.  
- **Redis**: An in-memory data store for caching and optimizing performance.  
- **Gemini API**: Used for translation services, leveraging Google's AI capabilities.  
 

## Installation
1. **Clone the Repository**:  
   `https://github.com/mananatal/FAQ-Backend.git`

2. **Navigate to the Project Directory**:  
   `cd FAQ-Backend`

3. **Install Dependencies**:  
   `npm install`

4. **Start the Development Server**:  
   `npm run dev`



## Environment Variables  

To run this project, you will need to configure the following environment variables in a `.env` file at the root of the project:  

- **MONGODB_URL**: Connection URI for your MongoDB database.  
- **GOOGLE_API_KEY**: API key for using the Gemini translation services.  
- **PORT**: Port number on which the server will run.  

## Example `.env` file  

```plaintext
MONGODB_URL=mongodb+srv://username:password@cluster0.mongodb.net/dbname
PORT=3000
GOOGLE_API_KEY=your_gemini_api_key
```

## Usage

1. Set up MongoDB and ensure the service is running.

2. Set up Redis and ensure the service is running.

3. Configure the `.env` file with the required variables.

4. Start the development server using the provided start script.



# Api Documentation

## `/api/v1/faq/create` Endpoint  

### Description  

Creates a new FAQ entry with the provided question and answer.  

### HTTP Method  

`POST`  

### Request Body  

The request body should be in JSON format and include the following fields:  

- `question` (string, required): The FAQ question.  
- `answer` (string, required): The corresponding answer to the question.  

### Example Request  

```json
{
  "question": "What is the purpose of this API?",
  "answer": "This API allows users to manage FAQ entries."
}
```
### Example Response  
```json
{
    "statusCode": 200,
    "message": "FAQ Created Successfully",
    "data": {
        "question": "What is the purpose of this API?",
        "answer": "This API allows users to manage FAQ entries.",
        "translations": {
            "en": {
                "que": "What is the purpose of this API?",
                "ans": "This API allows users to manage FAQ entries."
            },
            "hi": {
                "que": "इस एपीआई का उद्देश्य क्या है?",
                "ans": "यह एपीआई उपयोगकर्ताओं को एफएक्यू प्रविष्टियों का प्रबंधन करने की अनुमति देता है।"
            },
            "gu": {
                "que": "આ API નો હેતુ શું છે?",
                "ans": "આ API વપરાશકર્તાઓને FAQ એન્ટ્રીઓનું સંચાલન કરવાની મંજૂરી આપે છે."
            },
            "mr": {
                "que": "या एपीआयचा उद्देश काय आहे?",
                "ans": "हे एपीआय वापरकर्त्यांना एफएक्यू नोंदी व्यवस्थापित करण्याची परवानगी देते."
            },
            "ta": {
                "que": "இந்த API இன் நோக்கம் என்ன?",
                "ans": "இந்த API பயனர்கள் அடிக்கடி கேட்கப்படும் கேள்விகளை நிர்வகிக்க அனுமதிக்கிறது."
            },
            "ml": {
                "que": "ഈ API-യുടെ ഉദ്ദേശമെന്താണ്?",
                "ans": "ഈ API ഉപയോക്താക്കളെ പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ കൈകാര്യം ചെയ്യാൻ അനുവദിക്കുന്നു."
            }
        },
        "_id": "679e8f8c5ca389b21ef5948a",
        "createdAt": "2025-02-01T21:18:04.161Z",
        "updatedAt": "2025-02-01T21:18:04.161Z",
        "__v": 0
    },
    "success": true
}

```


## `/api/v1/faq/?lang=some-lang` Endpoint  

### Description  

Retrieves all FAQ entries. If the `lang` query parameter is provided, it returns the FAQs translated into the specified language. If `lang` is not provided, it returns the FAQs in the default language (English).  

### HTTP Method  

`GET`  

### Query Parameters  

- `lang` (string, optional): The language code for translation. The API supports translations only in the following languages:  
  - `hi` (Hindi) 
  - `en` (English) 
  - `gu` (Gujarati)  
  - `mr` (Marathi)  
  - `ta` (Tamil)  
  - `ml` (Malayalam)  

If an unsupported language code is provided, the API will default to English.
  

### Example Request  

#### Without Language Parameter  
```http
GET /api/v1/faq
```

#### Response (Default Language - English)  
```json
{
    "statusCode": 200,
    "message": "Faqs fetched Successfully",
    "data": [
        {
            "_id": "679e8f8c5ca389b21ef5948a",
            "question": "What is the purpose of this API?",
            "answer": "This API allows users to manage FAQ entries."
        },
        {
            "_id": "679e505d9ba7fff9351da9e1",
            "question": "Who is the PM of India?",
            "answer": "Narendra Modi is the PM of India."
        }
        
    ],
    "success": true
}
```
#### With Language Parameter (`lang=hi` for Hindi)  
```http
GET /api/v1/faq/?lang=hi
```

#### Response (with `lang=hi` for Hindi)  
```json
{
    "statusCode": 200,
    "message": "Faqs fetched Successfully",
    "data": [
        {
            "_id": "679e8f8c5ca389b21ef5948a",
            "question": "इस एपीआई का उद्देश्य क्या है?",
            "answer": "यह एपीआई उपयोगकर्ताओं को एफएक्यू प्रविष्टियों का प्रबंधन करने की अनुमति देता है।"
        },
        {
            "_id": "679e505d9ba7fff9351da9e1",
            "question": "भारत के प्रधानमंत्री कौन हैं?",
            "answer": "नरेंद्र मोदी भारत के प्रधानमंत्री हैं।"
        }
    ],
    "success": true
}
```

## Contributing:
Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

## Feedback and Contact:
I welcome any feedback or suggestions for improving this project. If you have questions, ideas, or just want to connect, feel free to reach out to me via email at [mananatal25@gmail.com](mailto:mananatal25@gmail.com) or through my [GitHub profile](https://github.com/mananatal).


