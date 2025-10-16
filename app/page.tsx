"use client";
import React from 'react';
import ImageUpload from './components/ImageUpload';
import Metrics from './components/Metrics';
import Classifier from './components/Classifier';
import { computeImageMetricsFromFile } from './lib/imageMetrics';

export default function Page() {
  const [file, setFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [metrics, setMetrics] = React.useState<any>(null);

  const handleImage = async (f: File, url: string) => {
    setFile(f);
    setImageUrl(url);
    try {
      const m = await computeImageMetricsFromFile(f);
      setMetrics(m);
    } catch (e) {
      console.error(e);
      setMetrics(null);
    }
  };

  return (
    <main>
      <header>
        <h1 style={{marginBottom:0}}>CT Scan vs MRI — AI Analyzer</h1>
        <span className="badge">Client-side • No upload</span>
      </header>

      <div className="grid">
        <div className="card">
          {!imageUrl && (
            <ImageUpload onImage={handleImage} />
          )}
          {imageUrl && (
            <div style={{display:'grid',gap:12}}>
              <img className="preview" src={imageUrl} alt="Uploaded preview" />
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <label className="label-btn" htmlFor="reupload">
                  <input id="reupload" type="file" accept="image/*" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImage(f, URL.createObjectURL(f));
                  }} />
                  Change image
                </label>
                <button onClick={() => { setImageUrl(null); setFile(null); setMetrics(null); }}>Reset</button>
              </div>
            </div>
          )}
        </div>
        <div style={{display:'grid',gap:16}}>
          <Metrics metrics={metrics} />
          <Classifier imageUrl={imageUrl} />
        </div>
      </div>

      <footer>
        This tool uses zero-shot CLIP to estimate whether an image is a CT scan or an MRI. Results may be inaccurate; do not use for diagnosis.
      </footer>
    </main>
  );
}
