import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Key, Eye, EyeOff, Check, X } from "lucide-react";

export function ApiKeySettings() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("openai_api_key");
    if (stored) {
      setApiKey(stored);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      // Trigger custom event to notify other components
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleRemove = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    // Trigger custom event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="w-full space-y-4 pt-4">
      <div>
        <h4 className="flex items-center gap-2 text-gray-900 font-medium mb-1">
          <Key className="w-4 h-4" />
          OpenAI API Key
        </h4>
        <p className="text-sm text-gray-500">
          Enter your OpenAI API key to enable AI-powered club recommendations.
          Get your key from{" "}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            platform.openai.com
          </a>
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button onClick={handleSave} disabled={!apiKey.trim()}>
              {saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
        {apiKey && (
          <Button
            variant="outline"
            onClick={handleRemove}
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            Remove API Key
          </Button>
        )}
        <p className="text-xs text-gray-500">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
      </div>
    </div>
  );
}

