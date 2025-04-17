
import { Navbar } from "@/components/Navbar";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-20">
        <h1 className="text-4xl font-bold mb-8">Features</h1>
        <p className="text-muted-foreground">
          Feature page content coming soon...
        </p>
      </main>
    </div>
  );
};

export default Features;
