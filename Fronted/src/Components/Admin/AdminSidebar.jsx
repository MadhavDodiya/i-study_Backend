import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    rectIcon: true,
  },
  {
    to: '/admin/users',
    label: 'Users',
    icon: <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 11-4 0 2 2 0 014 0zM5 16a2 2 0 11-4 0 2 2 0 014 0z" />,
  },
  {
    to: '/admin/courses',
    label: 'Courses',
    icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  },
  {
    to: '/admin/orders',
    label: 'Orders',
    icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
  },
];

const sidebarStyle = {
  fontFamily: "'DM Sans', sans-serif",
  background: 'linear-gradient(175deg,#0d1526 0%,#090e1a 100%)',
  borderRight: '1px solid rgba(255,255,255,0.055)',
  width: 256,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
};

const AdminSidebar = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .snav-link { position:relative; display:flex; align-items:center; gap:10px; padding:9px 14px; border-radius:10px; font-size:13.5px; font-weight:500; color:rgba(148,163,184,0.75); text-decoration:none; transition:all 0.18s; }
        .snav-link:hover { background:rgba(255,255,255,0.05); color:#f1f5f9; }
        .snav-link.active { background:rgba(245,158,11,0.12); color:#fbbf24; }
        .snav-link::before { content:''; position:absolute; left:0; top:20%; bottom:20%; width:3px; border-radius:0 3px 3px 0; background:#f59e0b; transform:scaleY(0); transition:transform 0.18s ease; }
        .snav-link.active::before { transform:scaleY(1); }
      `}</style>
      <div style={sidebarStyle}>
        {/* Logo */}
        <div style={{ padding:'20px 20px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(245,158,11,0.4)', flexShrink:0 }}>
              <svg width="16" height="16" fill="white" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", color:'#f1f5f9', fontSize:17, fontWeight:800, letterSpacing:'0.04em', lineHeight:1 }}>i-Study</p>
              <p style={{ color:'rgba(245,158,11,0.65)', fontSize:9, letterSpacing:'0.18em', marginTop:3, fontWeight:500 }}>ADMIN PANEL</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding:'18px 10px 8px' }}>
          <p style={{ color:'rgba(100,116,139,0.5)', fontSize:9, fontWeight:600, letterSpacing:'0.16em', textTransform:'uppercase', paddingLeft:6, marginBottom:8 }}>Menu</p>
          <nav style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {navItems.map(({ to, label, icon, rectIcon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `snav-link${isActive ? ' active' : ''}`}>
                <svg style={{ width:17, height:17, flexShrink:0 }} fill={rectIcon ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke={rectIcon ? 'none' : 'currentColor'} strokeWidth={1.65}>
                  {icon}
                </svg>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div style={{ flex:1 }} />

        {/* User card */}
        <div style={{ padding:'10px 10px 14px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, background:'rgba(255,255,255,0.04)' }}>
            <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'#fff', flexShrink:0 }}>A</div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ color:'#e2e8f0', fontSize:12, fontWeight:500, lineHeight:1.3 }}>Administrator</p>
              <p style={{ color:'rgba(100,116,139,0.65)', fontSize:10, marginTop:1 }}>admin@i-study.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;