import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff, Settings, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ColorBlindAssistantProps {
  isActive: boolean;
  onToggle: () => void;
}

interface LinkAnalysis {
  element: HTMLAnchorElement;
  isRed: boolean;
  colorValue: string;
  rect: DOMRect;
}

export const ColorBlindAssistant: React.FC<ColorBlindAssistantProps> = ({ isActive, onToggle }) => {
  const [links, setLinks] = useState<LinkAnalysis[]>([]);
  const [enhancementMode, setEnhancementMode] = useState<'border' | 'glow' | 'icon'>('border');
  const [colorBlindType, setColorBlindType] = useState<'protanopia' | 'deuteranopia' | 'tritanopia'>('protanopia');
  
  const analyzeLinks = () => {
    const allLinks = document.querySelectorAll('a');
    const linkAnalysis: LinkAnalysis[] = [];
    
    allLinks.forEach((link) => {
      const computedStyle = window.getComputedStyle(link);
      const color = computedStyle.color;
      const rect = link.getBoundingClientRect();
      
      // Simple red detection (can be enhanced)
      const isRed = isRedColor(color);
      
      linkAnalysis.push({
        element: link as HTMLAnchorElement,
        isRed,
        colorValue: color,
        rect
      });
    });
    
    setLinks(linkAnalysis);
  };
  
  const isRedColor = (colorString: string): boolean => {
    // Convert color to RGB for analysis
    const rgb = parseColorToRGB(colorString);
    if (!rgb) return false;
    
    const { r, g, b } = rgb;
    
    // Detect reddish colors (high red, low green/blue)
    return r > 100 && r > g * 1.5 && r > b * 1.5;
  };
  
  const parseColorToRGB = (colorString: string) => {
    // Handle rgb() format
    const rgbMatch = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1]),
        g: parseInt(rgbMatch[2]),
        b: parseInt(rgbMatch[3])
      };
    }
    
    // Handle hex format (basic implementation)
    if (colorString.startsWith('#')) {
      const hex = colorString.slice(1);
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16)
        };
      }
    }
    
    return null;
  };
  
  const enhanceRedLinks = () => {
    if (!isActive) return;
    
    links.forEach(({ element, isRed }) => {
      if (isRed) {
        switch (enhancementMode) {
          case 'border':
            element.style.border = '2px solid hsl(var(--accent))';
            element.style.borderRadius = '4px';
            element.style.padding = '2px 4px';
            break;
          case 'glow':
            element.style.boxShadow = '0 0 12px hsl(var(--accent) / 0.6)';
            element.style.borderRadius = '4px';
            break;
          case 'icon':
            if (!element.querySelector('.red-link-indicator')) {
              const icon = document.createElement('span');
              icon.className = 'red-link-indicator';
              icon.innerHTML = '🔴';
              icon.style.marginLeft = '4px';
              element.appendChild(icon);
            }
            break;
        }
      }
    });
  };
  
  const clearEnhancements = () => {
    links.forEach(({ element }) => {
      element.style.border = '';
      element.style.boxShadow = '';
      element.style.borderRadius = '';
      element.style.padding = '';
      
      const indicator = element.querySelector('.red-link-indicator');
      if (indicator) {
        indicator.remove();
      }
    });
  };
  
  useEffect(() => {
    if (isActive) {
      analyzeLinks();
      const interval = setInterval(analyzeLinks, 2000); // Re-analyze every 2 seconds
      return () => clearInterval(interval);
    } else {
      clearEnhancements();
    }
  }, [isActive]);
  
  useEffect(() => {
    if (isActive) {
      clearEnhancements();
      enhanceRedLinks();
    }
  }, [isActive, enhancementMode, links]);
  
  const redLinksCount = links.filter(link => link.isRed).length;
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-safe-blue" />
          Color Link Assist
        </CardTitle>
        <CardDescription>
          Helps detect red clickable links for color blind users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Link Detection</span>
          <Switch checked={isActive} onCheckedChange={onToggle} />
        </div>
        
        {isActive && (
          <>
            <div className="flex items-center gap-2">
              {redLinksCount > 0 ? (
                <AlertTriangle className="h-4 w-4 text-warning-amber" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-safe-green" />
              )}
              <span className="text-sm">
                {redLinksCount} red links detected
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Enhancement Mode</label>
              <div className="flex gap-2">
                <Button
                  variant={enhancementMode === 'border' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEnhancementMode('border')}
                >
                  Border
                </Button>
                <Button
                  variant={enhancementMode === 'glow' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEnhancementMode('glow')}
                >
                  Glow
                </Button>
                <Button
                  variant={enhancementMode === 'icon' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setEnhancementMode('icon')}
                >
                  Icon
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Color Vision Type</label>
              <div className="flex flex-col gap-1">
                {['protanopia', 'deuteranopia', 'tritanopia'].map((type) => (
                  <Button
                    key={type}
                    variant={colorBlindType === type ? 'default' : 'ghost'}
                    size="sm"
                    className="justify-start"
                    onClick={() => setColorBlindType(type as any)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};