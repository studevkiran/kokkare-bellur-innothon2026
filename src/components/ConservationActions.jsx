import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, Loader, Coins, Users, Plane, GraduationCap, Trash2, Heart, TreePine, Droplets } from 'lucide-react';

const ConservationActions = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    userName: '',
    location: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const roles = {
    community: {
      title: 'Local Community',
      icon: Users,
      color: 'green',
      actions: [
        { id: 'bird_treatment', name: 'Bird Treatment & Care', tokens: 200, icon: Heart, desc: 'Treat injured/sick birds with photo proof' },
        { id: 'tree_protection', name: 'Nesting Tree Protection', tokens: 150, icon: TreePine, desc: 'Protect trees during breeding season' },
        { id: 'wetland_monitoring', name: 'Wetland Monitoring', tokens: 100, icon: Droplets, desc: 'Report water levels, bird counts' },
        { id: 'knowledge_sharing', name: 'Traditional Knowledge', tokens: 150, icon: GraduationCap, desc: 'Document conservation practices' }
      ]
    },
    tourist: {
      title: 'Tourists & Visitors',
      icon: Plane,
      color: 'blue',
      actions: [
        { id: 'trash_collection', name: 'Trash Collection', tokens: 100, icon: Trash2, desc: 'Remove plastic/waste with proof photos' },
        { id: 'plastic_pledge', name: 'Plastic-Free Pledge', tokens: 50, icon: CheckCircle, desc: 'Commit to plastic-free visit' },
        { id: 'eco_review', name: 'Eco-Tourism Review', tokens: 80, icon: Camera, desc: 'Write responsible tourism guide' }
      ]
    },
    student: {
      title: 'Students & Youth',
      icon: GraduationCap,
      color: 'purple',
      actions: [
        { id: 'lake_cleaning', name: 'Lake Cleaning Program', tokens: 200, icon: Droplets, desc: 'Organize/participate in cleanup drives' },
        { id: 'awareness_campaign', name: 'Awareness Campaign', tokens: 150, icon: Users, desc: 'Create posters, social media, presentations' },
        { id: 'workshop', name: 'School Workshop', tokens: 180, icon: GraduationCap, desc: 'Conduct conservation workshops' },
        { id: 'research', name: 'Research Documentation', tokens: 200, icon: Camera, desc: 'Bird studies, data collection' },
        { id: 'volunteering', name: 'Volunteer Hours', tokens: 30, icon: Heart, desc: 'General conservation volunteering (per hour)' }
      ]
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(files);
      const newPreviews = files.map(file => {
        const reader = new FileReader();
        return new Promise(resolve => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(newPreviews).then(setPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const action = roles[selectedRole].actions.find(a => a.id === selectedAction);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const requestId = `REQ-KB-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    try {
      const response = await fetch('/api/conservation/submit-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          userName: formData.userName,
          role: selectedRole,
          actionType: selectedAction,
          actionName: action.name,
          location: formData.location,
          description: formData.description,
          tokensRequested: action.tokens,
          proofCount: images.length
        })
      });

      const data = await response.json();

      setResult({
        requestId: data.requestId || requestId,
        actionName: action.name,
        tokens: action.tokens,
        status: 'pending',
        message: 'Request submitted! Admin will verify on CampusCoin platform.'
      });

      // Simulate approval (in real app, admin does this)
      setTimeout(() => {
        setResult(prev => ({
          ...prev,
          status: 'approved',
          message: `Approved! ${action.tokens} tokens are ready to claim on CampusCoin.`
        }));
      }, 3000);

    } catch (error) {
      setResult({
        status: 'error',
        message: 'Submission failed. Please try again.'
      });
    }

    setSubmitting(false);
  };

  const resetForm = () => {
    setSelectedRole('');
    setSelectedAction('');
    setImages([]);
    setPreviews([]);
    setFormData({ userName: '', location: '', description: '' });
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl shadow-xl border border-green-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold tracking-wide mb-4">
            <GraduationCap size={16} /> Education-Based Conservation
          </div>
          <h2 className="text-4xl font-bold mb-4 text-stone-900">Take Action & Earn Village Tokens</h2>
          <p className="text-lg text-stone-600">
            Choose your role, complete conservation tasks, get verified, earn tokens redeemable at village stores!
          </p>
        </div>

        {/* Role Selection */}
        {!selectedRole && !result && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(roles).map(([key, role]) => {
              const Icon = role.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedRole(key)}
                  className="p-8 bg-white rounded-2xl hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500 text-center"
                >
                  <div className={`w-20 h-20 bg-${role.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-10 h-10 text-${role.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-stone-500">{role.actions.length} actions available</p>
                </button>
              );
            })}
          </div>
        )}

        {/* Action Selection */}
        {selectedRole && !selectedAction && !result && (
          <div>
            <button onClick={() => setSelectedRole('')} className="text-sm text-stone-500 mb-4 hover:text-stone-700">
              ← Back to roles
            </button>
            <h3 className="text-2xl font-bold mb-6 text-stone-900">
              {roles[selectedRole].title} - Select Action
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {roles[selectedRole].actions.map(action => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className="p-6 bg-white rounded-xl hover:shadow-lg transition-all text-left border-2 border-transparent hover:border-green-400"
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-lg text-stone-900 mb-1">{action.name}</h4>
                        <p className="text-sm text-stone-600 mb-3">{action.desc}</p>
                        <div className="flex items-center gap-2 text-orange-600 font-bold">
                          <Coins size={18} />
                          <span>{action.tokens} tokens</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Submission Form */}
        {selectedRole && selectedAction && !result && (
          <form onSubmit={handleSubmit}>
            <button onClick={() => setSelectedAction('')} className="text-sm text-stone-500 mb-4 hover:text-stone-700">
              ← Back to actions
            </button>
            
            <div className="bg-white p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                {roles[selectedRole].actions.find(a => a.id === selectedAction)?.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={e => setFormData({...formData, userName: e.target.value})}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Kokkare Bellur, Karnataka"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 h-24"
                    placeholder="Describe your conservation action in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Proof Photos * (Required for verification)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50"
                  >
                    {previews.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {previews.map((preview, i) => (
                          <img key={i} src={preview} alt={`Preview ${i+1}`} className="w-full h-32 object-cover rounded-lg" />
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-green-600" />
                        <p className="text-sm text-stone-600">Click to upload proof photos</p>
                      </div>
                    )}
                  </div>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || images.length === 0}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:bg-stone-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting Request...
                </span>
              ) : (
                `📤 Submit for Verification (Earn ${roles[selectedRole].actions.find(a => a.id === selectedAction)?.tokens} tokens)`
              )}
            </button>
          </form>
        )}

        {/* Result Display */}
        {result && (
          <div className={`p-8 rounded-2xl ${
            result.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' : 
            result.status === 'approved' ? 'bg-green-50 border border-green-200' :
            'bg-red-50 border border-red-200'
          }`}>
            <div className="text-center">
              {result.status === 'pending' && <Loader className="w-16 h-16 mx-auto mb-4 animate-spin text-yellow-600" />}
              {result.status === 'approved' && <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />}
              {result.status === 'error' && <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />}
              
              <h3 className="text-2xl font-bold mb-2 text-stone-900">
                {result.status === 'pending' && 'Request Submitted!'}
                {result.status === 'approved' && 'Approved! 🎉'}
                {result.status === 'error' && 'Error'}
              </h3>
              
              <p className="text-stone-600 mb-4">{result.message}</p>
              
              {result.requestId && (
                <p className="text-xs text-stone-500 mb-6">Request ID: {result.requestId}</p>
              )}

              {result.status === 'approved' && (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl">
                    <p className="text-sm text-stone-600 mb-2">Your conservation contribution:</p>
                    <p className="text-3xl font-bold text-orange-600 mb-1">{result.tokens} Tokens</p>
                    <p className="text-sm text-stone-500">≈ ₹{result.tokens / 2} value at village stores</p>
                  </div>
                  
                  <a 
                    href="https://campus-coin-kohl.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors font-bold text-lg shadow-lg"
                  >
                    🪙 Go to CampusCoin Platform to Claim →
                  </a>
                  
                  <p className="text-xs text-stone-500">
                    Tokens redeemable ONLY at Kokkare Bellur village stores
                  </p>
                </div>
              )}

              <button 
                onClick={resetForm}
                className="mt-6 text-stone-600 underline hover:text-stone-900"
              >
                Submit Another Action
              </button>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3">💡 How Village Token Economy Works</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✅ Complete conservation task → Upload proof photos</li>
              <li>✅ Admin verifies on CampusCoin platform</li>
              <li>✅ Tokens allocated to your account</li>
              <li>✅ Redeem ONLY at village stores (groceries, handicrafts, tours)</li>
              <li>✅ 100 tokens = ₹50 value | Economic benefit stays in community</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConservationActions;
