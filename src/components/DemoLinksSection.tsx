import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export const DemoLinksSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Demo Links
        </CardTitle>
        <CardDescription>
          Various colored links to test the color blind assistance tool
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="p-4 border rounded-lg space-y-2">
            <h3 className="font-medium">Regular Links</h3>
            <div className="space-y-1">
              <a href="#" className="block text-blue-500 hover:text-blue-700 underline">
                Standard blue link (safe for color blind)
              </a>
              <a href="#" className="block text-green-500 hover:text-green-700 underline">
                Green link (generally safe)
              </a>
              <a href="#" className="block text-purple-500 hover:text-purple-700 underline">
                Purple link (usually safe)
              </a>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg space-y-2 bg-red-50/30">
            <h3 className="font-medium text-danger-red">Problematic Links</h3>
            <div className="space-y-1">
              <a href="#" className="block text-red-500 hover:text-red-700 underline">
                Red link - hard to distinguish for color blind users
              </a>
              <a href="#" className="block text-red-600 hover:text-red-800 underline font-medium">
                Dark red link - also problematic
              </a>
              <a href="#" className="block text-red-400 hover:text-red-600 underline">
                Light red link - may blend with text
              </a>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg space-y-2">
            <h3 className="font-medium">Mixed Content</h3>
            <p className="text-muted-foreground">
              This paragraph contains various links: 
              <a href="#" className="text-blue-500 hover:text-blue-700 underline ml-1">blue link</a>,
              <a href="#" className="text-red-500 hover:text-red-700 underline ml-1">red link</a>, and
              <a href="#" className="text-green-500 hover:text-green-700 underline ml-1">green link</a>.
              The red one might be invisible to some color blind users.
            </p>
          </div>
          
          <div className="p-4 border rounded-lg space-y-2">
            <h3 className="font-medium">Navigation Style</h3>
            <nav className="space-x-4">
              <a href="#" className="text-red-500 hover:text-red-700">Home</a>
              <a href="#" className="text-red-500 hover:text-red-700">About</a>
              <a href="#" className="text-red-500 hover:text-red-700">Services</a>
              <a href="#" className="text-red-500 hover:text-red-700">Contact</a>
            </nav>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};