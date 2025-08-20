import React, { useState } from 'react';
import { ColorBlindAssistant } from '@/components/ColorBlindAssistant';
import { DemoLinksSection } from '@/components/DemoLinksSection';
import { InfoSection } from '@/components/InfoSection';
import { Badge } from '@/components/ui/badge';
import { Accessibility, Chrome } from 'lucide-react';

const Index = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Chrome className="h-8 w-8 text-safe-blue" />
                <Accessibility className="h-6 w-6 text-safe-green" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Color Link Assist</h1>
                <p className="text-muted-foreground">Chrome Extension for Color Blind Users</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:block">
              Accessibility Tool
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <ColorBlindAssistant isActive={isActive} onToggle={() => setIsActive(!isActive)} />
              <InfoSection />
            </div>
          </div>
          
          {/* Demo Area */}
          <div className="lg:col-span-2">
            <DemoLinksSection />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>This tool demonstrates functionality that would be built into a Chrome extension</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
