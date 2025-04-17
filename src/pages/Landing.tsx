
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 px-4 md:px-6 space-y-10">
          <div className="container flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in">
              Your All-in-One SaaS Solution
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] animate-fade-in">
              Streamline your workflow, boost productivity, and take your business to the next level with our comprehensive suite of tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
