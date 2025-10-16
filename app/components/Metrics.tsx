"use client";
import React from 'react';
import type { ImageMetrics } from '../lib/imageMetrics';

export default function Metrics({ metrics }: { metrics: ImageMetrics | null }) {
  if (!metrics) return null;
  const nice = (n: number) => n.toFixed(2);
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Image Metrics</h3>
      <ul>
        <li><strong>Dimensions:</strong> {metrics.width} × {metrics.height}</li>
        <li><strong>Brightness:</strong> {nice(metrics.brightness)} (0–255)</li>
        <li><strong>Contrast (σ):</strong> {nice(metrics.contrast)}</li>
        <li><strong>Edge density:</strong> {nice(metrics.edgeDensity)}</li>
      </ul>
    </div>
  );
}
