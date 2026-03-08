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

Generate a cinematic short-form video script for creators.

INPUT

Topic: ${input.topic}
Platform: ${input.platform}
Audience: ${input.audience}
Tone: ${input.tone}
Duration: ${input.duration}
Language: ${input.language}
Format: ${input.format}

IMPORTANT RULES

1. Output MUST be valid JSON.
2. Do NOT include markdown.
3. Do NOT include explanations.
4. Response MUST start with { and end with }.
5. Generate EXACTLY ${segmentCount} narrative segments.
6. After those segments add a final CTA segment with "segment":"Final".
7. Narrative must contain MULTIPLE objects inside the array.
8. Each segment object must follow the structure shown below.
9. Do NOT stop early.
10. Ensure the narrative array contains all ${segmentCount} segments.

SEGMENT STORY FLOW

Segment 1 = Hook moment  
Segment 2 = Problem introduction  
Segment 3 = Emotional connection  
Segment 4 = Insight / realization  
Segment 5 = Action / advice  
Segment 6 = Reinforcement  
Segment 7 = Transformation moment  
Segment 8 = Climax insight  

Final Segment = Direct-to-camera CTA

JSON STRUCTURE

{
 "scripts":[
  {
   "hook":"",
   "narrative":[

    { "segment":"1","visual":"","voiceover":{"english":"","hindi":""},"audio":{"ambience":"","transitions":""},"camera_setup":{"shot_type":"","angle":"","movement":"","lighting":""},"settings":{"iso_range":"","aperture":""} },

    { "segment":"2","visual":"","voiceover":{"english":"","hindi":""},"audio":{"ambience":"","transitions":""},"camera_setup":{"shot_type":"","angle":"","movement":"","lighting":""},"settings":{"iso_range":"","aperture":""} },

    { "segment":"3","visual":"","voiceover":{"english":"","hindi":""},"audio":{"ambience":"","transitions":""},"camera_setup":{"shot_type":"","angle":"","movement":"","lighting":""},"settings":{"iso_range":"","aperture":""} }

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

Remember: narrative must contain ${segmentCount} segments plus a final CTA segment.
`;
}

module.exports = {
buildPrompt
};