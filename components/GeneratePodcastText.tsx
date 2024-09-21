import { useToast } from "@/components/ui/use-toast";
import { api } from '@/convex/_generated/api';
import { GeneratePodcastTextProps } from '@/types';
import { useAction } from 'convex/react';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const useGeneratePodcastText = ({
  textPrompt, setTextPrompt, setVoicePrompt
}: GeneratePodcastTextProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast()

  const getPodcastText = useAction(api.cerebras.generatePodcastTextAction);

  const generatePodcast = async () => {
    setIsGenerating(true);

    

    try {
      const response = await getPodcastText({
        input: textPrompt
      })

      setVoicePrompt(response.choices[0].message.content!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      })
    } catch (error) {
      console.log('Error generating podcast', error)
      toast({
        title: "Error creating a podcast",
        variant: 'destructive',
      })
      setIsGenerating(false);
    }
    
  }

  return { isGenerating, generatePodcast }
}

const GeneratePodcast = (props: GeneratePodcastTextProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcastText(props);

  return (
    <div className="pb-5">
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          Use AI to generate text!
        </Label>
        <Textarea 
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder='Your thoughts here'
          rows={5}
          value={props.textPrompt}
          onChange={(e) => props.setTextPrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
      <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
        {isGenerating ? (
          <>
            Generating
            <Loader size={20} className="animate-spin ml-2" />
          </>
        ) : (
          'Generate'
        )}
      </Button>
      </div>
    </div>
  )
}

export default GeneratePodcast