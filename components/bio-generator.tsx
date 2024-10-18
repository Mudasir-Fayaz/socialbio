'use client'

import { useState } from 'react'

import {  Loader2, CopyIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import platforms, { counts, tones } from '@/util/util'
import { SocialIcon } from 'react-social-icons'
import { useToast } from '@/hooks/use-toast'

import Error from './error'

type Platform = {
  name:string,
  limit:number
}

type Bio = {
    bio:string
  }

  
export default function BioGenerator() {
  const {toast} = useToast()
  const [platform, setPlatform] = useState<Platform>(platforms[0])
  const [tone, setTone] = useState('Professional')
  const [includeEmoji, setIncludeEmoji] = useState(false)
  const [includeHashtags, setIncludeHashtags] = useState(false)
  const [workDescription, setWorkDescription] = useState('')
  const [bioCount, setBioCount] = useState<number>(1)
  const [generatedBio, setGeneratedBio] = useState<Bio[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(false)
  

  const handleGenerate = async () => {

    setIsGenerating(true);
    setError(false)
    // Prepare the request
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform:platform.name,
        limit:platform.limit,
        tone,
        hashtags:includeHashtags,
        emojis:includeEmoji,
        work: workDescription || 'Social Media User',
        count:bioCount
      }),
    };
  
    
      // Make the API call
      const response = await fetch('/api/llama', req);
  
      // Check if the response is successful
      if (!response.ok) {
        
        console.error('Failed to fetch:', response.statusText);
        setIsGenerating(false);
        setError(true)
        return;
      }
  
      // Create a reader to stream the response body
      const descriptions = await response.json();
   

    setGeneratedBio(descriptions);
    setIsGenerating(false);
  };
 

  const copyToClipboard = (bioText:string) => {
    navigator.clipboard.writeText(bioText)
    toast({
      title:'Copied',
      description: bioText,
      className: "bg-green-500 text-white"
    })
  }


  return (
    <>
    
     
      <Card className="max-w-3xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Social Media Bio Generator</CardTitle>
          <CardDescription className="text-center">Create the perfect bio for your social media profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="platform">Social Platform</Label>
           

            <RadioGroup onValueChange={(v:string) => setPlatform({name: v,limit:platforms.filter(p => p.name == v)[0].limit})} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {platforms.map((p) => (
                <div key={p.name}>
                  <RadioGroupItem value={p.name} id={p.name} className="peer sr-only" />
                  <Label
                    htmlFor={p.name}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                   <SocialIcon network={p.name.toLowerCase()}/>
                    <span className="mt-2 text-sm font-medium">{p.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          
          </div>

          <div className="space-y-2">
            <Label>Select Tone</Label>
            <RadioGroup onValueChange={setTone} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tones.map((t) => (
                <div key={t.name}>
                  <RadioGroupItem value={t.name} id={t.name} className="peer sr-only" />
                  <Label
                    htmlFor={t.name}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="mt-2 text-sm font-medium">{t.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="emoji" checked={includeEmoji} onCheckedChange={setIncludeEmoji} />
              <Label htmlFor="emoji">Include Emoji</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="hashtags" checked={includeHashtags} onCheckedChange={setIncludeHashtags} />
              <Label htmlFor="hashtags">Include Hashtags</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="work-description">Describe Your Work</Label>
            <Textarea
              id="work-description"
              placeholder="Tell us about what you do..."
              value={workDescription}
              onChange={(e) => setWorkDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
<Label htmlFor="count">How many bios?</Label>
              <Select onValueChange={(v) => setBioCount(Number(v))}>
                <SelectTrigger id="count">
                  <SelectValue placeholder="Select bio count" />
                </SelectTrigger>
                <SelectContent>
                  {counts.map((v) => (
                    <SelectItem key={v} value={(v).toString()}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Bio'
            )}
          </Button>
<div className="space-y-2">

         {generatedBio.length ? <Label className="text-lg font-semibold">Generated Bio</Label> : ''}
          {error && <Error />}
          {generatedBio.length ? generatedBio.map((item, index) => {
            return (
              <>
          <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-card p-4 rounded-lg shadow-md mb-4"
            >
             
              <p className="text-card-foreground mt-2">{item.bio}</p>
              <div className="flex justify-end space-x-2 mt-4">
                
                <Button variant="outline" size="sm" onClick={()=> copyToClipboard(item.bio)}>
                  <CopyIcon className="w-4 h-4 mr-2" />
               
                  Copy
                </Button>
              </div>
            </motion.div>
            </>)
          }) : ''}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground ">
            Made with ❤️ by Mudasir Fayaz
          </p>
         
        </CardFooter>
      </Card>
   

    </>
  )
}