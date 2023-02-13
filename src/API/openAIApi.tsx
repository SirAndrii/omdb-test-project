import {Configuration, OpenAIApi, CreateCompletionResponse} from "openai";
import * as process from "process";
import {AxiosError, AxiosResponse} from "axios";

const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_APIKEY
})

const openAi = new OpenAIApi(config);
const randomFloat: number = parseFloat(Math.random().toFixed(2))
export const getMovieFromOpenAI = async (input: string): Promise<OpenAiResponse> => {
    try {
        const result: AxiosResponse = await openAi.createCompletion({
            model: "text-davinci-003",
            temperature: randomFloat, //temperature is randomness parameter
            prompt: `Find movie about : ${input}. and IMDB rating more than 7. In answer write only Name! \n
     Name:`
        })
console.log(result.data)

        const quote: string | undefined = (result.data as CreateCompletionResponse).choices[0].text;


        /*
        //!!!OpenAI provides unreliable results when using IMDB ID, so I resort to using film names and attempt to remove any irrelevant information that OpenAI may generate randomly.
        if (typeof quote === 'string' && regex.test(quote)) {
            const regex = /tt\d{4,10}/;
           const id: string = quote.match(regex)![0]

           return {
               success: true,
               id
           }
       } */
        if (typeof quote === 'string') {
            const pattern1 = /\s\(\d{4}\)$/;
            const pattern2 = /\n.*/g;
            const title = quote.replace(pattern1, '')
                .replace(pattern2, '')
                .trim();

            return {
                success: true,
                title: title
            }
        } else {
            throw new Error("Movie ID not found in response");
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

interface OpenAiObj {
    success: boolean,
}
interface OpenAiNameSuccess extends  OpenAiObj{
    title: string
}
interface OpenAiIdSuccess extends  OpenAiObj{
    id: string
}
interface OpenAiUnSuccess extends  OpenAiObj{
    message: string
}

export type OpenAiResponse = OpenAiNameSuccess | OpenAiIdSuccess | OpenAiUnSuccess



