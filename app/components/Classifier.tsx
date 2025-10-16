"use client";
import React from 'react';

export type Prediction = {
  label: 'CT Scan' | 'MRI';
  score: number; // 0..1
};

export default function Classifier({ imageUrl }: { imageUrl: string | null }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<Prediction[] | null>(null);

  const classify = React.useCallback(async () => {
    if (!imageUrl) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const [{ pipeline }] = await Promise.all([
        import('@xenova/transformers') as any,
      ]);
      const classifier = await (pipeline as any)(
        'zero-shot-image-classification',
        'Xenova/clip-vit-base-patch16'
      );
      const labels = ['CT Scan', 'MRI'];
      const output = await classifier(imageUrl, labels, {
        hypothesis_template: 'an image of a {label}',
      });
      // output is array of {label, score}
      setResult(output as Prediction[]);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to run model');
    } finally {
      setLoading(false);
    }
  }, [imageUrl]);

  React.useEffect(() => {
    // Warm up small delay to allow image load
    if (imageUrl) classify();
  }, [imageUrl, classify]);

  if (!imageUrl) return null;

  return (
    <div className="card">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
        <h3 style={{margin:0}}>AI Classification</h3>
        <button onClick={classify} disabled={loading}>Re-run</button>
      </div>
      {loading && (
        <div style={{marginTop:12}}>
          <div className="progress"><span style={{width:'60%'}} /></div>
          <div style={{marginTop:8,color:'#64748b'}}>Loading model and analyzing…</div>
        </div>
      )}
      {error && (
        <div style={{marginTop:8,color:'#dc2626'}}>Error: {error}</div>
      )}
      {result && (
        <div style={{marginTop:12,display:'grid',gap:8}}>
          {result.map((r) => (
            <div key={r.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div className="badge">{r.label}</div>
              <div style={{minWidth:200}}>
                <div className="progress"><span style={{width:`${(r.score*100).toFixed(1)}%`}} /></div>
              </div>
              <div style={{width:64,textAlign:'right'}}>{(r.score*100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
