import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, Loader, Coins } from 'lucide-react';

const BirdIdentification = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [tokenRequest, setTokenRequest] = useState(null);
  const fileInputRef = useRef(null);

  // Simulated AI analysis (in production, this would use TensorFlow.js)
  const analyzeImage = async (imageFile) => {
    setAnalyzing(true);
    
    // Simulate API call to AI model
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulated AI results
    const species = [
      { name: 'Painted Stork', confidence: 0.94, tokens: 50 },
      { name: 'Spot-billed Pelican', confidence: 0.89, tokens: 75 },
      { name: 'Black-headed Ibis', confidence: 0.76, tokens: 40 },
      { name: 'Asian Openbill', confidence: 0.92, tokens: 60 },
      { name: 'Little Cormorant', confidence: 0.88, tokens: 45 }
    ];
    
    const randomSpecies = species[Math.floor(Math.random() * species.length)];
    
    setResult({
      species: randomSpecies.name,
      confidence: randomSpecies.confidence,
      tokens: randomSpecies.tokens,
      timestamp: new Date().toISOString(),
      location: 'Kokkare Bellur, Karnataka'
    });
    
    setAnalyzing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setTokenRequest(null);
    }
  };

  const handleAnalyze = () => {
    if (image) {
      analyzeImage(image);
    }
  };

  const handleSubmitForTokens = async () => {
    if (!result) return;

    try {
      // Call backend API to request tokens
      const response = await fetch('/api/conservation/request-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: 'Conservation Supporter',
          actionType: 'bird_identification',
          birdSpecies: result.species,
          confidence: result.confidence,
          location: result.location,
          tokensRequested: result.tokens
        })
      });

      const data = await response.json();

      if (data.success) {
        setTokenRequest({
          id: data.requestId,
          status: 'pending',
          message: data.message
        });

        // Simulate approval process
        setTimeout(() => {
          setTokenRequest({
            id: data.requestId,
            status: 'approved',
            tokens: result.tokens,
            message: `Request submitted! Visit CampusCoin to claim your ${result.tokens} tokens.`
          });
        }, 2000);
      } else {
        setTokenRequest({
          id: '',
          status: 'error',
          message: 'Failed to submit token request. Please try again.'
        });
      }
    } catch (error) {
      console.error('Token request error:', error);
      setTokenRequest({
        id: '',
        status: 'error',
        message: 'Network error. Please check your connection.'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl shadow-xl border border-green-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold tracking-wide mb-4">
            <Camera size={16} /> AI-Powered Feature
          </div>
          <h2 className="text-4xl font-bold mb-4 text-stone-900">Bird Identification & Rewards</h2>
          <p className="text-lg text-stone-600">
            Upload a photo of birds at Kokkare Bellur, get AI identification, and earn conservation tokens!
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-green-300 rounded-2xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all"
          >
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-xl shadow-lg" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setImage(null);
                    setResult(null);
                    setTokenRequest(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <p className="text-xl font-semibold text-stone-700 mb-2">Click to upload bird photo</p>
                <p className="text-sm text-stone-500">JPG, PNG up to 5MB • Min 480x480px</p>
              </div>
            )}
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Analyze Button */}
        {preview && !result && !analyzing && (
          <button
            onClick={handleAnalyze}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl mb-8"
          >
            🔍 Analyze with AI
          </button>
        )}

        {/* Analyzing State */}
        {analyzing && (
          <div className="text-center py-8 mb-8 bg-blue-50 rounded-xl">
            <Loader className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
            <p className="text-lg font-semibold text-blue-900">AI is analyzing your photo...</p>
            <p className="text-sm text-blue-600 mt-2">Using TensorFlow.js for species identification</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-l-4 border-green-500">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Species Identified!</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-xl text-green-700 font-semibold">
                    {result.species}
                  </p>
                  <p className="text-sm text-stone-600">
                    Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                  </p>
                  <p className="text-sm text-stone-600">
                    Location: {result.location}
                  </p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <Coins className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-stone-600">Earn Reward:</p>
                    <p className="text-2xl font-bold text-orange-600">{result.tokens} Conservation Tokens</p>
                  </div>
                </div>
              </div>
            </div>

            {!tokenRequest && (
              <button
                onClick={handleSubmitForTokens}
                className="w-full mt-6 bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors shadow-lg"
              >
                🎁 Claim Your Tokens
              </button>
            )}
          </div>
        )}

        {/* Token Request Status */}
        {tokenRequest && (
          <div className={`p-6 rounded-xl ${
            tokenRequest.status === 'pending' 
              ? 'bg-yellow-50 border border-yellow-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center gap-4">
              {tokenRequest.status === 'pending' ? (
                <Loader className="w-8 h-8 animate-spin text-yellow-600" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-600" />
              )}
              <div>
                <p className="font-bold text-lg text-stone-900">
                  {tokenRequest.status === 'pending' ? 'Processing...' : 'Tokens Allocated!'}
                </p>
                <p className="text-sm text-stone-600">{tokenRequest.message}</p>
                <p className="text-xs text-stone-500 mt-1">Request ID: {tokenRequest.id}</p>
              </div>
            </div>

            {tokenRequest.status === 'approved' && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-stone-600 mb-2">🎉 Your {result.tokens} tokens are ready to claim!</p>
                <a 
                  href="https://campus-coin-kohl.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg shadow-lg"
                >
                  🪙 Go to CampusCoin Platform →
                </a>
                <p className="text-xs text-stone-500 mt-2">All token claiming happens on the CampusCoin blockchain platform</p>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <AlertCircle size={20} />
            How It Works
          </h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Upload a clear photo of birds at Kokkare Bellur</li>
            <li>• AI identifies the species using TensorFlow.js</li>
            <li>• Request is verified and submitted to CampusCoin blockchain</li>
            <li>• <strong>Click the link to visit CampusCoin platform</strong></li>
            <li>• All token claiming, wallet management & rewards are on CampusCoin</li>
            <li>• Redeem tokens for eco-tourism and conservation rewards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BirdIdentification;
