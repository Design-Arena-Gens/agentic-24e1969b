"use client";
import React from 'react';

export interface ImageUploadProps {
  onImage: (file: File, url: string) => void;
}

export default function ImageUpload({ onImage }: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    onImage(file, url);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
      className={`card`}
      style={{
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: dragActive ? '#0ea5e9' : '#e2e8f0',
        textAlign: 'center'
      }}
    >
      <input ref={inputRef} id="file" type="file" accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
      <label htmlFor="file" className="label-btn" onClick={() => inputRef.current?.click()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>Click to upload</span>
      </label>
      <div style={{ marginTop: 8, color: '#64748b' }}>or drag and drop an image</div>
      <div style={{ marginTop: 8 }}>
        <span className="badge">Accepted: PNG, JPG</span>
      </div>
    </div>
  );
}
