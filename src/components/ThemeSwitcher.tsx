
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
