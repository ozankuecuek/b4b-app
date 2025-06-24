import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APITestSection } from "@/components/APITestSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-4">
            Design System Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive showcase of our custom color palette and component library built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* API Testing Section */}
        <APITestSection />

        {/* Color Palette */}
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Background Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Background Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(220 100% 100%)'}}></div>
                  <div>
                    <div className="font-medium">bg</div>
                    <p className="text-sm text-muted-foreground">hsl(220 100% 100%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm border" style={{backgroundColor: 'hsl(220 100% 97%)'}}></div>
                  <div>
                    <div className="font-medium">bg-light</div>
                    <p className="text-sm text-muted-foreground">hsl(220 100% 97%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm border" style={{backgroundColor: 'hsl(220 59% 91%)'}}></div>
                  <div>
                    <div className="font-medium">bg-dark</div>
                    <p className="text-sm text-muted-foreground">hsl(220 59% 91%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Text Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Text Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm border flex items-center justify-center text-2xl font-bold" style={{color: 'hsl(226 85% 7%)'}}>
                    Aa
                  </div>
                  <div>
                    <div className="font-medium">text</div>
                    <p className="text-sm text-muted-foreground">hsl(226 85% 7%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm border flex items-center justify-center text-lg font-medium" style={{color: 'hsl(220 26% 31%)'}}>
                    Aa
                  </div>
                  <div>
                    <div className="font-medium">text-muted</div>
                    <p className="text-sm text-muted-foreground">hsl(220 26% 31%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Primary & Secondary */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(221 49% 33%)'}}></div>
                  <div>
                    <div className="font-medium">primary</div>
                    <p className="text-sm text-muted-foreground">hsl(221 49% 33%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(44 100% 14%)'}}></div>
                  <div>
                    <div className="font-medium">secondary</div>
                    <p className="text-sm text-muted-foreground">hsl(44 100% 14%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Semantic Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(147 19% 36%)'}}></div>
                  <div>
                    <div className="font-medium">success</div>
                    <p className="text-sm text-muted-foreground">hsl(147 19% 36%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(52 23% 34%)'}}></div>
                  <div>
                    <div className="font-medium">warning</div>
                    <p className="text-sm text-muted-foreground">hsl(52 23% 34%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(9 21% 41%)'}}></div>
                  <div>
                    <div className="font-medium">danger</div>
                    <p className="text-sm text-muted-foreground">hsl(9 21% 41%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg shadow-sm" style={{backgroundColor: 'hsl(217 22% 41%)'}}></div>
                  <div>
                    <div className="font-medium">info</div>
                    <p className="text-sm text-muted-foreground">hsl(217 22% 41%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Border Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Border Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border-4" style={{borderColor: 'hsl(220 19% 53%)'}}></div>
                  <div>
                    <div className="font-medium">border</div>
                    <p className="text-sm text-muted-foreground">hsl(220 19% 53%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border-4" style={{borderColor: 'hsl(220 27% 65%)'}}></div>
                  <div>
                    <div className="font-medium">border-muted</div>
                    <p className="text-sm text-muted-foreground">hsl(220 27% 65%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">Modern Typography</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Font Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Font Stack</CardTitle>
                <CardDescription>Our modern font combination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">Inter</h3>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mb-2">The primary sans-serif font, optimized for UI and high readability at all sizes. Perfect for headings, body text, and interface elements.</p>
                  <p className="text-sm text-muted-foreground">Primary • Sans-serif • UI optimized</p>
                </div>
                <div>
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 font-mono">JetBrains Mono</h3>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mb-2 font-mono">A modern monospace font designed for developers, with excellent character distinction and programming ligatures.</p>
                  <p className="text-sm text-muted-foreground">Monospace • Code • Ligatures</p>
                </div>
              </CardContent>
            </Card>

            {/* Typography Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle>Type Scale</CardTitle>
                <CardDescription>Harmonious sizing relationships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-extrabold tracking-tight">Display</div>
                <div className="text-3xl font-bold tracking-tight">Heading 1</div>
                <div className="text-2xl font-semibold tracking-tight">Heading 2</div>
                <div className="text-xl font-semibold tracking-tight">Heading 3</div>
                <div className="text-lg font-medium">Subheading</div>
                <div className="text-base leading-7">Body text with optimal readability</div>
                <div className="text-sm text-muted-foreground">Caption text</div>
              </CardContent>
            </Card>
          </div>

          {/* Comprehensive Typography Examples */}
          <Card>
            <CardContent className="pt-6 space-y-10">
              {/* Display & Headings */}
              <div className="space-y-6">
                <div>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">The Future of Design</h1>
                  <p className="text-sm text-muted-foreground">H1 • scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl</p>
                </div>
                <div>
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">Modern Typography Systems</h2>
                  <p className="text-sm text-muted-foreground">H2 • scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight</p>
                </div>
                <div>
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">Optimized for Readability</h3>
                  <p className="text-sm text-muted-foreground">H3 • scroll-m-20 text-2xl font-semibold tracking-tight</p>
                </div>
                <div>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">Enhanced User Experience</h4>
                  <p className="text-sm text-muted-foreground">H4 • scroll-m-20 text-xl font-semibold tracking-tight</p>
                </div>
              </div>

              {/* Body Text Variations */}
              <div className="space-y-6">
                <div>
                  <p className="text-xl text-muted-foreground mb-2">This is a lead paragraph that introduces the main content. It's slightly larger and uses muted colors to create visual hierarchy while maintaining excellent readability.</p>
                  <p className="text-sm text-muted-foreground">Lead • text-xl text-muted-foreground</p>
                </div>
                <div>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mb-2">Regular body text with optimized line height and spacing. Inter font provides excellent readability at all sizes, with carefully balanced character shapes and spacing that work well for both short and long-form content.</p>
                  <p className="text-sm text-muted-foreground">Body • leading-7 [&:not(:first-child)]:mt-6</p>
                </div>
                <div>
                  <div className="text-lg font-semibold mb-2">Large emphasized text for important callouts and highlights.</div>
                  <p className="text-sm text-muted-foreground">Large • text-lg font-semibold</p>
                </div>
                <div>
                  <small className="text-sm font-medium leading-none block mb-2">Small text for captions, labels, and secondary information.</small>
                  <p className="text-sm text-muted-foreground">Small • text-sm font-medium leading-none</p>
                </div>
              </div>

              {/* Code & Monospace */}
              <div className="space-y-6">
                <div>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 mb-2">
                    Inline code like <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">npm install @shadcn/ui</code> is displayed with our modern monospace font.
                  </p>
                  <p className="text-sm text-muted-foreground">Inline Code • relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono</p>
                </div>
                <div>
                  <pre className="relative rounded bg-muted p-4 font-mono text-sm overflow-x-auto mb-2">
{`// Modern code block with syntax highlighting
const modernTypography = {
  fontFamily: "Inter, sans-serif",
  fontSize: "16px",
  lineHeight: "1.5",
  letterSpacing: "-0.025em"
};`}
                  </pre>
                  <p className="text-sm text-muted-foreground">Code Block • pre + bg-muted p-4 font-mono</p>
                </div>
              </div>

              {/* Lists & Quotes */}
              <div className="space-y-6">
                <div>
                  <blockquote className="mt-6 border-l-2 pl-6 italic mb-2">
                    "Typography is the craft of endowing human language with a durable visual form, and thus with an independent existence." - Robert Bringhurst
                  </blockquote>
                  <p className="text-sm text-muted-foreground">Blockquote • mt-6 border-l-2 pl-6 italic</p>
                </div>
                <div>
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2 mb-2">
                    <li>Modern font stack with Inter as primary sans-serif</li>
                    <li>JetBrains Mono for code and technical content</li>
                    <li>Optimized spacing and line heights for readability</li>
                    <li>Enhanced font features and ligatures</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">List • my-6 ml-6 list-disc [&>li]:mt-2</p>
                </div>
              </div>

              {/* Typography Features */}
              <div className="space-y-4">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Modern Typography Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-2">Enhanced Readability</div>
                    <p className="text-muted-foreground">Optimized font sizes, line heights, and letter spacing for better reading experience.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-2">Font Features</div>
                    <p className="text-muted-foreground">Contextual alternates, ligatures, and stylistic sets for professional typography.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-2">Performance</div>
                    <p className="text-muted-foreground">Optimized font loading with swap display and preloading strategies.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-2">Accessibility</div>
                    <p className="text-muted-foreground">High contrast ratios and clear character distinction for better accessibility.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles and states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Different button sizes available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">Form Elements</h2>
          <Card>
            <CardHeader>
              <CardTitle>Input Components</CardTitle>
              <CardDescription>Form inputs with proper styling and focus states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Email address" type="email" />
                <Input placeholder="Full name" />
                <Input placeholder="Disabled input" disabled />
                <Input placeholder="Password" type="password" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards & Layout */}
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">Cards & Layout</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>A standard card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">This is the card content area where you can place any information or components.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{borderColor: 'hsl(147 19% 36%)'}}>
              <CardHeader>
                <CardTitle>Success Card</CardTitle>
                <CardDescription>Card with success accent border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">This card uses the success color for its border styling.</p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{borderColor: 'hsl(9 21% 41%)'}}>
              <CardHeader>
                <CardTitle>Warning Card</CardTitle>
                <CardDescription>Card with warning accent border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">This card uses the danger color for its border styling.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Status Messages */}
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-8">Status Messages</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border-l-4" style={{backgroundColor: 'hsl(147 19% 36% / 0.1)', borderColor: 'hsl(147 19% 36%)'}}>
              <div className="text-lg font-semibold">Success</div>
              <p className="text-sm text-muted-foreground">Your changes have been saved successfully.</p>
            </div>
            <div className="p-4 rounded-lg border-l-4" style={{backgroundColor: 'hsl(217 22% 41% / 0.1)', borderColor: 'hsl(217 22% 41%)'}}>
              <div className="text-lg font-semibold">Information</div>
              <p className="text-sm text-muted-foreground">Here's some important information you should know.</p>
            </div>
            <div className="p-4 rounded-lg border-l-4" style={{backgroundColor: 'hsl(52 23% 34% / 0.1)', borderColor: 'hsl(52 23% 34%)'}}>
              <div className="text-lg font-semibold">Warning</div>
              <p className="text-sm text-muted-foreground">Please review your settings before proceeding.</p>
            </div>
            <div className="p-4 rounded-lg border-l-4" style={{backgroundColor: 'hsl(9 21% 41% / 0.1)', borderColor: 'hsl(9 21% 41%)'}}>
              <div className="text-lg font-semibold">Error</div>
              <p className="text-sm text-muted-foreground">Something went wrong. Please try again.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="text-center pt-8 border-t">
          <p className="text-muted-foreground">
            Design System Demo • Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </section>
      </div>
    </div>
  );
}
