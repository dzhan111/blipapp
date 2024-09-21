import { action } from "./_generated/server";
import { v } from "convex/values";

import Cerebras from '@cerebras/cerebras_cloud_sdk';

const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY
});

export const generatePodcastTextAction = action({
  args: { input: v.string() },
  handler: async (_, { input }) => {
    const completionCreateResponse = await client.chat.completions.create({
        
        messages: [
            { role: 'user', content: 'Your job is to be the speaker for a story or long-form single-speaker podcast about the topic and genre that the user provides. The user will also provide a podcast name and an optional speaker name. Do not include any metadata or stage directions in the podcast. Start the podcast immediately after this message.'},
            { role: 'user', content: input}
        ],
        model: 'llama3.1-8b',
        max_tokens: 8192,
    });
    
    return completionCreateResponse;
  },
});