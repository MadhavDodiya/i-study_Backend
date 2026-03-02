import React from 'react';

const stats = [
  {
    label: 'Total Users', value: '2,340', change: '+12%', up: true,
    bg: 'linear-gradient(135deg,#667eea,#764ba2)',
    icon: <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 11-4 0 2 2 0 014 0zM5 16a2 2 0 11-4 0 2 2 0 014 0z"/>,
  },
  {
    label: 'Active Courses', value: '48', change: '+3 new', up: true,
    bg: 'linear-gradient(135deg,#f093fb,#f5576c)',
    icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>,
  },
  {
    label: 'Total Orders', value: '1,182', change: '+8%', up: true,
    bg: 'linear-gradient(135deg,#4facfe,#00f2fe)',
    icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
  },
  {
    label: 'Revenue', value: '$34.2K', change: '-2%', up: false,
    bg: 'linear-gradient(135deg,#f59e0b,#d97706)',
    icon: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  },
];

const activity = [
  { user:'Sarah K.', action:'Enrolled in React Masterclass', time:'2m ago', avatar:'SK', color:'#667eea' },
  { user:'James T.', action:'Completed Node.js Bootcamp', time:'15m ago', avatar:'JT', color:'#f093fb' },
  { user:'Priya M.', action:'Purchased UI Design Course', time:'1h ago', avatar:'PM', color:'#4facfe' },
  { user:'Carlos R.', action:'Signed up as new user', time:'3h ago', avatar:'CR', color:'#f59e0b' },
  { user:'Aisha B.', action:'Left a review on Python 101', time:'5h ago', avatar:'AB', color:'#f5576c' },
];

const topCourses = [
  { name:'React Masterclass', students:482, revenue:'$14,460', pct:82 },
  { name:'UI Design Fundamentals', students:310, revenue:'$9,300', pct:60 },
  { name:'Node.js Bootcamp', students:278, revenue:'$8,340', pct:54 },
  { name:'Python for Data Science', students:194, revenue:'$5,820', pct:38 },
];

const Dashboard = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .dash-root { font-family:'DM Sans',sans-serif; }
        .stat-card { border-radius:16px; padding:22px; color:#fff; position:relative; overflow:hidden; transition:transform 0.2s,box-shadow 0.2s; cursor:default; }
        .stat-card:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,0.15); }
        .stat-card::after { content:''; position:absolute; right:-20px; top:-20px; width:100px; height:100px; border-radius:50%; background:rgba(255,255,255,0.1); }
        .stat-card::before { content:''; position:absolute; right:20px; bottom:-30px; width:70px; height:70px; border-radius:50%; background:rgba(255,255,255,0.07); }
        .panel { background:#fff; border-radius:16px; border:1px solid rgba(0,0,0,0.055); box-shadow:0 2px 12px rgba(0,0,0,0.05); }
        .progress-bar { height:5px; border-radius:3px; background:#f1f5f9; overflow:hidden; }
        .progress-fill { height:100%; border-radius:3px; background:linear-gradient(90deg,#667eea,#764ba2); transition:width 0.6s ease; }
        .activity-row { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid #f8fafc; }
        .activity-row:last-child { border-bottom:none; }
      `}</style>
      <div className="dash-root" style={{ display:'flex', flexDirection:'column', gap:22 }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
          <div>
            <p style={{ color:'#94a3b8', fontSize:12, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>Overview</p>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:'#0f172a', lineHeight:1 }}>Dashboard</h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 14px', fontSize:13, color:'#64748b', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
            <svg style={{ width:14, height:14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            March 2026
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {stats.map(({ label, value, change, up, bg, icon }) => (
            <div key={label} className="stat-card" style={{ background:bg }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <div style={{ background:'rgba(255,255,255,0.2)', borderRadius:10, padding:8, display:'flex' }}>
                  <svg style={{ width:18, height:18 }} fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>{icon}</svg>
                </div>
                <span style={{ fontSize:11, fontWeight:600, background:'rgba(255,255,255,0.2)', borderRadius:20, padding:'2px 8px', color:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', gap:2 }}>
                  {up ? '↑' : '↓'} {change}
                </span>
              </div>
              <p style={{ fontSize:28, fontWeight:700, color:'#fff', lineHeight:1, marginBottom:4 }}>{value}</p>
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.75)', fontWeight:500 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Bottom 2-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:16 }}>

          {/* Top courses */}
          <div className="panel" style={{ padding:'22px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:'#0f172a' }}>Top Courses</h2>
              <button style={{ fontSize:12, color:'#667eea', fontWeight:500, background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}>View all →</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {topCourses.map(({ name, students, revenue, pct }) => (
                <div key={name}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <div>
                      <p style={{ fontSize:13.5, fontWeight:500, color:'#1e293b', marginBottom:2 }}>{name}</p>
                      <p style={{ fontSize:11, color:'#94a3b8' }}>{students} students</p>
                    </div>
                    <p style={{ fontSize:13.5, fontWeight:600, color:'#0f172a' }}>{revenue}</p>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width:`${pct}%` }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="panel" style={{ padding:'22px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:'#0f172a' }}>Recent Activity</h2>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 0 3px rgba(34,197,94,0.2)' }}/>
            </div>
            <div>
              {activity.map(({ user, action, time, avatar, color }) => (
                <div key={user+time} className="activity-row">
                  <div style={{ width:34, height:34, borderRadius:'50%', background:color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0, boxShadow:`0 3px 8px ${color}55` }}>{avatar}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:12.5, fontWeight:500, color:'#1e293b', lineHeight:1.3 }}>{user}</p>
                    <p style={{ fontSize:11, color:'#94a3b8', marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{action}</p>
                  </div>
                  <p style={{ fontSize:10, color:'#cbd5e1', flexShrink:0 }}>{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;