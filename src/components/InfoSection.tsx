import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Users, Lightbulb } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-safe-blue" />
            About Color Vision Deficiency
          </CardTitle>
          <CardDescription>
            Understanding different types of color blindness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Protanopia</Badge>
                <span className="text-sm text-muted-foreground">~1% of men</span>
              </div>
              <p className="text-sm">
                Difficulty distinguishing red from green. Red appears darker and may look brown or black.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Deuteranopia</Badge>
                <span className="text-sm text-muted-foreground">~1% of men</span>
              </div>
              <p className="text-sm">
                Most common form. Red and green colors are confused, appearing yellowish.
              </p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Tritanopia</Badge>
                <span className="text-sm text-muted-foreground">~0.001% of people</span>
              </div>
              <p className="text-sm">
                Rare condition affecting blue and yellow perception.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning-amber" />
            How This Tool Helps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-safe-blue rounded-full"></div>
              <span className="text-sm">Automatically detects red-colored links</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-safe-green rounded-full"></div>
              <span className="text-sm">Adds visual enhancements (borders, glows, icons)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning-amber rounded-full"></div>
              <span className="text-sm">Works in real-time as you browse</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};