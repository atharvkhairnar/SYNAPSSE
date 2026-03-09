function buildPrompt(input){

return `
Generate a cinematic short-form video script.

Topic: ${input.topic}
Platform: ${input.platform}
Tone: ${input.tone}

Return ONLY valid JSON.

{
 "scripts":[
  {
   "hook":"",

   "narrative":[

    {
     "segment":"1",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"2",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"3",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"4",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"5",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"6",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"7",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    },
    {
     "segment":"8",
     "visual":"",
     "voiceover":{"english":"","hindi":""}
    }

   ]
  }
 ]
}
`
}

module.exports = {
buildPrompt
}