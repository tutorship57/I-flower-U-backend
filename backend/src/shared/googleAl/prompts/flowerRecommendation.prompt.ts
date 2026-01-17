const generatePrompt = (flowerName:string[], userInput: string)=>{
    // const prompt = `
    //     You are a flower recommendation assistant. 
    //     Based on the user input below,
    //     choose the top 3 suitable flowers from the database. 
    //     Database: ${JSON.stringify(flowerName)}
    //     User input: ${userInput}

    //     Return a JSON object with:
    //     - "user_personality": a description of the user
    //     - "suitable_flowers": an array of up to 3 flowers from the database
    //     `;
        const prompt2 = `
        You are a flower recommendation assistant. 
        Based on the user input below,
        choose the top 3 suitable flowers for that user description. 
        translate the description base on the user input 
        
        User input: ${userInput}

        Return a JSON object with:
        - "user_personality": a description of the user 
        - "suitable_flowers": an array of up to 3 flowers in English
        - "flower_description": a brief description for each recommended flower explaining why it is suitable for the user's personality in .
        output example:
        {
          "user_personality": "A romantic and thoughtful individual who values meaningful gestures and has a deep appreciation for nature's beauty.",
          "suitable_flowers": ["Roses", "Tulips", "Lilies"]
          "flower_description": {
              ["Roses": "Symbolize love and passion, perfect for expressing deep emotions.(in Thai Language)"],
              ["Tulips": "Represent elegance and grace, ideal for a sophisticated touch.(in Thai Language)"],
              ["Lilies": "Convey purity and refined beauty, great for a thoughtful gesture.(in Thai Language)"]
          }
        }
        `;
    return prompt2;
}

export { generatePrompt };