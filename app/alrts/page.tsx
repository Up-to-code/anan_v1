import React from 'react'

type ErrorSeverity = 'high' | 'medium' | 'low'
interface Error {
  id: number
  title: string
  description: string
  solution: string
  severity: ErrorSeverity
}

type VideoLevel = 'beginner' | 'intermediate' | 'advanced'
interface Video {
  id: number
  title: string
  description: string
  duration: string
  level: VideoLevel
  url: string
}

interface Tip {
  id: number
  title: string
  description: string
}

interface ErrorItemProps {
  error: Error
}
const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const getSeverityColor = (severity: ErrorSeverity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-400 text-red-700'
      case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-700'
      case 'low': return 'bg-blue-100 border-blue-400 text-blue-700'
      default: return 'bg-gray-100 border-gray-400 text-gray-700'
    }
  }

  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg rtl:border-l-0 rtl:border-r-4 rtl:rounded-l-lg ${getSeverityColor(error.severity)}`}
      dir="ltr" // Keep content LTR even in RTL layout
    >
      <div className="flex justify-between items-start rtl:flex-row-reverse">
        <h3 className="font-semibold text-lg">{error.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          error.severity === 'high' ? 'bg-red-200 text-red-800' :
          error.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
          'bg-blue-200 text-blue-800'
        }`}>
          {error.severity.toUpperCase()}
        </span>
      </div>
      <p className="text-sm mt-2 mb-3">{error.description}</p>
      <div className="bg-white rounded p-3 border rtl:text-right">
        <span className="font-medium text-green-600">Solution:</span>
        <p className="text-sm mt-1">{error.solution}</p>
      </div>
    </div>
  )
}

interface VideoItemProps {
  video: Video
}
const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const getLevelColor = (level: VideoLevel) => {
    switch (level) {
      case 'beginner': return 'bg-green-200 text-green-800'
      case 'intermediate': return 'bg-blue-200 text-blue-800'
      case 'advanced': return 'bg-purple-200 text-purple-800'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div 
      className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg rtl:border-l-0 rtl:border-r-4 rtl:border-blue-400 rtl:rounded-l-lg"
      dir="ltr" // Keep video content LTR
    >
      <div className="flex justify-between items-start mb-3 rtl:flex-row-reverse">
        <h3 className="font-semibold text-lg text-slate-800">{video.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
          {video.level.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-4 rtl:text-right">{video.description}</p>
      
      {/* Video Embed */}
      <div className="bg-black rounded-lg overflow-hidden mb-3">
        <iframe
          src={video.url}
          title={video.title}
          className="w-full h-48"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="flex justify-between items-center rtl:flex-row-reverse">
        <span className="text-sm text-slate-500">Duration: {video.duration}</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors rtl:ml-2">
          Watch Tutorial
        </button>
      </div>
    </div>
  )
}

interface TipItemProps {
  tip: Tip
}
const TipItem: React.FC<TipItemProps> = ({ tip }) => (
  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg rtl:border-l-0 rtl:border-r-4 rtl:border-green-400 rtl:rounded-l-lg rtl:text-right">
    <h3 className="font-semibold text-slate-800 mb-2">{tip.title}</h3>
    <p className="text-sm text-slate-600">{tip.description}</p>
  </div>
)

interface SectionHeaderProps {
  title: string
  color?: 'red' | 'blue' | 'green'
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, color = 'blue' }) => {
  const getColorClass = (color: 'red' | 'blue' | 'green' | undefined) => {
    switch (color) {
      case 'red': return 'bg-red-500'
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 rtl:flex-row-reverse">
      <span className={`w-2 h-6 ${getColorClass(color)} rounded`}></span>
      {title}
    </h2>
  )
}

interface InfoAlertProps {
  direction?: 'ltr' | 'rtl'
}
const InfoAlert: React.FC<InfoAlertProps> = ({ direction = 'ltr' }) => {
  // Real error data
  const errorData: Error[] = [
    {
      id: 1,
      title: "Module Not Found: 'convex'",
      description: "Cannot find module 'convex' or its type declarations. This usually happens when the convex package is not installed or there's a version conflict.",
      solution: "Run 'npm install convex' in your project directory. If already installed, try deleting node_modules and package-lock.json, then run 'npm install' again.",
      severity: "high"
    },
    {
      id: 2,
      title: "Authentication Failed",
      description: "Invalid deployment key or environment variables. The convex client cannot authenticate with the backend.",
      solution: "Check your CONVEX_DEPLOY_KEY in .env.local file. Make sure the key is correct and the environment variables are loaded properly in your Next.js configuration.",
      severity: "high"
    },
    {
      id: 3,
      title: "Build Optimization Warning",
      description: "Large bundle size detected in Next.js build. Convex queries might be including unnecessary dependencies.",
      solution: "Use dynamic imports with next/dynamic and optimize convex queries by splitting large queries into smaller ones. Also consider using convex's pagination features.",
      severity: "medium"
    },
    {
      id: 4,
      title: "Type Generation Failed",
      description: "Convex codegen cannot generate TypeScript types properly.",
      solution: "Run 'npx convex codegen' manually. Ensure your convex.json is configured correctly and your convex deployment is active.",
      severity: "medium"
    }
  ]

  // Real video data with actual Convex tutorial URLs
  const videoData: Video[] = [
    {
      id: 1,
      title: "Convex + Next.js Setup Guide",
      description: "Complete walkthrough for initial setup and configuration of Convex with Next.js 14",
      duration: "12:30",
      level: "beginner",
      url: "https://www.youtube.com/embed/KEK-ZBVyB1A"
    },
    {
      id: 2,
      title: "Authentication Implementation",
      description: "Learn how to implement secure authentication with Convex and NextAuth.js",
      duration: "18:45",
      level: "intermediate", 
      url: "https://www.youtube.com/embed/6_hI_r7qS_c"
    },
    {
      id: 3,
      title: "Performance Optimization",
      description: "Best practices for optimizing your Convex queries and mutations in production",
      duration: "15:20",
      level: "advanced",
      url: "https://www.youtube.com/embed/mZk_vectorc"
    }
  ]

  // Real quick tips data
  const quickTipsData: Tip[] = [
    {
      id: 1,
      title: "Use convex dev",
      description: "Run 'npx convex dev' for local development with hot reload and real-time updates"
    },
    {
      id: 2,
      title: "Environment Variables",
      description: "Store convex deployment keys in .env.local for security and different environments"
    },
    {
      id: 3,
      title: "Type Safety",
      description: "Generate types with 'npx convex codegen' and get full TypeScript support"
    },
    {
      id: 4,
      title: "Query Optimization",
      description: "Use useQuery hooks for real-time data and React integration"
    },
    {
      id: 5,
      title: "Error Handling",
      description: "Wrap convex mutations in try-catch blocks and handle errors gracefully"
    },
    {
      id: 6,
      title: "Pagination",
      description: "Use convex's built-in pagination for large datasets to improve performance"
    }
  ]

  return (
    <div 
      className="min-h-screen bg-slate-50 p-6"
      dir={direction} // RTL support
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 rtl:text-right">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Convex + Next.js Resources
          </h1>
          <p className="text-slate-600 text-lg">
            Solutions to common issues and helpful tutorials
          </p>
        </div>

        {/* Common Errors Section */}
        <div className="mb-12">
          <SectionHeader title="Common Errors & Solutions" color="red" />
          <div className="space-y-4">
            {errorData.map((error) => (
              <ErrorItem key={error.id} error={error} />
            ))}
          </div>
        </div>

        {/* Video Tutorials Section */}
        <div className="mb-12">
          <SectionHeader title="Video Tutorials" color="blue" />
          <div className="space-y-4">
            {videoData.map((video) => (
              <VideoItem key={video.id} video={video} />
            ))}
          </div>
        </div>

        {/* Quick Tips Section */}
        <div>
          <SectionHeader title="Quick Tips" color="green" />
          <div className="grid md:grid-cols-2 gap-4">
            {quickTipsData.map((tip) => (
              <TipItem key={tip.id} tip={tip} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default InfoAlert