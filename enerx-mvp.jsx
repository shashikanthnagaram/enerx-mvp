import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, Zap, TrendingUp, Leaf, Battery, Award, ArrowRight, Menu, X, BarChart3, Users, Target } from 'lucide-react';

// Color scheme: Deep teal + electric green + warm amber
const EnerXApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Mock data for solar generation (24 hours)
  const solarData = [
    { time: '00:00', kwh: 0 },
    { time: '03:00', kwh: 0 },
    { time: '06:00', kwh: 0.5 },
    { time: '09:00', kwh: 2.8 },
    { time: '12:00', kwh: 4.5 },
    { time: '15:00', kwh: 3.9 },
    { time: '18:00', kwh: 1.2 },
    { time: '21:00', kwh: 0 },
  ];

  // Mock data for carbon savings over time
  const carbonData = [
    { month: 'Jan', saved: 120 },
    { month: 'Feb', saved: 145 },
    { month: 'Mar', saved: 168 },
    { month: 'Apr', saved: 192 },
    { month: 'May', saved: 215 },
    { month: 'Jun', saved: 234 },
  ];

  // User stats
  const userStats = {
    todayGeneration: 18.5,
    monthGeneration: 487,
    carbonSaved: 234,
    treesEquivalent: 11,
    rank: 'Top 15%',
    streak: 47
  };

  // Simulate AI recommendation generation
  const generateAIRecommendations = async () => {
    setIsLoadingAI(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recommendations = [
      {
        id: 1,
        title: "Peak Generation Window Optimization",
        description: "Your solar panels generate maximum power between 11 AM - 2 PM. Schedule high-energy tasks like washing machines, dishwashers, and EV charging during this window to maximize self-consumption.",
        impact: "Save ₹450/month",
        priority: "high",
        icon: Sun
      },
      {
        id: 2,
        title: "Battery Storage Opportunity",
        description: "You're currently exporting 35% of generated power to the grid. Installing a 5kWh battery system could increase your self-consumption from 65% to 92%, improving ROI by 23%.",
        impact: "₹850/month additional savings",
        priority: "medium",
        icon: Battery
      },
      {
        id: 3,
        title: "Weather-Adaptive Energy Planning",
        description: "Forecast shows cloudy conditions next Tuesday-Thursday. Pre-charge devices and complete energy-intensive tasks on Monday to maintain efficiency during low-generation days.",
        impact: "Maintain 90%+ efficiency",
        priority: "medium",
        icon: TrendingUp
      },
      {
        id: 4,
        title: "Grid-Export Timing Strategy",
        description: "Your area has peak grid demand from 6-9 PM. If you add battery storage, exporting during these hours could earn 40% higher feed-in tariffs compared to midday export.",
        impact: "Potential ₹320/month extra revenue",
        priority: "low",
        icon: Zap
      },
      {
        id: 5,
        title: "Panel Cleaning Recommendation",
        description: "Generation efficiency has dropped 8% over the last 3 weeks, likely due to dust accumulation. A panel cleaning could restore full capacity—typically showing improvement within 24 hours.",
        impact: "Restore 8% generation capacity",
        priority: "high",
        icon: Target
      }
    ];
    
    setAiRecommendations(recommendations);
    setIsLoadingAI(false);
  };

  useEffect(() => {
    if (isLoggedIn && activeTab === 'recommendations') {
      generateAIRecommendations();
    }
  }, [isLoggedIn, activeTab]);

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-teal-500/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              EnerX
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-teal-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-teal-400 transition-colors">How It Works</a>
            <a href="#impact" className="text-slate-300 hover:text-teal-400 transition-colors">Impact</a>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-teal-500/20 px-6 py-4 space-y-4">
            <a href="#features" className="block text-slate-300 hover:text-teal-400">Features</a>
            <a href="#how-it-works" className="block text-slate-300 hover:text-teal-400">How It Works</a>
            <a href="#impact" className="block text-slate-300 hover:text-teal-400">Impact</a>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-semibold rounded-lg"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-teal-400 font-medium">Making Renewable Energy Visible & Valuable</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent">
                  Track, Trade & Transform
                </span>
                <br />
                <span className="text-teal-400">Green Energy</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                India's first digital layer for renewable energy accounting. Measure your carbon impact, get AI-powered recommendations, and contribute to climate goals—without changing infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold rounded-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-slate-800/50 text-teal-400 font-semibold rounded-xl border border-teal-500/30 hover:bg-slate-800 transition-all">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-white">2,847</div>
                  <div className="text-sm text-slate-400">Active Users</div>
                </div>
                <div className="w-px h-12 bg-teal-500/20"></div>
                <div>
                  <div className="text-3xl font-bold text-white">1.2M+</div>
                  <div className="text-sm text-slate-400">kWh Tracked</div>
                </div>
                <div className="w-px h-12 bg-teal-500/20"></div>
                <div>
                  <div className="text-3xl font-bold text-white">547 tons</div>
                  <div className="text-sm text-slate-400">CO₂ Offset</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-teal-500/20 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-medium">Today's Generation</span>
                    <span className="text-emerald-400 text-sm font-medium">Live</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-white">18.5 kWh</div>
                    <div className="text-teal-400 text-sm flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12% vs yesterday</span>
                    </div>
                  </div>

                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={solarData}>
                        <defs>
                          <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #14b8a6',
                            borderRadius: '8px',
                            color: '#fff'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="kwh" 
                          stroke="#14b8a6" 
                          strokeWidth={2}
                          fill="url(#solarGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-teal-500/20">
                    <div>
                      <div className="text-2xl font-bold text-white">8.9kg</div>
                      <div className="text-xs text-slate-400">CO₂ Saved Today</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">₹124</div>
                      <div className="text-xs text-slate-400">Money Saved</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">92%</div>
                      <div className="text-xs text-slate-400">Efficiency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why <span className="text-teal-400">EnerX</span>?
            </h2>
            <p className="text-xl text-slate-400">The UPI of renewable energy—making green power measurable, auditable, and actionable</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Real-Time Tracking",
                description: "Monitor every kilowatt-hour of renewable energy generated and consumed with precision unit-level accounting.",
                color: "from-teal-500 to-cyan-500"
              },
              {
                icon: Leaf,
                title: "Carbon Impact Ledger",
                description: "Auditable, time-stamped carbon savings that meet international ESG reporting standards for businesses.",
                color: "from-emerald-500 to-green-500"
              },
              {
                icon: Target,
                title: "AI Recommendations",
                description: "Smart insights to optimize your energy usage, increase self-consumption, and maximize ROI on solar investments.",
                color: "from-amber-500 to-orange-500"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-8 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple. Powerful. <span className="text-teal-400">Zero Infrastructure Change.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Connect Your Solar", desc: "Link your rooftop solar system—we integrate with all major inverter brands" },
              { step: "02", title: "AI Analyzes Data", desc: "Our engine tracks generation patterns, carbon impact, and optimization opportunities" },
              { step: "03", title: "Get Insights & Save", desc: "Receive personalized recommendations and verifiable carbon credits" }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-teal-500/20 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-teal-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make Your Energy Visible?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 2,800+ users already tracking their renewable impact
          </p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="group px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all inline-flex items-center gap-3"
          >
            Start Your Free Trial
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal-500/20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2026 EnerX. Making renewable energy measurable, tradable, and valuable.</p>
        </div>
      </footer>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-teal-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              EnerX
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">{userStats.rank} in your region</span>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 flex gap-8 border-t border-teal-500/10">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'recommendations', label: 'AI Recommendations', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-teal-400 text-teal-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Today's Generation",
                  value: `${userStats.todayGeneration} kWh`,
                  change: "+12%",
                  icon: Sun,
                  color: "from-amber-500 to-orange-500"
                },
                {
                  label: "This Month",
                  value: `${userStats.monthGeneration} kWh`,
                  change: "+8%",
                  icon: Zap,
                  color: "from-teal-500 to-cyan-500"
                },
                {
                  label: "Carbon Saved",
                  value: `${userStats.carbonSaved} kg CO₂`,
                  change: "MTD",
                  icon: Leaf,
                  color: "from-emerald-500 to-green-500"
                },
                {
                  label: "Trees Equivalent",
                  value: userStats.treesEquivalent,
                  change: `${userStats.streak} day streak`,
                  icon: TrendingUp,
                  color: "from-green-500 to-lime-500"
                }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6 hover:border-teal-500/40 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-teal-400">{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Solar Generation Chart */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Today's Solar Generation</h3>
                  <select className="px-3 py-1 bg-slate-700/50 border border-teal-500/20 rounded-lg text-sm text-slate-300">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={solarData}>
                      <defs>
                        <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #14b8a6',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="kwh" 
                        stroke="#14b8a6" 
                        strokeWidth={3}
                        fill="url(#solarGrad)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Carbon Savings Chart */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Carbon Savings Trend</h3>
                  <select className="px-3 py-1 bg-slate-700/50 border border-teal-500/20 rounded-lg text-sm text-slate-300">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                    <option>All Time</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={carbonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #10b981',
                          borderRadius: '8px',
                          color: '#fff'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="saved" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-teal-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-teal-500/20 rounded-xl text-left transition-all group">
                  <div className="text-teal-400 mb-2 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className="text-white font-semibold mb-1">Download Report</div>
                  <div className="text-slate-400 text-sm">Get monthly carbon impact PDF</div>
                </button>
                
                <button 
                  onClick={() => setActiveTab('recommendations')}
                  className="p-4 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-500/30 rounded-xl text-left transition-all group"
                >
                  <div className="text-teal-400 mb-2 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="text-white font-semibold mb-1">AI Recommendations</div>
                  <div className="text-slate-400 text-sm">Optimize your energy usage</div>
                </button>
                
                <button className="p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-teal-500/20 rounded-xl text-left transition-all group">
                  <div className="text-teal-400 mb-2 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-white font-semibold mb-1">Compare with Peers</div>
                  <div className="text-slate-400 text-sm">See regional benchmarks</div>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* AI Recommendations Tab */
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Energy Recommendations</h2>
                  <p className="text-slate-300">
                    Our AI analyzes your generation patterns, consumption habits, and local weather forecasts to provide personalized optimization strategies.
                  </p>
                </div>
              </div>
            </div>

            {isLoadingAI ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-400">Analyzing your energy data...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div 
                    key={rec.id} 
                    className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border rounded-2xl p-6 hover:shadow-xl transition-all ${
                      rec.priority === 'high' 
                        ? 'border-amber-500/40 hover:border-amber-500/60' 
                        : rec.priority === 'medium'
                        ? 'border-teal-500/30 hover:border-teal-500/50'
                        : 'border-slate-500/20 hover:border-slate-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        rec.priority === 'high'
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                          : rec.priority === 'medium'
                          ? 'bg-gradient-to-br from-teal-500 to-cyan-500'
                          : 'bg-gradient-to-br from-slate-600 to-slate-700'
                      }`}>
                        <rec.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{rec.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            rec.priority === 'high'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : rec.priority === 'medium'
                              ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                              : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                          }`}>
                            {rec.priority.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-slate-300 mb-4 leading-relaxed">{rec.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">{rec.impact}</span>
                          </div>
                          <button className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-lg font-medium transition-all">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <LandingPage />;
};

export default EnerXApp;