import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="NeuroPath AI Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">
              NeuroPath <span className="text-[#ff6900]">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm">
            <Sparkles className="size-4 text-[#ff6900]" />
            <span>AI-Powered Personalized Learning</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Learning That{" "}
            <span className="text-[#ff6900]">Adapts to You</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            NeuroPath AI dynamically personalizes educational content based on
            your behavior, performance, and engagement. Experience an
            intelligent learning engine that evolves with every interaction.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="group">
                Start Learning Free
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Why Choose NeuroPath AI?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our AI-powered platform revolutionizes the way you learn by
            adapting to your unique learning style and pace.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#ff6900]/10">
                <Brain className="size-6 text-[#ff6900]" />
              </div>
              <CardTitle>Behavior-Based Adaptation</CardTitle>
              <CardDescription>
                Our AI analyzes your learning patterns, response times, and
                engagement levels to create a truly personalized experience.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#ff6900]/10">
                <Target className="size-6 text-[#ff6900]" />
              </div>
              <CardTitle>Precision Learning Paths</CardTitle>
              <CardDescription>
                Get content tailored to your knowledge gaps and strengths,
                ensuring you focus on what matters most for your growth.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#ff6900]/10">
                <TrendingUp className="size-6 text-[#ff6900]" />
              </div>
              <CardTitle>Real-Time Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your learning journey with detailed analytics and
                insights that help you stay on track and motivated.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#ff6900]/10">
                <Zap className="size-6 text-[#ff6900]" />
              </div>
              <CardTitle>Instant AI Responses</CardTitle>
              <CardDescription>
                Get immediate, contextual answers to your questions with our
                advanced AI chat that understands your learning context.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#ff6900]/10">
                <Users className="size-6 text-[#ff6900]" />
              </div>
              <CardTitle>Personalized Onboarding</CardTitle>
              <CardDescription>
                Start your journey with a customized onboarding experience that
                understands your goals and learning preferences.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[#ff6900]/10">
                <Sparkles className="size-6 text-[#ff6900]" />
              </div>
              <CardTitle>Continuous Evolution</CardTitle>
              <CardDescription>
                The more you learn, the smarter the system becomes. Experience
                an AI that grows with you.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Get started with NeuroPath AI in three simple steps
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="relative">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#ff6900] text-xl font-bold text-white">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up and complete our personalized onboarding to help us
              understand your learning goals and preferences.
            </p>
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#ff6900] text-xl font-bold text-white">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">Start Learning</h3>
            <p className="text-muted-foreground">
              Begin your learning journey with AI-powered chat assistance that
              adapts to your unique style and pace in real-time.
            </p>
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#ff6900] text-xl font-bold text-white">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Grow & Excel</h3>
            <p className="text-muted-foreground">
              Watch as the AI fine-tunes your learning path, helping you
              achieve your goals faster and more effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-[#ff6900]/10 to-[#ff6900]/5 p-8 sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Experience the Future of Learning
              </h2>
              <ul className="space-y-4">
                {[
                  "AI that learns from your behavior patterns",
                  "Personalized content recommendations",
                  "Adaptive difficulty levels",
                  "Intelligent performance insights",
                  "24/7 AI-powered learning assistance",
                  "Seamless progress synchronization",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-[#ff6900]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#ff6900]/20 blur-2xl" />
                <div className="relative flex size-64 items-center justify-center rounded-full border-4 border-[#ff6900]/30 bg-background">
                  <Brain className="size-32 text-[#ff6900]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-card p-8 text-center sm:p-12 lg:p-16">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Transform Your Learning?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Join thousands of learners who are already experiencing the power
            of AI-driven personalized education.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="group">
                Get Started for Free
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="NeuroPath AI"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-semibold">
                NeuroPath <span className="text-[#ff6900]">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 NeuroPath AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
