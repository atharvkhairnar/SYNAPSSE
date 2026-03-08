function buildPrompt(input){

let segmentCount = 8

// Dynamic segment logic
if(input.platform === "YouTube Long"){

const mins = parseInt(input.duration)

if(!isNaN(mins)){
segmentCount = Math.min(12, Math.max(8, mins * 2))
}

}

return `
You are Synapsse AI.

Generate a cinematic video script for content creators.

INPUT

Topic: ${input.topic}
Platform: ${input.platform}
Audience: ${input.audience}
Tone: ${input.tone}
Duration: ${input.duration}
Language: ${input.language}
Format: ${input.format}

RULES

1. Output must be valid JSON only.
2. Do not include markdown.
3. Do not include explanations.
4. Response must start with { and end with }.
5. Generate exactly ${segmentCount} cinematic segments.
6. Add a final CTA segment as "segment":"Final".
7. Voiceover English MUST be proper English sentences.
8. Voiceover Hindi MUST be written in Hindi script (Devanagari).
9. Never write Hindi using English letters.
10. English and Hindi voiceovers must be natural translations, not identical text.


STRUCTURE

Segment 1 = Hook moment  
Segment 2 = Problem introduction  
Segment 3 = Emotional connection  
Segment 4 = Insight / realization  
Segment 5 = Action / advice  
Segment 6 = Reinforcement  
Segment 7 = Transformation moment  
Segment 8 = Climax insight  

Final Segment = Direct-to-camera CTA

OUTPUT FORMAT

{
 "scripts":[
  {
   "hook":"",
   "narrative":[
    {
     "segment":"1",
     "visual":"",
     "voiceover":{
      "english":"",
      "hindi":""
     },
     "audio":{
      "ambience":"",
      "transitions":""
     },
     "camera_setup":{
      "shot_type":"",
      "angle":"",
      "movement":"",
      "lighting":""
     },
     "settings":{
      "iso_range":"",
      "aperture":""
     }
    }
   ],
   "retention_prediction":{
    "overall_retention_percentage":0,
    "drop_zone_timestamp":"",
    "peak_engagement_timestamp":""
   },
   "viral_probability_score":0
  }
 ],
 "titles":[],
 "thumbnail_text":[]
}
`;
}

module.exports = {
buildPrompt
};