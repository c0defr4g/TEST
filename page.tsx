"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Shield,
  Crown,
  Car,
  Building,
  Gamepad2,
  MessageCircle,
  Play,
  Copy,
  CheckCircle,
  Star,
  Clock,
  MapPin,
  Zap,
  User,
  LogOut,
  UserPlus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CurrentUser {
  id: string
  username: string
  email: string
  loginTime: string
  isLoggedIn: boolean
}

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const serverIP = "play.smiyacity.com"

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser")
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    if (userData && isAuthenticated) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const copyServerIP = () => {
    navigator.clipboard.writeText(serverIP)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAuthenticated")
    setCurrentUser(null)
    alert("Logged out successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="bg-black/40 backdrop-blur-md border-b border-orange-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-orange-400" />
                <span className="text-xl font-bold text-white">SMIYA CITY RP</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-orange-400 transition-colors">
                Home
              </a>
              <a href="#about" className="text-white hover:text-orange-400 transition-colors">
                About
              </a>
              <a href="#rules" className="text-white hover:text-orange-400 transition-colors">
                Rules
              </a>
              <a href="#staff" className="text-white hover:text-orange-400 transition-colors">
                Staff
              </a>
              <a href="#join" className="text-white hover:text-orange-400 transition-colors">
                Join Now
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">{currentUser.username}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                  </div>
                  <Link href="/profile">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/20 text-white hover:bg-orange-500/10 bg-transparent"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLogout}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-500/20 text-white hover:bg-orange-500/10 bg-transparent"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              SMIYA DYAL
              <span className="block text-orange-400">MASTER CITY</span>
              <span className="block text-2xl md:text-3xl font-normal text-gray-300">ROLEPLAY</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience the ultimate roleplay adventure in our immersive city. Build your story, create your empire,
              and live your dreams in the most realistic roleplay server.
            </p>
          </div>

          {/* Welcome Message for Logged In Users */}
          {currentUser && (
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 max-w-md mx-auto mb-8">
              <h3 className="text-orange-200 font-semibold mb-2">Welcome back, {currentUser.username}!</h3>
              <p className="text-orange-200/80 text-sm">Ready to continue your roleplay journey in SMIYA CITY?</p>
            </div>
          )}

          {/* Server Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">247</div>
                <div className="text-sm text-gray-400">Online Players</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <Crown className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">500</div>
                <div className="text-sm text-gray-400">Max Slots</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-sm text-gray-400">Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Server IP */}
          <div className="bg-black/60 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto mb-8 border border-orange-500/20">
            <h3 className="text-white font-semibold mb-3">Server IP</h3>
            <div className="flex items-center justify-between bg-black/50 rounded-lg p-3">
              <code className="text-orange-400 font-mono">{serverIP}</code>
              <Button size="sm" variant="ghost" onClick={copyServerIP} className="text-white hover:text-orange-400">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3">
            <Play className="mr-2 h-5 w-5" />
            Join Server Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose SMIYA CITY RP?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <Car className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Realistic Economy</CardTitle>
                <CardDescription className="text-gray-300">
                  Work various jobs, start businesses, and build your financial empire in our dynamic economy system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <Building className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">Custom Properties</CardTitle>
                <CardDescription className="text-gray-300">
                  Own houses, apartments, and commercial properties. Customize and upgrade your spaces.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-400 mb-4" />
                <CardTitle className="text-white">Professional Staff</CardTitle>
                <CardDescription className="text-gray-300">
                  24/7 moderation and support from experienced staff members dedicated to fair play.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <Gamepad2 className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Custom Scripts</CardTitle>
                <CardDescription className="text-gray-300">
                  Unique features and systems developed exclusively for our server community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-orange-400 mb-4" />
                <CardTitle className="text-white">Active Community</CardTitle>
                <CardDescription className="text-gray-300">
                  Join thousands of active players in our Discord and in-game community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Regular Events</CardTitle>
                <CardDescription className="text-gray-300">
                  Participate in weekly events, competitions, and special roleplay scenarios.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Server Rules</h2>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border-orange-500/20">
              <TabsTrigger
                value="general"
                className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="roleplay"
                className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Roleplay
              </TabsTrigger>
              <TabsTrigger
                value="conduct"
                className="text-white data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Conduct
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        1
                      </Badge>
                      <span>No cheating, hacking, or exploiting game mechanics</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        2
                      </Badge>
                      <span>Respect all players and staff members at all times</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        3
                      </Badge>
                      <span>Use appropriate language in all communications</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        4
                      </Badge>
                      <span>No advertising other servers or communities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roleplay" className="mt-6">
              <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        1
                      </Badge>
                      <span>Stay in character at all times during roleplay</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        2
                      </Badge>
                      <span>No random death matching (RDM) or vehicle death matching (VDM)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        3
                      </Badge>
                      <span>Follow realistic roleplay scenarios and actions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        4
                      </Badge>
                      <span>No power gaming or god modding</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conduct" className="mt-6">
              <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        1
                      </Badge>
                      <span>No harassment, bullying, or toxic behavior</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        2
                      </Badge>
                      <span>Report rule violations to staff immediately</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        3
                      </Badge>
                      <span>Follow staff instructions without argument</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1 border-orange-400 text-orange-400">
                        4
                      </Badge>
                      <span>Use proper channels for appeals and complaints</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Staff Section */}
      <section id="staff" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Our Staff Team</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Admin"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-red-500"
                />
                <h3 className="text-xl font-bold text-white mb-2">Master Admin</h3>
                <Badge className="bg-red-500 text-white mb-3">Owner</Badge>
                <p className="text-gray-300 text-sm">Server founder and lead administrator</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Moderator"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-blue-500"
                />
                <h3 className="text-xl font-bold text-white mb-2">Head Moderator</h3>
                <Badge className="bg-blue-500 text-white mb-3">Admin</Badge>
                <p className="text-gray-300 text-sm">Community management and player support</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Support"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-green-500"
                />
                <h3 className="text-xl font-bold text-white mb-2">Support Team</h3>
                <Badge className="bg-green-500 text-white mb-3">Moderator</Badge>
                <p className="text-gray-300 text-sm">24/7 player assistance and guidance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of players in the most immersive roleplay experience. Your story begins now.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center">
                  <Gamepad2 className="mr-2 h-6 w-6" />
                  Step 1: Create Account
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {currentUser ? "You're already registered! Ready to play." : "Register your account to get started."}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/40 border-orange-500/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center">
                  <MessageCircle className="mr-2 h-6 w-6" />
                  Step 2: Join Discord
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Connect with our community and get the latest updates on our Discord server.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-4">
            {!currentUser ? (
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-500/20 text-white hover:bg-orange-500/10 px-8 py-3 bg-transparent"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Connect to Server
              </Button>
            )}
            <div>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500/20 text-white hover:bg-orange-500/10 px-8 py-3 bg-transparent"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-md border-t border-orange-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-8 w-8 text-orange-400" />
                <span className="text-xl font-bold text-white">SMIYA CITY RP</span>
              </div>
              <p className="text-gray-400">
                The ultimate roleplay experience awaits you in our immersive city environment.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#home" className="hover:text-orange-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-orange-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#rules" className="hover:text-orange-400 transition-colors">
                    Rules
                  </a>
                </li>
                <li>
                  <a href="#staff" className="hover:text-orange-400 transition-colors">
                    Staff
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Appeals
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Server Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>24/7 Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>500 Max Players</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Anti-Cheat Protected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SMIYA DYAL MASTER CITY ROLEPLAY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
