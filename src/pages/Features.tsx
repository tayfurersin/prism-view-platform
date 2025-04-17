
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Features = () => {
  const features = [
    {
      title: "Advanced Analytics",
      description: "Get detailed insights and analytics about your business performance",
      points: ["Real-time data", "Custom reports", "Export functionality"]
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members",
      points: ["Shared workspaces", "Real-time updates", "Role management"]
    },
    {
      title: "Security",
      description: "Enterprise-grade security for your data",
      points: ["End-to-end encryption", "Two-factor authentication", "Regular backups"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage and grow your business efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Features;
