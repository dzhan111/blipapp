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
        messages: [{ role: 'user', content: input}],
        model: 'llama3.1-8b',
        max_tokens: 8192,
    });
    
    return completionCreateResponse;
  },
});