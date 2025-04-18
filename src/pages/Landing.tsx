
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Building2, Lightbulb, PieChart, Rocket, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Landing = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "AI-Powered Matching",
      description: "Our intelligent algorithms find the perfect business opportunities based on your profile"
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Expand Your Network",
      description: "Connect with new clients, suppliers, and partners who truly complement your business"
    },
    {
      icon: <PieChart className="h-10 w-10 text-primary" />,
      title: "Data-Driven Insights",
      description: "Gain valuable market intelligence to make informed business decisions"
    },
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: "For Businesses of All Sizes",
      description: "Tailored solutions for startups, SMEs, and established enterprises"
    }
  ];

  const testimonials = [
    {
      quote: "This platform revolutionized how we find clients. The AI matching is surprisingly accurate.",
      author: "Sarah Chen",
      position: "CEO, TechSolutions Inc."
    },
    {
      quote: "We found three major partners in just our first month. The ROI has been exceptional.",
      author: "Michael Rodriguez",
      position: "Business Development, GrowthPartners"
    },
    {
      quote: "The platform's matching algorithm understands our business needs better than we could express them.",
      author: "Aisha Johnson",
      position: "Founder, InnovateNow"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10" />
        <div className="container py-20 px-4 md:py-32 flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-fade-in max-w-4xl">
            AI-Powered Business Matching for Growth and Partnership
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in">
            Connect with ideal clients, suppliers, and partners through intelligent matching that understands your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/signup">
                Get Started For Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/features">How It Works</Link>
            </Button>
          </div>
          <div className="w-full max-w-5xl mt-12 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-lg blur-sm"></div>
            <div className="relative bg-background rounded-lg overflow-hidden border shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="Business matching platform" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Platform Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging advanced AI to create meaningful business connections
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-b from-background to-background/80 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="mb-4 rounded-full w-16 h-16 flex items-center justify-center bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Success stories from businesses that found their perfect match
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-6">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center text-center space-y-4">
                            <blockquote className="text-xl italic">"{testimonial.quote}"</blockquote>
                            <div>
                              <p className="font-semibold">{testimonial.author}</p>
                              <p className="text-muted-foreground">{testimonial.position}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-2">
                <CarouselPrevious className="static transform-none mx-2" />
                <CarouselNext className="static transform-none mx-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Next Business Opportunity?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of businesses already growing through smart matches
            </p>
            <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90" asChild>
              <Link to="/signup">
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Trial
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. Free tier includes 5 matches per month.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
