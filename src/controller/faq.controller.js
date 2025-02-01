import {asyncHandler} from '../utils/asyncHandler.js';
import  { ApiError } from '../utils/ApiError.js';
import  { ApiResponse } from '../utils/ApiResponse.js'
import { chatSession } from '../lib/gemini.js';
import { FAQ } from '../models/faq.model.js';
import { redisClient } from '../lib/redisClient.js';



const allowedLanguages=['en','hi','gu','mr','ta','ml'];

const createFAQ=asyncHandler(async (req,res)=>{
    const {question,answer}=req.body;

    if(!question || !answer){
        throw new ApiError(400,'Missing Fields');
    }

    const prompt = `
    Translate the given question: '${question}' and answer: '${answer}' into Hindi, Gujarati, Marathi, Tamil, Malayalam, and English. 
    
    Respond in proper JSON format:
    
    {
        'translations': {
            'en': { 'que': 'Translated question', 'ans': 'Translated answer' },
            'hi': { 'que': 'हिंदी में अनुवादित प्रश्न', 'ans': 'हिंदी में अनुवादित उत्तर' },
            'gu': { 'que': 'Gujarati translation', 'ans': 'Gujarati answer' },
            'mr': { 'que': 'Marathi translation', 'ans': 'Marathi answer' },
            'ta': { 'que': 'Tamil translation', 'ans': 'Tamil answer' },
            'ml': { 'que': 'Malayalam translation', 'ans': 'Malayalam answer' }
        }
    }
`;

    const result =  await chatSession.sendMessage(prompt);
    const response = await result.response.text();
    const text = response.replace('```json', '').replace('```', '');
    let translations;
    try {
        const parsedResult = JSON.parse(text);
        translations=parsedResult.translations;

    } catch (error) {
        console.log(error);
        console.error('Failed to parse JSON response:', text)
    }

    const createdFAQ=await FAQ.create({
        question,
        answer,
        translations
    })

    return res.status(200).json(new ApiResponse(200,createdFAQ,'FAQ Created Successfully'));
});

const fetchFAQs=asyncHandler(async (req,res)=>{
    const lang=req.query.lang && allowedLanguages.includes(req.query.lang)?req.query.lang:'en' || 'en';

    if(!lang){
        throw new ApiError(400,'OOPS! cannot get lang');
    }
    
    const cachedFAQs=await redisClient.get(`faqs:${lang}`);
    if(cachedFAQs){
        return res.status(200).json(new ApiResponse(200,JSON.parse(cachedFAQs),'Faqs fetched Successfully'));
    }

    const faqs = await FAQ.aggregate([
        {
            $project: {
                question: { $getField: { field: 'que', input: `$translations.${lang}` } },
                answer: { $getField: { field: 'ans', input: `$translations.${lang}` } }
            }
        }
    ]);

    await redisClient.set(`faqs:${lang}`,JSON.stringify(faqs),"EX",300);

    return res.status(200).json(new ApiResponse(200,faqs,'Faqs fetched Successfully'))
})


export {
    createFAQ,
    fetchFAQs
}