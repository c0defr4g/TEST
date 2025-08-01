"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Crown, User, Mail, Calendar, Shield, Edit, Save, ArrowLeft, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  id: string
  username: string
  email: string
  password: string
  registrationDate?: string
  loginTime?: string
  isLoggedIn?: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    password: "",
  })
  const [allUsers, setAllUsers] = useState<UserData[]>([])

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load current user data
    const currentUser = localStorage.getItem("currentUser")
    const registeredUsers = localStorage.getItem("registeredUsers")

    if (currentUser) {
      const user = JSON.parse(currentUser)

      // Find full user data from registered users
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers)
        const fullUserData = users.find((u: UserData) => u.id === user.id)
        if (fullUserData) {
          setUserData({ ...fullUserData, ...user })
          setEditData(fullUserData)
        }
        setAllUsers(users)
      }
    }
  }, [router])

  const handleSave = () => {
    if (userData) {
      const updatedUser = { ...userData, ...editData }
      setUserData(updatedUser)

      // Update localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      // Update in registered users list
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const updatedUsers = users.map((user: UserData) => (user.id === userData.id ? updatedUser : user))
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

      setIsEditing(false)
      alert("Profile updated successfully!")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAuthenticated")
    alert("Logged out successfully!")
    router.push("/")
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all saved data? This action cannot be undone.")) {
      localStorage.clear()
      alert("All data cleared successfully!")
      router.push("/")
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="bg-black/60 backdrop-blur-xl border-orange-500/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Loading Profile...</h2>
            <p className="text-gray-300 mb-6">Please wait while we load your data.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-orange-400 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card className="bg-black/60 backdrop-blur-xl border-orange-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500/20 p-3 rounded-full">
                    <Crown className="h-8 w-8 text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">User Profile</CardTitle>
                    <CardDescription className="text-gray-300">Your account information</CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {userData.isLoggedIn ? "Online" : "Offline"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-white font-medium">Username</Label>
                  {isEditing ? (
                    <Input
                      value={editData.username}
                      onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                      className="bg-black/30 border-orange-500/20 text-white"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{userData.username}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-white font-medium">Email</Label>
                  {isEditing ? (
                    <Input
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="bg-black/30 border-orange-500/20 text-white"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{userData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-white font-medium">Password</Label>
                  {isEditing ? (
                    <Input
                      type="password"
                      value={editData.password}
                      onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                      className="bg-black/30 border-orange-500/20 text-white"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">••••••••</span>
                    </div>
                  )}
                </div>

                {userData.registrationDate && (
                  <div>
                    <Label className="text-white font-medium">Registration Date</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{new Date(userData.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                {userData.loginTime && (
                  <div>
                    <Label className="text-white font-medium">Last Login</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{new Date(userData.loginTime).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="border-orange-500/20 text-white"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Saved Data Card */}
          <Card className="bg-black/60 backdrop-blur-xl border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white">Database Information</CardTitle>
              <CardDescription className="text-gray-300">All registered users and saved information</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="text-orange-200 font-medium mb-2">Current Session</h4>
                  <div className="text-sm text-orange-200/80 space-y-1">
                    <div>
                      ID: <code className="bg-black/30 px-1 rounded">{userData.id}</code>
                    </div>
                    <div>
                      Username: <code className="bg-black/30 px-1 rounded">{userData.username}</code>
                    </div>
                    <div>
                      Email: <code className="bg-black/30 px-1 rounded">{userData.email}</code>
                    </div>
                    <div>
                      Status: <span className="text-green-400">Authenticated</span>
                    </div>
                  </div>
                </div>

                {allUsers.length > 0 && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 text-blue-400 mr-2" />
                      <h4 className="text-blue-200 font-medium">All Registered Users ({allUsers.length})</h4>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {allUsers.map((user, index) => (
                        <div key={index} className="text-sm text-blue-200/80 bg-black/20 p-2 rounded">
                          <div className="flex justify-between items-center">
                            <span>{user.username}</span>
                            <span className="text-xs text-gray-400">{user.email}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Registered: {new Date(user.registrationDate || "").toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    Logout
                  </Button>
                  <Button
                    onClick={clearAllData}
                    variant="outline"
                    className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
