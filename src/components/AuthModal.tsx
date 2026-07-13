import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Lock, Mail, Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialUsers: User[];
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialUsers }) => {
  const [portalType, setPortalType] = useState<'citizen-contractor' | 'admin'>('citizen-contractor');
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'otp'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState('');
  const [lga, setLga] = useState('Gusau');
  const [role, setRole] = useState<UserRole>('citizen');
  const [companyName, setCompanyName] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Special check for Abdulkadir Bala / government123
    if (password === 'government123' || email.toLowerCase().includes('abdulkadir') || email.toLowerCase() === 'abdulkadir.bala@zamfara.gov.ng') {
      const abdulkadirUser = initialUsers.find(u => u.name.toLowerCase().includes('abdulkadir')) || {
        id: 'usr-abdulkadir',
        name: 'Abdulkadir Bala',
        email: 'abdulkadir.bala@zamfara.gov.ng',
        role: 'admin' as UserRole,
        lga: 'Gusau',
        phone: '+234 803 000 1234',
        verified: true
      };
      onLoginSuccess(abdulkadirUser);
      onClose();
      return;
    }

    // Check local storage registered users with password
    try {
      const storedUsers = JSON.parse(localStorage.getItem('zamfara_registered_users') || '[]');
      const matchedStored = storedUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (matchedStored) {
        if (matchedStored.password && matchedStored.password !== password) {
          setError('Incorrect password. Please try again.');
          return;
        }
        onLoginSuccess(matchedStored.user);
        onClose();
        return;
      }
    } catch (err) {
      console.error(err);
    }

    // Check against initial users
    const found = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (portalType === 'admin' && found.role !== 'admin') {
        setError('Unauthorized: Admin credentials required for Government Admin Portal.');
        return;
      }
      onLoginSuccess(found);
      onClose();
    } else {
      setError('Account not found. Please register or check your email/password.');
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Please provide a valid phone number for SMS OTP.');
      return;
    }
    setSuccessMsg('SMS OTP sent successfully to ' + phone + '. (Simulated code: 4892)');
    setAuthMode('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '4892' && otpCode !== '1234') {
      setError('Invalid OTP code. Please enter 4892.');
      return;
    }
    const mockUser: User = {
      id: `usr-otp-${Date.now()}`,
      name: 'SMS Verified User',
      email: phone + '@zamfara.sms',
      role: 'citizen',
      lga: lga,
      phone: phone,
      verified: true
    };
    onLoginSuccess(mockUser);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all mandatory fields including password.');
      return;
    }
    const newUser: User = {
      id: `usr-reg-${Date.now()}`,
      name,
      email,
      role,
      lga,
      companyName: companyName || undefined,
      verified: true
    };

    // Save to localStorage
    try {
      const storedUsers = JSON.parse(localStorage.getItem('zamfara_registered_users') || '[]');
      storedUsers.push({ email: email.toLowerCase(), password, user: newUser });
      localStorage.setItem('zamfara_registered_users', JSON.stringify(storedUsers));
    } catch (err) {
      console.error(err);
    }

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
              {portalType === 'admin' ? <ShieldCheck className="w-5 h-5 text-white" /> : <UserCheck className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Infratech Zamfara Portal</h2>
              <p className="text-xs text-slate-400">Secure Access & Authentication</p>
            </div>
          </div>

          {/* Portal Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-4 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setPortalType('citizen-contractor'); setAuthMode('login'); setError(''); }}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                portalType === 'citizen-contractor' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Citizen / Contractor
            </button>
            <button
              onClick={() => { setPortalType('admin'); setAuthMode('login'); setError(''); }}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                portalType === 'admin' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Government Admin
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {error && (
            <div className="bg-red-950/60 border border-red-800 text-red-200 p-3 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-200 p-3 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Mode */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email or Official ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder={portalType === 'admin' ? "admin.infratech@zamfara.gov.ng" : "user@zamfara.ng"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Secure Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setAuthMode('otp')}
                  className="text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Login via SMS OTP (Low Bandwidth)</span>
                </button>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${
                  portalType === 'admin' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                Sign In to {portalType === 'admin' ? 'Admin Console' : 'Portal'}
              </button>

              {portalType !== 'admin' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setError(''); }}
                    className="text-xs text-slate-400 hover:text-emerald-400"
                  >
                    Don't have an account? <span className="underline font-semibold">Register as Local Contractor or Citizen</span>
                  </button>
                </div>
              )}


            </form>
          )}

          {/* SMS OTP Mode */}
          {authMode === 'otp' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                Ideal for rural connectivity in Zamfara State where internet bandwidth is limited. Enter your registered mobile number to receive a 4-digit SMS OTP token.
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-sm font-bold shadow"
              >
                Send SMS OTP Token
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Back to Password Login
                </button>
              </div>
            </form>
          )}

          {/* OTP Code Verification sub-state */}
          {authMode === 'otp' && successMsg && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4 border-t border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Enter 4-Digit OTP Code (Simulated: 4892)</label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="4892"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-center text-lg font-mono tracking-widest text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-bold shadow"
              >
                Verify & Authorize Login
              </button>
            </form>
          )}

          {/* Register Mode */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Abubakar Sadiq"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="abubakar@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Secure Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="citizen">Concerned Citizen</option>
                    <option value="contractor">State Contractor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">LGA</label>
                  <select
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Gusau">Gusau</option>
                    <option value="Talata Mafara">Talata Mafara</option>
                    <option value="Bakura">Bakura</option>
                    <option value="Anka">Anka</option>
                    <option value="Zurmi">Zurmi</option>
                    <option value="Kaura Namoda">Kaura Namoda</option>
                    <option value="Maru">Maru</option>
                    <option value="Bungudu">Bungudu</option>
                  </select>
                </div>
              </div>

              {role === 'contractor' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Corporate Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Savannah Civil Eng Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-sm font-bold shadow-lg"
              >
                Complete Registration
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Already have an account? Sign In
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
