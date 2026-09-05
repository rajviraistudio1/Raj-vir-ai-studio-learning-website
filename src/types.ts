export type PageTab = 'home' | 'tools' | 'learn' | 'library' | 'about';

export type ToolCategory = 
  | 'Chatbots'
  | 'Image Generation'
  | 'Video'
  | 'Writing'
  | 'Productivity'
  | 'Coding'
  | 'Research';

export type AudienceLevel = 'Beginner Friendly' | 'No-Code' | 'Intermediate' | 'All Levels';

export type PricingType = 'Free' | 'Freemium' | 'Free Trial' | 'Paid';

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  primaryUseCase: string;
  difficulty: AudienceLevel;
  pricing: PricingType;
  pricingNote?: string;
  websiteUrl: string;
  iconName: string;
  featured?: boolean;
  beginnerTips: string[];
  samplePrompt?: string;
  keyFeatures: string[];
}

export type ResourceCategory = 
  | 'AI Basics'
  | 'Prompting'
  | 'AI Tools'
  | 'Automation'
  | 'AI for Work'
  | 'Creativity';

export type DifficultyLevel = 'Beginner' | 'Intermediate';

export type ResourceFormat = 'Guide' | 'Tutorial' | 'Cheatsheet' | 'Workflow' | 'Walkthrough';

export interface LearningStep {
  stepNumber: number;
  title: string;
  content: string;
  codeSnippet?: string;
  promptExample?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  shortDescription: string;
  category: ResourceCategory;
  difficulty: DifficultyLevel;
  readTime: string;
  format: ResourceFormat;
  popular?: boolean;
  featured?: boolean;
  updatedDate: string;
  author: string;
  tags: string[];
  takeaways: string[];
  steps: LearningStep[];
  recommendedPrompts?: { title: string; prompt: string; whyItWorks: string }[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  stepsCount: number;
  level: DifficultyLevel;
  iconName: string;
  modules: string[];
  targetOutcome: string;
}

export interface NewsletterSubscriber {
  name: string;
  email: string;
  subscribedAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
