import Together from "together-ai";

if (!process.env.TOGETHER_API_KEY) {
  throw new Error("Missing env var from Together.ai");
}

export const config = {
  runtime: "edge",
};

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});


const handler = async (req: Request): Promise<Response> => {
    const {platform,limit,tone,hashtags,emojis, work, count } = (await req.json()) as {platform:string,limit:number, tone:string,hashtags:boolean,emojis:boolean, work: string, count:number  };
  
    if (!work) {
      return new Response("No work description in the request", { status: 400   
   });
    }
  
    
    const response = await together.chat.completions.create({
        messages: [
            {"role": "system", "content": "You are a professional social media bio writer with extensive experience in creating captivating and engaging biographies for various social platforms. You should response only with JSON"},
            { role: "user", content: `write ${count} ${platform} bios in ${tone} tone ${(hashtags && emojis) ? 'including hastags and emojis':(hashtags)?'including hashtags without emojis':(emojis)?'including emojis without hashtags':''} within character limit of ${limit}.
              Make sure bio has short sentences that are found in ${platform} bios, and feel free to use work description as context: ${work}
              Return a JSON object in the following shape: [{bio:generated_bio,...}]

              It is very important for my career that you follow these instructions exactly. PLEASE ONLY RETURN JSON IN GIVEN PATTERN
              ` },
          ],
          model: "meta-llama/Llama-Vision-Free",
          max_tokens: 512,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
          stop: ["<|eot_id|>","<|eom_id|>"],
          stream: false

    });
  
   
    let rawResponse;
    let generatedBios;
    rawResponse = response.choices[0].message?.content;
    generatedBios = JSON.parse(rawResponse || '[]')


    return Response.json(generatedBios)
    
  };



export default handler;